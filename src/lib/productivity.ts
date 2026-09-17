import type { LearnerError,MasteryStage,MemoryState,ProductiveAttempt,ProductiveMode } from '../types'

export interface FeedbackResult { feedback:string[]; errors:Array<Omit<LearnerError,'id'|'createdAt'|'lastSeenAt'|'nextPracticeAt'|'count'|'resolvedCount'>> }

const rules:Array<{pattern:RegExp;incorrect:string;correct:string;explanation:string}>=[
  {pattern:/\bi am agree\b/i,incorrect:'I am agree',correct:'I agree',explanation:'Agree — глагол, поэтому be здесь не нужен.'},
  {pattern:/\bdidn['’]?t went\b/i,incorrect:"didn't went",correct:"didn't go",explanation:'После did/didn’t используется базовая форма глагола.'},
  {pattern:/\bdepend(?:s|ed|ing)? from\b/i,incorrect:'depend from',correct:'depend on',explanation:'В стандартном английском используется depend on.'},
  {pattern:/\bpeople is\b/i,incorrect:'people is',correct:'people are',explanation:'People обычно требует формы множественного числа.'},
  {pattern:/\bdiscuss about\b/i,incorrect:'discuss about',correct:'discuss',explanation:'Discuss обычно не требует about перед объектом.'},
]

const targetVariants:Record<string,string[]>={
  'figure out':['figure out','figures out','figured out','figuring out'],
  'turn out':['turn out','turns out','turned out','turning out'],
  'make a decision':['make a decision','makes a decision','made a decision','making a decision'],
  'take care of':['take care of','takes care of','took care of','taken care of','taking care of'],
  'be about to':['be about to','am about to','is about to','are about to','was about to','were about to'],
  'go':['go','goes','went','gone'],
  'was supposed to':['was supposed to','were supposed to','am supposed to','is supposed to','are supposed to'],
}

function normalizeForMatch(value:string){
  return value.toLowerCase().replace(/[’‘]/g,"'").replace(/[^\p{L}\p{N}']+/gu,' ').trim().replace(/\s+/g,' ')
}
function localDayKey(timestamp:number){const date=new Date(timestamp);return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
function variantsFor(target:string){const normalized=normalizeForMatch(target);return targetVariants[normalized]??[target]}

export function targetUsed(response:string,target:string){
  const haystack=` ${normalizeForMatch(response)} `
  return variantsFor(target).some(variant=>{const needle=normalizeForMatch(variant);return Boolean(needle&&haystack.includes(` ${needle} `))})
}

/** Count distinct practice days with real productive evidence, not rapid duplicate submissions. */
export function countProductiveUses(target:string,attempts:ProductiveAttempt[]){
  const normalizedTarget=normalizeForMatch(target)
  if(!normalizedTarget)return 0
  const days=new Set<string>()
  attempts.forEach(attempt=>{
    const explicit=attempt.usedTargets?.some(item=>normalizeForMatch(item)===normalizedTarget)
    if(explicit||targetUsed(attempt.response,target))days.add(localDayKey(attempt.createdAt))
  })
  return days.size
}

export function analyzeProduction(response:string,targets:string[],mode:ProductiveMode):FeedbackResult{
  const hits=targets.filter(target=>targetUsed(response,target)).length
  const feedback:string[]=[]
  if(!response.trim())return{feedback:['Сначала дай собственный ответ — даже короткий.'],errors:[]}
  feedback.push(hits===targets.length&&targets.length?`Все целевые выражения использованы: ${hits}/${targets.length}.`:`Целевые выражения: ${hits}/${targets.length}. Попробуй встроить остальные естественно, а не отдельным списком.`)
  const words=response.trim().split(/\s+/).length
  if(mode==='speaking')feedback.push(words<18?'Для fluency-практики попробуй развить мысль ещё на 1–2 предложения.':'Ответ достаточно длинный для повторной fluency-задачи.')
  else feedback.push(words<25?'Добавь ещё одну конкретную деталь или пример.':'Объёма достаточно; дальше важнее точность и естественность.')
  const matched=rules.filter(rule=>rule.pattern.test(response))
  if(matched.length)feedback.push(`Нашёл ${matched.length} типовую конструкцию для журнала ошибок.`)
  else feedback.push('По локальным правилам явных типовых ошибок не найдено. Это не заменяет полноценную AI-проверку.')
  return{feedback,errors:matched.map(rule=>({incorrect:rule.incorrect,correct:rule.correct,explanation:rule.explanation,source:mode==='writing'?'writing' as const:'study' as const}))}
}

/**
 * Flashcard success alone is not enough to call vocabulary "active".
 * One day with real output moves an item into contextual use; output on multiple days is required for active use.
 */
export function masteryStage(memory?:MemoryState,productiveUses=0):MasteryStage{
  if(productiveUses>=2)return'active'
  if(productiveUses>=1)return'context'
  if(!memory)return'unseen'
  if(memory.reviews<=1)return'recognition'
  return'recall'
}

export const masteryLabels:Record<MasteryStage,string>={
  unseen:'Не встречалось',recognition:'Узнаю',recall:'Вспоминаю',context:'Использую с опорой',active:'Активно использую'
}

export function nextTaskDue(days:number,now=Date.now()){return now+days*24*60*60*1000}
