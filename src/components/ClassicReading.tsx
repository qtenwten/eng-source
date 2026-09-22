import { useMemo,useState } from 'react'
import { readingGrades,readingLibrary,readingsForGrade,type ReadingEntry } from '../data/readingLibrary'
import type { ActivityKind,LearningItem } from '../types'

type TranslationMode='hidden'|'parallel'|'russian'
type Props={
  level:string
  allItems:LearningItem[]
  onSave:(text:string,translation:string,context:string)=>void
  onActivity:(kind:ActivityKind,durationMinutes:number)=>void
}

type Lookup={term:string;translation:string;context:string}

const completedKey='seng-reading-completed-v1'

export function ClassicReading({level,allItems,onSave,onActivity}:Props){
  const initialGrade=gradeForLevel(level)
  const[grade,setGrade]=useState(initialGrade)
  const[entryId,setEntryId]=useState(()=>readingsForGrade(initialGrade)[0]?.id??readingLibrary[0].id)
  const[mode,setMode]=useState<TranslationMode>('hidden')
  const[fontScale,setFontScale]=useState(1)
  const[lookup,setLookup]=useState<Lookup|null>(null)
  const[completed,setCompleted]=useState<Set<string>>(()=>loadCompleted())
  const entries=useMemo(()=>readingsForGrade(grade),[grade])
  const entry=readingLibrary.find(item=>item.id===entryId)??entries[0]??readingLibrary[0]
  const lexicon=useMemo(()=>buildLexicon(allItems),[allItems])

  const chooseGrade=(next:number)=>{
    setGrade(next)
    setEntryId(readingsForGrade(next)[0]?.id??entryId)
    setMode('hidden')
    setLookup(null)
  }
  const chooseEntry=(id:string)=>{setEntryId(id);setMode('hidden');setLookup(null)}
  const markDone=()=>{
    if(completed.has(entry.id))return
    onActivity('reading',entry.minutes)
    const next=new Set(completed);next.add(entry.id);setCompleted(next);saveCompleted(next)
  }
  const localGlossary=useMemo(()=>new Map(entry.glossary.map(([a,b])=>[normalize(a),b])),[entry])
  const clickWord=(raw:string)=>{
    const term=raw.replace(/^[^A-Za-z’']+|[^A-Za-z’']+$/g,'')
    if(!term)return
    const translation=findTranslation(term,localGlossary,lexicon)
    setLookup({term,translation:translation||'Перевода пока нет во встроенном словаре sENG.',context:sentenceFor(entry.text,term)})
  }
  const openPhrase=(term:string,translation:string)=>setLookup({term,translation,context:sentenceFor(entry.text,term)})

  return <div className="classic-reading">
    <section className="reading-intro">
      <div>
        <p className="eyebrow">GRADED CLASSICS · 100 TEXTS</p>
        <h2>Классика по уровням</h2>
        <p>10 условных «классов» сложности × 10 чтений. Это шкала sENG, а не официальная школьная программа США или Великобритании. Все тексты — учебные адаптации произведений общественного достояния.</p>
      </div>
      <div className="reading-summary"><strong>{completed.size}/100</strong><span>прочитано</span></div>
    </section>

    <div className="grade-strip" aria-label="Уровень чтения">
      {readingGrades.map(item=><button key={item.grade} className={grade===item.grade?'active':''} onClick={()=>chooseGrade(item.grade)}>
        <strong>{item.grade}</strong><span>{item.cefr}</span>
      </button>)}
    </div>

    <section className="grade-banner">
      <div><span className="country-chip">{readingGrades[grade-1]?.country}</span><p className="eyebrow">КЛАСС {grade} · {readingGrades[grade-1]?.cefr}</p><h3>{readingGrades[grade-1]?.work}</h3><p>{readingGrades[grade-1]?.author} · {readingGrades[grade-1]?.description}</p></div>
      <div className="grade-progress"><strong>{entries.filter(item=>completed.has(item.id)).length}/10</strong><span>на этом уровне</span></div>
    </section>

    <div className="reading-layout">
      <aside className="reading-list" aria-label="Тексты этого уровня">
        {entries.map((item,index)=><button key={item.id} className={item.id===entry.id?'active':''} onClick={()=>chooseEntry(item.id)}>
          <span className={completed.has(item.id)?'reading-number done':'reading-number'}>{completed.has(item.id)?'✓':index+1}</span>
          <span><strong>{item.title}</strong><small>{item.minutes} мин · {item.cefr}</small></span>
        </button>)}
      </aside>

      <article className="classic-reader">
        <header className="reader-head">
          <div><p className="eyebrow">{entry.country} · {entry.work}</p><h2>{entry.title}</h2><p>{entry.author} · адаптация sENG · ≈ {entry.minutes} мин</p></div>
          <button className="speak-reading" onClick={()=>speak(entry.text)} aria-label="Озвучить английский текст">▶ EN</button>
        </header>

        <div className="reader-toolbar">
          <div className="translation-tabs">
            <button className={mode==='hidden'?'active':''} onClick={()=>setMode('hidden')}>Только EN</button>
            <button className={mode==='parallel'?'active':''} onClick={()=>setMode('parallel')}>EN + RU</button>
            <button className={mode==='russian'?'active':''} onClick={()=>setMode('russian')}>Перевод</button>
          </div>
          <div className="font-controls"><button onClick={()=>setFontScale(v=>Math.max(.88,v-.08))}>A−</button><button onClick={()=>setFontScale(v=>Math.min(1.3,v+.08))}>A+</button></div>
        </div>

        <div className={`reader-copy mode-${mode}`} style={{fontSize:`${fontScale}em`}}>
          {mode!=='russian'&&<InteractiveText text={entry.text} onWord={clickWord}/>}
          {mode==='parallel'&&<div className="parallel-translation"><span>Перевод</span><p>{entry.translation}</p></div>}
          {mode==='russian'&&<div className="russian-reading"><p>{entry.translation}</p></div>}
        </div>

        <section className="phrase-bank">
          <div className="section-heading"><div><p className="eyebrow">WORDS & CHUNKS</p><h3>Полезное из текста</h3></div><small>Нажми, чтобы разобрать и сохранить</small></div>
          <div className="phrase-grid">{entry.glossary.map(([term,translation])=><button key={term} onClick={()=>openPhrase(term,translation)}><strong>{term}</strong><span>{translation}</span></button>)}</div>
        </section>

        <footer className="reader-finish">
          <p>{completed.has(entry.id)?'✓ Этот текст уже засчитан в чтение.':'Сначала попробуй понять общий смысл без перевода, потом разбери 3–5 полезных слов или выражений.'}</p>
          <button className="primary-action" disabled={completed.has(entry.id)} onClick={markDone}>{completed.has(entry.id)?'Прочитано ✓':'Отметить прочитанным'}</button>
        </footer>
      </article>
    </div>

    {lookup&&<div className="word-popover" role="dialog" aria-label="Перевод слова">
      <button className="word-close" onClick={()=>setLookup(null)}>×</button>
      <p className="eyebrow">В ТЕКСТЕ</p><h3>{lookup.term}</h3><strong>{lookup.translation}</strong>
      <p>{lookup.context}</p>
      {!lookup.translation.startsWith('Перевода пока')&&<button className="primary-action" onClick={()=>{onSave(lookup.term,lookup.translation,lookup.context);setLookup(null)}}>＋ Добавить в обучение</button>}
    </div>}
  </div>
}

