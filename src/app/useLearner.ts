import { useEffect,useMemo,useState } from 'react'
import { learningItems } from '../data/seed'
import { isDue,reviewMemory } from '../lib/srs'
import { loadLearner,saveLearner } from '../lib/storage'
import type { ColorMode,LearnerState,LearningGoal,LearningItem,LearningStats,OnboardingProfile,ReviewEvent,ReviewRating,ThemeStyle } from '../types'

const goalTags:Record<LearningGoal,string[]>={
  conversation:['conversation','phrasal verb','emotion'],
  media:['phrasal verb','emotion','B1','B2'],
  travel:['conversation','A1','A2'],
  work:['work','collocation','B1','B2'],
  general:[],
}

function goalScore(item:LearningItem,goal:LearningGoal){
  return item.tags.reduce((score,tag)=>score+(goalTags[goal].includes(tag)?1:0),0)
}

function localDayKey(timestamp:number){
  const date=new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
}

function previousDay(timestamp:number){
  const date=new Date(timestamp)
  date.setDate(date.getDate()-1)
  return date.getTime()
}

function calculateStreak(events:ReviewEvent[],now=Date.now()){
  if(!events.length)return 0
  const days=new Set(events.map(event=>localDayKey(event.reviewedAt)))
  let cursor=now
  if(!days.has(localDayKey(cursor))){
    cursor=previousDay(cursor)
    if(!days.has(localDayKey(cursor)))return 0
  }
  let streak=0
  while(days.has(localDayKey(cursor))){streak+=1;cursor=previousDay(cursor)}
  return streak
}

export function useLearner(){
  const[state,setState]=useState<LearnerState>(()=>loadLearner())
  useEffect(()=>{saveLearner(state)},[state])

  const dueItems=useMemo(()=>learningItems.filter(item=>isDue(state.memory[item.id])),[state.memory])
  const newItems=useMemo(()=>learningItems.filter(item=>!state.memory[item.id]).sort((a,b)=>goalScore(b,state.goal)-goalScore(a,state.goal)),[state.memory,state.goal])
  const stats=useMemo<LearningStats>(()=>{
    const studied=learningItems.filter(item=>state.memory[item.id])
    const strongItems=studied.filter(item=>{
      const memory=state.memory[item.id]
      return memory&&(memory.lastRating==='good'||memory.lastRating==='easy')&&memory.stability>=1
    })
    const today=localDayKey(Date.now())
    return {
      studied:studied.length,
      strong:strongItems.length,
      expressions:studied.filter(item=>item.kind==='chunk').length,
      irregularKnown:strongItems.filter(item=>item.kind==='irregular').length,
      reviewedToday:state.reviewLog.filter(event=>localDayKey(event.reviewedAt)===today).length,
      streak:calculateStreak(state.reviewLog),
    }
  },[state.memory,state.reviewLog])

  const setThemeStyle=(themeStyle:ThemeStyle)=>setState(current=>({...current,themeStyle}))
  const setColorMode=(colorMode:ColorMode)=>setState(current=>({...current,colorMode}))
  const completeOnboarding=(profile:OnboardingProfile)=>setState(current=>({...current,...profile,onboardingComplete:true}))
  const rateItem=(itemId:string,rating:ReviewRating)=>{
    const now=Date.now()
    setState(current=>{
      const previous=current.memory[itemId]
      const next=reviewMemory(previous,itemId,rating,now)
      return {
        ...current,
        memory:{...current.memory,[itemId]:next},
        reviewLog:[...current.reviewLog,{id:`${itemId}:${now}`,itemId,rating,reviewedAt:now,previousDueAt:previous?.dueAt??now,nextDueAt:next.dueAt}].slice(-2000),
      }
    })
  }
  const resetProgress=()=>setState(current=>({...current,memory:{},reviewLog:[]}))

  return {state,dueItems,newItems,stats,setThemeStyle,setColorMode,completeOnboarding,rateItem,resetProgress}
}
