import type { LearnerError,MasteryStage,MemoryState,ProductiveAttempt,ProductiveMode } from '../types'

export interface FeedbackResult { feedback:string[]; errors:Array<Omit<LearnerError,'id'|'createdAt'|'lastSeenAt'|'nextPracticeAt'|'count'|'resolvedCount'>> }

const rules:Array<{pattern:RegExp;incorrect:string;correct:string;explanation:string}>=[
  {pattern:/\bi am agree\b/i,incorrect:'I am agree',correct:'I agree',explanation:'Agree — глагол, поэтому be здесь не нужен.'},
  {pattern:/\bdidn['’]?t went\b/i,incorrect:"didn't went",correct:"didn't go",explanation:'После did/didn’t используется базовая форма глагола.'},
  {pattern:/\bdepend(?:s|ed|ing)? from\b/i,incorrect:'depend from',correct:'depend on',explanation:'В стандартном английском используется depend on.'},
  {pattern:/\bpeople is\b/i,incorrect:'people is',correct:'people are',explanation:'People обычно требует формы множественного числа.'},
  {pattern:/\bdiscuss about\b/i,incorrect:'discuss about',correct:'discuss',explanation:'Discuss обычно не требует about перед объектом.'},
]

function normalizeForMatch(value:string){
  return value.toLowerCase().replace(/[’‘]/g,"'").replace(/[^\p{L}\p{N}']+/gu,' ').trim().replace(/\s+/g,' ')
}

export function targetUsed(response:string,target:string){
  const haystack=` ${normalizeForMatch(response)} `
  const needle=normalizeForMatch(target)
  return Boolean(needle&&haystack.includes(` ${needle} `))
}

export function countProductiveUses(target:string,attempts:ProductiveAttempt[]){
  const normalizedTarget=normalizeForMatch(target)
  if(!normalizedTarget)return 0
  return attempts.filter(attempt=>{
    if(attempt.usedTargets?.some(item=>normalizeForMatch(item)===normalizedTarget))return true
    return targetUsed(attempt.response,target)
  }).length
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
 * One verified use in output moves an item into contextual use; repeated output evidence is required for active use.
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