function InteractiveText({text,onWord}:{text:string;onWord:(word:string)=>void}){
  const tokens=text.split(/(\s+|(?=[,.;:!?“”"()—])|(?<=[,.;:!?“”"()—]))/)
  return <p className="interactive-reading-text">{tokens.map((token,index)=>{
    if(/^\s+$/.test(token)||/^[,.;:!?“”"()—]+$/.test(token))return <span key={index}>{token}</span>
    return <button key={index} onClick={()=>onWord(token)}>{token}</button>
  })}</p>
}

function gradeForLevel(level:string){
  const value=level.toUpperCase()
  if(value.includes('C2'))return 10
  if(value.includes('C1'))return 9
  if(value.includes('B2'))return 7
  if(value.includes('B1'))return 5
  if(value.includes('A2'))return 3
  return 1
}

function normalize(value:string){return value.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z' -]/g,'').trim()}
function buildLexicon(items:LearningItem[]){
  const map=new Map<string,string>()
  items.forEach(item=>{const key=normalize(item.answer);if(key&&!map.has(key))map.set(key,item.translation)})
  return map
}
function findTranslation(term:string,local:Map<string,string>,lexicon:Map<string,string>){
  const word=normalize(term)
  const candidates=[word]
  if(word.endsWith('ies'))candidates.push(word.slice(0,-3)+'y')
  if(word.endsWith('ing'))candidates.push(word.slice(0,-3),word.slice(0,-3)+'e')
  if(word.endsWith('ed'))candidates.push(word.slice(0,-2),word.slice(0,-1))
  if(word.endsWith('es'))candidates.push(word.slice(0,-2))
  if(word.endsWith('s'))candidates.push(word.slice(0,-1))
  for(const key of candidates){const hit=local.get(key)||lexicon.get(key);if(hit)return hit}
  return''
}
function sentenceFor(text:string,term:string){return text.split(/(?<=[.!?])\s+/).find(sentence=>sentence.toLowerCase().includes(term.toLowerCase()))??text}
function loadCompleted(){try{return new Set<string>(JSON.parse(localStorage.getItem(completedKey)??'[]'))}catch{return new Set<string>()}}
function saveCompleted(items:Set<string>){try{localStorage.setItem(completedKey,JSON.stringify([...items]))}catch{/* storage can be unavailable */}}
function speak(text:string){if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-US';utterance.rate=.84;window.speechSynthesis.speak(utterance)}
