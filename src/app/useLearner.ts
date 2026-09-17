import { useEffect,useMemo,useState } from 'react'
import { learningItems } from '../data/seed'
import { isDue,reviewMemory } from '../lib/srs'
import { loadLearner,saveLearner } from '../lib/storage'
import { analyzeProduction,masteryStage,nextTaskDue } from '../lib/productivity'
import type { ActivityKind,ColorMode,LearnerError,LearnerState,LearningGoal,LearningItem,LearningStats,OnboardingProfile,ProductiveMode,ReviewEvent,ReviewRating,ThemeStyle } from '../types'

const goalTags:Record<LearningGoal,string[]>={
  conversation:['conversation','phrasal verb','emotion'],
  media:['phrasal verb','emotion','B1','B2'],
  travel:['conversation','A1','A2'],
  work:['work','collocation','B1','B2'],
  general:[],
}

function goalScore(item:LearningItem,goal:LearningGoal){return item.tags.reduce((score,tag)=>score+(goalTags[goal].includes(tag)?1:0),0)}
function localDayKey(timestamp:number){const date=new Date(timestamp);return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
function previousDay(timestamp:number){const date=new Date(timestamp);date.setDate(date.getDate()-1);return date.getTime()}
function calculateStreak(events:ReviewEvent[],now=Date.now()){
  if(!events.length)return 0
  const days=new Set(events.map(event=>localDayKey(event.reviewedAt)))
  let cursor=now
  if(!days.has(localDayKey(cursor))){cursor=previousDay(cursor);if(!days.has(localDayKey(cursor)))return 0}
  let streak=0
  while(days.has(localDayKey(cursor))){streak+=1;cursor=previousDay(cursor)}
  return streak
}
function inboxAsLearningItem(item:LearnerState['inbox'][number]):LearningItem{
  return{id:`inbox:${item.id}`,kind:item.text.trim().includes(' ')?'chunk':'word',prompt:item.translation||'Вспомни сохранённое выражение',answer:item.text,translation:item.translation,example:item.context||item.text,note:'Из твоего Personal Inbox',tags:['personal','conversation']}
}
function upsertErrors(current:LearnerError[],incoming:Array<Omit<LearnerError,'id'|'createdAt'|'lastSeenAt'|'nextPracticeAt'|'count'|'resolvedCount'>>,now:number){
  let result=[...current]
  incoming.forEach(error=>{
    const index=result.findIndex(item=>item.incorrect.toLowerCase()===error.incorrect.toLowerCase()&&item.correct.toLowerCase()===error.correct.toLowerCase())
    if(index>=0){const previous=result[index];result[index]={...previous,count:previous.count+1,lastSeenAt:now,nextPracticeAt:now}}
    else result.push({...error,id:`error:${now}:${result.length}`,count:1,createdAt:now,lastSeenAt:now,nextPracticeAt:now,resolvedCount:0})
  })
  return result.slice(-300)
}

export function useLearner(){
  const[state,setState]=useState<LearnerState>(()=>loadLearner())
  useEffect(()=>{saveLearner(state)},[state])

  const allItems=useMemo(()=>[...learningItems,...state.inbox.map(inboxAsLearningItem)],[state.inbox])
  const dueItems=useMemo(()=>allItems.filter(item=>isDue(state.memory[item.id])),[allItems,state.memory])
  const newItems=useMemo(()=>allItems.filter(item=>!state.memory[item.id]).sort((a,b)=>goalScore(b,state.goal)-goalScore(a,state.goal)),[allItems,state.memory,state.goal])
  const stats=useMemo<LearningStats>(()=>{
    const studied=allItems.filter(item=>state.memory[item.id])
    const strongItems=studied.filter(item=>{const memory=state.memory[item.id];return memory&&(memory.lastRating==='good'||memory.lastRating==='easy')&&memory.stability>=1})
    const activeItems=studied.filter(item=>masteryStage(state.memory[item.id])==='active')
    const today=localDayKey(Date.now())
    return {
      studied:studied.length,strong:strongItems.length,active:activeItems.length,
      expressions:studied.filter(item=>item.kind==='chunk').length,
      irregularKnown:strongItems.filter(item=>item.kind==='irregular').length,
      reviewedToday:state.reviewLog.filter(event=>localDayKey(event.reviewedAt)===today).length,
      streak:calculateStreak(state.reviewLog),
      errorsDue:state.errors.filter(error=>error.nextPracticeAt<=Date.now()).length,
    }
  },[allItems,state.memory,state.reviewLog,state.errors])

  const setThemeStyle=(themeStyle:ThemeStyle)=>setState(current=>({...current,themeStyle}))
  const setColorMode=(colorMode:ColorMode)=>setState(current=>({...current,colorMode}))
  const completeOnboarding=(profile:OnboardingProfile)=>setState(current=>({...current,...profile,onboardingComplete:true}))
  const rateItem=(itemId:string,rating:ReviewRating)=>{
    const now=Date.now()
    setState(current=>{
      const previous=current.memory[itemId]
      const next=reviewMemory(previous,itemId,rating,now)
      return {...current,memory:{...current.memory,[itemId]:next},reviewLog:[...current.reviewLog,{id:`${itemId}:${now}`,itemId,rating,reviewedAt:now,previousDueAt:previous?.dueAt??now,nextDueAt:next.dueAt}].slice(-2000)}
    })
  }
  const addInbox=(text:string,translation:string,context:string)=>{
    const clean=text.trim();if(!clean)return
    const now=Date.now();setState(current=>({...current,inbox:[...current.inbox,{id:`${now}`,text:clean,translation:translation.trim(),context:context.trim(),createdAt:now}].slice(-500)}))
  }
  const addManualError=(incorrect:string,correct:string,explanation:string)=>{
    if(!incorrect.trim()||!correct.trim())return
    const now=Date.now();setState(current=>({...current,errors:upsertErrors(current.errors,[{incorrect:incorrect.trim(),correct:correct.trim(),explanation:explanation.trim()||'Исправь форму и затем используй её в новом контексте.',source:'manual'}],now)}))
  }
  const practiceError=(id:string,success:boolean)=>{const now=Date.now();setState(current=>({...current,errors:current.errors.map(error=>error.id===id?{...error,resolvedCount:error.resolvedCount+(success?1:0),lastSeenAt:now,nextPracticeAt:nextTaskDue(success?Math.min(14,2+error.resolvedCount*2):1,now)}:error)}))}
  const recordActivity=(kind:ActivityKind,durationMinutes:number)=>{const now=Date.now();setState(current=>({...current,activityLog:[...current.activityLog,{id:`${kind}:${now}`,kind,durationMinutes,completedAt:now}].slice(-1000)}))}
  const recordProduction=(taskId:string,mode:ProductiveMode,response:string,targets:string[],repeatAfterDays:number)=>{
    const now=Date.now();const analysis=analyzeProduction(response,targets,mode);const normalized=response.toLowerCase();const targetHits=targets.filter(target=>normalized.includes(target.toLowerCase())).length
    setState(current=>({...current,
      productiveAttempts:[...current.productiveAttempts,{id:`attempt:${now}`,taskId,mode,response:response.trim(),createdAt:now,targetHits,feedback:analysis.feedback,nextDueAt:nextTaskDue(repeatAfterDays,now)}].slice(-500),
      errors:upsertErrors(current.errors,analysis.errors,now),
      activityLog:[...current.activityLog,{id:`${mode}:${now}`,kind:mode,durationMinutes:3,completedAt:now}].slice(-1000),
    }))
    return analysis
  }
  const resetProgress=()=>setState(current=>({...current,memory:{},reviewLog:[],errors:[],productiveAttempts:[],activityLog:[]}))

  return {state,allItems,dueItems,newItems,stats,setThemeStyle,setColorMode,completeOnboarding,rateItem,addInbox,addManualError,practiceError,recordActivity,recordProduction,resetProgress}
}
