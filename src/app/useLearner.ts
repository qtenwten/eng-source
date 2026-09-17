import { useEffect,useMemo,useState } from 'react'
import { learningItems } from '../data/seed'
import { isDue,reviewMemory } from '../lib/srs'
import { loadLearner,saveLearner } from '../lib/storage'
import { analyzeProduction,countProductiveUses,masteryStage,nextTaskDue,targetUsed } from '../lib/productivity'
import type { ActivityEvent,ActivityKind,ColorMode,LearnerError,LearnerState,LearningGoal,LearningItem,LearningStats,OnboardingProfile,ProductiveMode,ReviewEvent,ReviewRating,ThemeStyle } from '../types'

const goalTags:Record<LearningGoal,string[]>={
  conversation:['conversation','phrasal verb','emotion'],
  media:['phrasal verb','emotion'],
  travel:['conversation'],
  work:['work','collocation'],
  general:[],
}
const cefrValue:Record<string,number>={A1:1,A2:2,B1:3,B2:4,C1:5,C2:6}

function goalScore(item:LearningItem,goal:LearningGoal){return item.tags.reduce((score,tag)=>score+(goalTags[goal].includes(tag)?1:0),0)}
function learnerLevelValue(level:string){const matches=level.toUpperCase().match(/[ABC][12]/g)??[];if(!matches.length)return 3;return matches.reduce((sum,item)=>sum+(cefrValue[item]??3),0)/matches.length}
function itemLevelValue(item:LearningItem){const levelTag=item.tags.find(tag=>cefrValue[tag]);return levelTag?cefrValue[levelTag]:null}
function itemPriority(item:LearningItem,goal:LearningGoal,level:string){
  if(item.tags.includes('personal'))return 50+goalScore(item,goal)
  const itemLevel=itemLevelValue(item),learnerLevel=learnerLevelValue(level)
  const levelScore=itemLevel===null?0:itemLevel-learnerLevel>1?-12*(itemLevel-learnerLevel):5-Math.abs(itemLevel-learnerLevel)*2
  return goalScore(item,goal)*3+levelScore
}
function localDayKey(timestamp:number){const date=new Date(timestamp);return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
function previousDay(timestamp:number){const date=new Date(timestamp);date.setDate(date.getDate()-1);return date.getTime()}
function calculateStreak(events:ReviewEvent[],activities:ActivityEvent[],now=Date.now()){
  const timestamps=[...events.map(event=>event.reviewedAt),...activities.map(event=>event.completedAt)]
  if(!timestamps.length)return 0
  const days=new Set(timestamps.map(localDayKey))
  let cursor=now
  if(!days.has(localDayKey(cursor))){cursor=previousDay(cursor);if(!days.has(localDayKey(cursor)))return 0}
  let streak=0
  while(days.has(localDayKey(cursor))){streak+=1;cursor=previousDay(cursor)}
  return streak
}
function makeInboxPrompt(text:string,translation:string,context:string){
  if(translation.trim())return translation.trim()
  if(context.trim()){
    const escaped=text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
    const cloze=context.replace(new RegExp(escaped,'i'),'_____')
    return cloze===context?`Из контекста: ${context}`:cloze
  }
  return'Вспомни сохранённое выражение'
}
function inboxAsLearningItem(item:LearnerState['inbox'][number]):LearningItem{
  return{id:`inbox:${item.id}`,kind:item.text.trim().includes(' ')?'chunk':'word',prompt:makeInboxPrompt(item.text,item.translation,item.context),answer:item.text,translation:item.translation||'Сохранено из личного контекста',example:item.context||item.text,note:'Из твоего Personal Inbox',tags:['personal','conversation']}
}
function normalizedInboxKey(value:string){return value.trim().toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ')}
function upsertErrors(current:LearnerError[],incoming:Array<Omit<LearnerError,'id'|'createdAt'|'lastSeenAt'|'nextPracticeAt'|'count'|'resolvedCount'>>,now:number){
  let result=[...current]
  incoming.forEach(error=>{
    const index=result.findIndex(item=>item.incorrect.toLowerCase()===error.incorrect.toLowerCase()&&item.correct.toLowerCase()===error.correct.toLowerCase())
    if(index>=0){const previous=result[index];result[index]={...previous,count:previous.count+1,lastSeenAt:now,nextPracticeAt:Math.min(previous.nextPracticeAt,now)}}
    else result.push({...error,id:`error:${now}:${result.length}`,count:1,createdAt:now,lastSeenAt:now,nextPracticeAt:now,resolvedCount:0})
  })
  return result.slice(-300)
}

export function useLearner(){
  const[state,setState]=useState<LearnerState>(()=>loadLearner())
  const[clock,setClock]=useState(()=>Date.now())
  useEffect(()=>{saveLearner(state)},[state])
  useEffect(()=>{const id=window.setInterval(()=>setClock(Date.now()),30_000);return()=>window.clearInterval(id)},[])

  const allItems=useMemo(()=>[...learningItems,...state.inbox.map(inboxAsLearningItem)],[state.inbox])
  const dueItems=useMemo(()=>allItems.filter(item=>isDue(state.memory[item.id],clock)),[allItems,state.memory,clock])
  const newItems=useMemo(()=>allItems.filter(item=>!state.memory[item.id]).sort((a,b)=>itemPriority(b,state.goal,state.level)-itemPriority(a,state.goal,state.level)),[allItems,state.memory,state.goal,state.level])
  const stats=useMemo<LearningStats>(()=>{
    const studied=allItems.filter(item=>state.memory[item.id])
    const strongItems=studied.filter(item=>{const memory=state.memory[item.id];return memory&&!isDue(memory,clock)&&(memory.lastRating==='good'||memory.lastRating==='easy')&&memory.stability>=1})
    const activeItems=studied.filter(item=>masteryStage(state.memory[item.id],countProductiveUses(item.answer,state.productiveAttempts))==='active')
    const today=localDayKey(clock)
    return {
      studied:studied.length,strong:strongItems.length,active:activeItems.length,
      expressions:studied.filter(item=>item.kind==='chunk').length,
      irregularKnown:strongItems.filter(item=>item.kind==='irregular').length,
      reviewedToday:state.reviewLog.filter(event=>localDayKey(event.reviewedAt)===today).length,
      streak:calculateStreak(state.reviewLog,state.activityLog,clock),
      errorsDue:state.errors.filter(error=>error.nextPracticeAt<=clock).length,
    }
  },[allItems,state.memory,state.reviewLog,state.errors,state.productiveAttempts,state.activityLog,clock])

  const setThemeStyle=(themeStyle:ThemeStyle)=>setState(current=>({...current,themeStyle}))
  const setColorMode=(colorMode:ColorMode)=>setState(current=>({...current,colorMode}))
  const completeOnboarding=(profile:OnboardingProfile)=>setState(current=>({...current,...profile,onboardingComplete:true}))
  const updateLearningPreferences=(goal:LearningGoal,dailyMinutes:number)=>setState(current=>({...current,goal,dailyMinutes}))
  const rateItem=(itemId:string,rating:ReviewRating)=>{
    const now=Date.now()
    setState(current=>{
      const previous=current.memory[itemId]
      const next=reviewMemory(previous,itemId,rating,now)
      return {...current,memory:{...current.memory,[itemId]:next},reviewLog:[...current.reviewLog,{id:`${itemId}:${now}`,itemId,rating,reviewedAt:now,previousDueAt:previous?.dueAt??now,nextDueAt:next.dueAt}].slice(-2000)}
    })
    setClock(now)
  }
  const addInbox=(text:string,translation:string,context:string)=>{
    const clean=text.trim();if(!clean)return
    const cleanTranslation=translation.trim(),cleanContext=context.trim(),now=Date.now(),key=normalizedInboxKey(clean)
    setState(current=>{
      const index=current.inbox.findIndex(item=>normalizedInboxKey(item.text)===key)
      if(index<0)return{...current,inbox:[...current.inbox,{id:`${now}`,text:clean,translation:cleanTranslation,context:cleanContext,createdAt:now}].slice(-500)}
      const inbox=[...current.inbox],previous=inbox[index]
      inbox[index]={...previous,translation:cleanTranslation||previous.translation,context:cleanContext||previous.context}
      return{...current,inbox}
    })
  }
  const addManualError=(incorrect:string,correct:string,explanation:string)=>{
    if(!incorrect.trim()||!correct.trim())return
    const now=Date.now();setState(current=>({...current,errors:upsertErrors(current.errors,[{incorrect:incorrect.trim(),correct:correct.trim(),explanation:explanation.trim()||'Исправь форму и затем используй её в новом контексте.',source:'manual'}],now)}));setClock(now)
  }
  const practiceError=(id:string,success:boolean)=>{const now=Date.now();setState(current=>({...current,errors:current.errors.map(error=>{
    if(error.id!==id||error.nextPracticeAt>now)return error
    return{...error,resolvedCount:error.resolvedCount+(success?1:0),lastSeenAt:now,nextPracticeAt:success?nextTaskDue(Math.min(14,2+error.resolvedCount*2),now):now+10*60*1000}
  })}));setClock(now)}
  const recordActivity=(kind:ActivityKind,durationMinutes:number)=>{const now=Date.now();setState(current=>({...current,activityLog:[...current.activityLog,{id:`${kind}:${now}`,kind,durationMinutes:Math.max(1,Math.min(120,Math.round(durationMinutes))),completedAt:now}].slice(-1000)}));setClock(now)}
  const recordProduction=(taskId:string,mode:ProductiveMode,response:string,targets:string[],repeatAfterDays:number,durationMinutes=1)=>{
    const now=Date.now(),analysis=analyzeProduction(response,targets,mode),usedTargets=targets.filter(target=>targetUsed(response,target)),targetHits=usedTargets.length,safeDuration=Math.max(1,Math.min(120,Math.round(durationMinutes)))
    setState(current=>{
      const previous=[...current.productiveAttempts].reverse().find(item=>item.taskId===taskId)
      const nextDueAt=previous&&previous.nextDueAt>now?previous.nextDueAt:nextTaskDue(repeatAfterDays,now)
      return{...current,
        productiveAttempts:[...current.productiveAttempts,{id:`attempt:${now}`,taskId,mode,response:response.trim(),createdAt:now,targetHits,feedback:analysis.feedback,nextDueAt,targets:[...targets],usedTargets}].slice(-500),
        errors:upsertErrors(current.errors,analysis.errors,now),
        activityLog:[...current.activityLog,{id:`${mode}:${now}`,kind:mode,durationMinutes:safeDuration,completedAt:now}].slice(-1000),
      }
    })
    setClock(now)
    return analysis
  }
  const resetProgress=()=>{const now=Date.now();setState(current=>({...current,memory:{},reviewLog:[],errors:[],productiveAttempts:[],activityLog:[]}));setClock(now)}

  return {state,allItems,dueItems,newItems,stats,setThemeStyle,setColorMode,completeOnboarding,updateLearningPreferences,rateItem,addInbox,addManualError,practiceError,recordActivity,recordProduction,resetProgress}
}
