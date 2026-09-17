import { createEmptyCard,fsrs,type Card,type Grade } from 'ts-fsrs'
import type { MemoryState,ReviewRating } from '../types'

const DAY=86_400_000
const MINUTE=60_000
const scheduler=fsrs({
  request_retention:.9,
  maximum_interval:3650,
  enable_fuzz:true,
  enable_short_term:true,
  learning_steps:['10m'],
  relearning_steps:['10m'],
})

const ratings:Record<ReviewRating,Grade>={again:1,hard:2,good:3,easy:4}

function restoreCard(memory:MemoryState|undefined):Card{
  if(!memory)return createEmptyCard()
  return {
    due:new Date(memory.dueAt),
    stability:memory.stability,
    difficulty:memory.difficulty,
    elapsed_days:memory.elapsedDays,
    scheduled_days:memory.scheduledDays,
    learning_steps:memory.learningSteps,
    reps:memory.reviews,
    lapses:memory.lapses,
    state:memory.state as Card['state'],
    ...(memory.lastReviewedAt?{last_review:new Date(memory.lastReviewedAt)}:{}),
  }
}

export function reviewMemory(previous:MemoryState|undefined,itemId:string,rating:ReviewRating,now=Date.now()):MemoryState{
  const result=scheduler.next(restoreCard(previous),new Date(now),ratings[rating])
  const card=result.card
  return {
    itemId,
    dueAt:card.due.getTime(),
    stability:card.stability,
    difficulty:card.difficulty,
    elapsedDays:card.elapsed_days,
    scheduledDays:card.scheduled_days,
    learningSteps:card.learning_steps,
    reviews:card.reps,
    lapses:card.lapses,
    state:card.state,
    lastReviewedAt:card.last_review?.getTime()??now,
    lastRating:rating,
  }
}

export function isDue(memory:MemoryState|undefined,now=Date.now()){
  return Boolean(memory&&memory.dueAt<=now)
}

export function formatNextReview(dueAt:number,now=Date.now()){
  const diff=dueAt-now
  if(diff<=0)return'сейчас'
  const minutes=Math.max(1,Math.round(diff/MINUTE))
  if(minutes<60)return`через ${minutes} мин`
  const hours=Math.round(diff/(60*MINUTE))
  if(hours<24)return`через ${hours} ч`
  return`через ${Math.round(diff/DAY)} дн`
}
