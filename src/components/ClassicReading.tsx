import { useMemo,useState } from 'react'
import { readingGrades,readingLibrary,readingsForGrade,type ReadingEntry } from '../data/readingLibrary'
import { commonIrregularBases,readingWordDictionary } from '../data/readingDictionary'
import { longformForGrade,type ReadingLongform } from '../data/readingLongforms'
import type { ActivityKind,LearningItem } from '../types'

type TranslationMode='hidden'|'parallel'|'russian'
type ReadingView='immersive'|'part'
type Props={
  level:string
  allItems:LearningItem[]
  onSave:(text:string,translation:string,context:string)=>void
  onActivity:(kind:ActivityKind,durationMinutes:number)=>void
}
type Lookup={
  term:string
  translation?:string
  base?:string
  context:string
  contextTranslation:string
  phrase?:[string,string]
}

const completedKey='seng-reading-completed-v1'
const viewKey='seng-reading-view-v2'

export function ClassicReading({level,allItems,onSave,onActivity}:Props){
  const initialGrade=gradeForLevel(level)
  const[grade,setGrade]=useState(initialGrade)
  const[entryId,setEntryId]=useState(()=>readingsForGrade(initialGrade)[0]?.id??readingLibrary[0].id)
  const[mode,setMode]=useState<TranslationMode>('hidden')
  const[view,setView]=useState<ReadingView>(()=>loadView())
  const[fontScale,setFontScale]=useState(1)
  const[lookup,setLookup]=useState<Lookup|null>(null)
  const[completed,setCompleted]=useState<Set<string>>(()=>loadCompleted())

  const entries=useMemo(()=>readingsForGrade(grade),[grade])
  const entry=readingLibrary.find(item=>item.id===entryId)??entries[0]??readingLibrary[0]
  const lexicon=useMemo(()=>buildLexicon(allItems),[allItems])
  const gradeGlossary=useMemo(()=>buildGradeGlossary(entries),[entries])
  const longform=useMemo(()=>longformForGrade(grade),[grade])
  const fullText=useMemo(()=>longform.sections.map(section=>section.en).join(' '),[longform])
  const visibleText=view==='immersive'?fullText:entry.text
  const wordCount=countWords(visibleText)
  const readingMinutes=view==='immersive'?longform.minutes:estimateLearnerMinutes(visibleText)
  const gradeDone=entries.filter(item=>completed.has(item.id)).length

  const chooseGrade=(next:number)=>{
    const nextEntries=readingsForGrade(next)
    setGrade(next)
    setEntryId(nextEntries[0]?.id??entryId)
    setMode('hidden')
    setLookup(null)
  }
  const chooseEntry=(id:string)=>{
    setEntryId(id)
    setLookup(null)
    if(view==='immersive')setViewAndStore('part')
  }
  const setViewAndStore=(next:ReadingView)=>{setView(next);saveView(next);setLookup(null)}
  const markDone=()=>{
    const targets=view==='immersive'?entries:[entry]
    const fresh=targets.filter(item=>!completed.has(item.id))
    if(!fresh.length)return
    onActivity('reading',view==='immersive'?longform.minutes:estimateLearnerMinutes(fresh.map(item=>item.text).join(' ')))
    const next=new Set(completed)
    fresh.forEach(item=>next.add(item.id))
    setCompleted(next)
    saveCompleted(next)
  }
  const openWord=(raw:string,context:string,contextTranslation:string)=>{
    const term=cleanTerm(raw)
    if(!term)return
    const found=findTranslation(term,gradeGlossary.singleWords,lexicon)
    const phrase=findPhraseForWord(term,gradeGlossary.phrases)
    setLookup({term,translation:found.translation,base:found.base,context,contextTranslation,phrase})
  }
  const openPhrase=(term:string,translation:string,source:ReadingEntry)=>{
    setLookup({term,translation,context:sentenceFor(source.text,term),contextTranslation:pairedSentenceTranslation(source,term)})
  }
  const saveLookup=()=>{
    if(!lookup)return
    if(lookup.translation){
      onSave(lookup.base&&normalize(lookup.base)!==normalize(lookup.term)?lookup.base:lookup.term,lookup.translation,lookup.context)
      setLookup(null)
      return
    }
    if(lookup.phrase){
      onSave(lookup.phrase[0],lookup.phrase[1],lookup.context)
      setLookup(null)
    }
  }
  const saveable=Boolean(lookup?.translation||lookup?.phrase)
  const activeCountry=view==='immersive'?readingGrades[grade-1]?.country:entry.country

  return <div className="classic-reading">
    <section className="reading-intro">
      <div>
        <p className="eyebrow">GRADED CLASSICS · IMMERSIVE READING</p>
        <h2>Классика для погружения</h2>
        <p>По умолчанию открывается полноценная длинная адаптация выбранной классики: несколько больших абзацев, 8–20 минут непрерывного чтения и живой словарь. Короткие сцены оставлены отдельно для спокойного разбора.</p>
      </div>
      <div className="reading-summary"><strong>{completed.size}/100</strong><span>частей прочитано</span></div>
    </section>

    <div className="grade-strip" aria-label="Уровень чтения">
      {readingGrades.map(item=><button key={item.grade} className={grade===item.grade?'active':''} onClick={()=>chooseGrade(item.grade)}>
        <strong>{item.grade}</strong><span>{item.cefr}</span>
      </button>)}
    </div>

    <section className="grade-banner">
      <div>
        <span className="country-chip">{readingGrades[grade-1]?.country}</span>
        <p className="eyebrow">УРОВЕНЬ {grade} · {readingGrades[grade-1]?.cefr}</p>
        <h3>{readingGrades[grade-1]?.work}</h3>
        <p>{readingGrades[grade-1]?.author} · {readingGrades[grade-1]?.description}</p>
      </div>
      <div className="grade-progress"><strong>{gradeDone}/10</strong><span>частей уровня</span></div>
    </section>

    <div className="reading-viewbar">
      <div className="view-tabs">
        <button className={view==='immersive'?'active':''} onClick={()=>setViewAndStore('immersive')}>Большое чтение</button>
        <button className={view==='part'?'active':''} onClick={()=>setViewAndStore('part')}>Короткая сцена</button>
      </div>
      <div className="reading-metrics"><span>{wordCount.toLocaleString('ru-RU')} слов</span><span>≈ {readingMinutes} мин</span></div>
    </div>

    <div className={lookup?'reading-layout dictionary-open':'reading-layout'}>
      <aside className="reading-list" aria-label="Части этого уровня">
        <div className="reading-list-head"><strong>Сцены</strong><span>{gradeDone}/10</span></div>
        {entries.map((item,index)=><button key={item.id} className={view==='part'&&item.id===entry.id?'active':''} onClick={()=>chooseEntry(item.id)}>
          <span className={completed.has(item.id)?'reading-number done':'reading-number'}>{completed.has(item.id)?'✓':index+1}</span>
          <span><strong>{item.title}</strong><small>{countWords(item.text)} слов · ≈ {estimateLearnerMinutes(item.text)} мин</small></span>
        </button>)}
      </aside>

      <article className="classic-reader">
        <header className="reader-head">
          <div>
            <p className="eyebrow">{view==='immersive'?'IMMERSIVE ADAPTATION':entry.country+' · '+entry.work}</p>
            <h2>{view==='immersive'?longform.title:entry.title}</h2>
            <p>{entry.author} · учебная адаптация sENG · {wordCount.toLocaleString('ru-RU')} слов · ≈ {readingMinutes} мин</p>
          </div>
          <button className="speak-reading" onClick={()=>speak(visibleText,activeCountry)} aria-label="Озвучить английский текст">▶ EN</button>
        </header>

        <div className="reader-toolbar">
          <div className="translation-tabs">
            <button className={mode==='hidden'?'active':''} onClick={()=>setMode('hidden')}>Только EN</button>
            <button className={mode==='parallel'?'active':''} onClick={()=>setMode('parallel')}>EN + RU</button>
            <button className={mode==='russian'?'active':''} onClick={()=>setMode('russian')}>Перевод</button>
          </div>
          <div className="font-controls"><button onClick={()=>setFontScale(v=>Math.max(.88,v-.08))}>A−</button><button onClick={()=>setFontScale(v=>Math.min(1.3,v+.08))}>A+</button></div>
        </div>

        <div className={'reader-copy mode-'+mode+(view==='immersive'?' longform':'')} style={{fontSize:String(fontScale)+'em'}}>
          {view==='immersive'
            ? <Longform longform={longform} mode={mode} selected={lookup?.term} onWord={openWord}/>
            : <ReadingSection entry={entry} mode={mode} selected={lookup?.term} onWord={openWord}/>}
        </div>

        <section className="phrase-bank">
          <div className="section-heading"><div><p className="eyebrow">WORDS & CHUNKS</p><h3>Полезное из {view==='immersive'?'этой истории':'этой части'}</h3></div><small>Сохраняй только то, что действительно хочется встретить снова</small></div>
          <div className="phrase-grid">
            {(view==='immersive'?uniqueGlossary(entries).slice(0,24):entry.glossary.map(item=>({item,source:entry}))).map(({item:[term,translation],source})=>
              <button key={source.id+':'+term} onClick={()=>openPhrase(term,translation,source)}><strong>{term}</strong><span>{translation}</span></button>)}
          </div>
        </section>

        <footer className="reader-finish">
          <p>{view==='immersive'
            ? gradeDone===10?'✓ Весь уровень уже отмечен прочитанным.':'Большое чтение засчитает этот уровень целиком. Лучше начать без русского и включать перевод только там, где действительно теряется смысл.'
            : completed.has(entry.id)?'✓ Эта часть уже засчитана.':'Отметь часть после настоящего чтения, а не после быстрого просмотра.'}</p>
          <button className="primary-action" disabled={view==='immersive'?gradeDone===10:completed.has(entry.id)} onClick={markDone}>
            {view==='immersive'?(gradeDone===10?'Уровень прочитан ✓':'Отметить большое чтение'):(completed.has(entry.id)?'Прочитано ✓':'Отметить прочитанным')}
          </button>
        </footer>
      </article>

      <DictionaryPanel lookup={lookup} saveable={saveable} onClose={()=>setLookup(null)} onSave={saveLookup}/>
    </div>
  </div>
}

function Longform({longform,mode,selected,onWord}:{longform:ReadingLongform;mode:TranslationMode;selected?:string;onWord:(term:string,context:string,contextTranslation:string)=>void}){
  return <div className="longform-stack">{longform.sections.map((section,index)=><section className="longform-section" key={longform.grade+':'+index}>
    <div className="longform-marker"><span>{String(index+1).padStart(2,'0')}</span><div><small>IMMERSION</small><h3>{index===0?'Начало':index===longform.sections.length-1?'Финал':'Продолжение'}</h3></div></div>
    {mode!=='russian'&&<InteractiveLongformParagraph section={section} selected={selected} onWord={onWord}/>}
    {mode==='parallel'&&<div className="parallel-translation"><span>Перевод абзаца</span><p>{section.ru}</p></div>}
    {mode==='russian'&&<div className="russian-reading"><p>{section.ru}</p></div>}
  </section>)}</div>
}

function InteractiveLongformParagraph({section,selected,onWord}:{section:{en:string;ru:string};selected?:string;onWord:(term:string,context:string,contextTranslation:string)=>void}){
  const english=splitSentences(section.en)
  return <div className="interactive-reading-text">{english.map((sentence,sentenceIndex)=><span className="reading-sentence" key={sentenceIndex}>
    {tokenize(sentence).map((token,index)=>{
      if(!isWord(token))return <span key={index}>{token}</span>
      const active=Boolean(selected&&normalize(token)===normalize(selected))
      return <button className={active?'selected-word':''} key={index} onClick={()=>onWord(token,sentence,section.ru)}>{token}</button>
    })}{sentenceIndex<english.length-1?' ':''}
  </span>)}</div>
}

function ReadingSection({entry,mode,selected,onWord,bare=false}:{entry:ReadingEntry;mode:TranslationMode;selected?:string;onWord:(term:string,context:string,contextTranslation:string)=>void;bare?:boolean}){
  return <div className={bare?'reading-section bare':'reading-section'}>
    {mode!=='russian'&&<InteractiveText entry={entry} selected={selected} onWord={onWord}/>}
    {mode==='parallel'&&<div className="parallel-translation"><span>Перевод</span><p>{entry.translation}</p></div>}
    {mode==='russian'&&<div className="russian-reading"><p>{entry.translation}</p></div>}
  </div>
}

function InteractiveText({entry,selected,onWord}:{entry:ReadingEntry;selected?:string;onWord:(term:string,context:string,contextTranslation:string)=>void}){
  const english=splitSentences(entry.text),russian=splitSentences(entry.translation)
  return <div className="interactive-reading-text">{english.map((sentence,sentenceIndex)=><span className="reading-sentence" key={entry.id+':'+sentenceIndex}>
    {tokenize(sentence).map((token,index)=>{
      if(!isWord(token))return <span key={index}>{token}</span>
      const active=Boolean(selected&&normalize(token)===normalize(selected))
      return <button className={active?'selected-word':''} key={index} onClick={()=>onWord(token,sentence,russian[sentenceIndex]??entry.translation)}>{token}</button>
    })}{sentenceIndex<english.length-1?' ':''}
  </span>)}</div>
}

function DictionaryPanel({lookup,saveable,onClose,onSave}:{lookup:Lookup|null;saveable:boolean;onClose:()=>void;onSave:()=>void}){
  return <aside className={lookup?'reading-dictionary-panel open':'reading-dictionary-panel'} aria-live="polite">
    {lookup?<div className="dictionary-card">
      <div className="dictionary-top"><div><p className="eyebrow">СЛОВАРЬ В ЧТЕНИИ</p><h3>{lookup.term}</h3></div><button className="word-close" onClick={onClose} aria-label="Закрыть перевод">×</button></div>
      {lookup.translation?<div className="dictionary-translation"><strong>{lookup.translation}</strong>{lookup.base&&normalize(lookup.base)!==normalize(lookup.term)&&<small>Форма слова → {lookup.base}</small>}</div>
        : lookup.phrase?<div className="dictionary-translation phrase-hit"><small>В этом тексте слово встречается в выражении</small><strong>{lookup.phrase[0]}</strong><span>{lookup.phrase[1]}</span></div>
        : <div className="dictionary-translation sentence-fallback"><small>Отдельной словарной статьи пока нет. Ниже всегда есть перевод предложения, чтобы чтение не обрывалось.</small></div>}
      <div className="context-pair"><span>Контекст</span><p>{lookup.context}</p><span>Перевод предложения</span><p>{lookup.contextTranslation}</p></div>
      {saveable&&<button className="primary-action" onClick={onSave}>＋ {lookup.translation?'Добавить в обучение':'Сохранить выражение'}</button>}
    </div>:<div className="dictionary-empty"><span>Aa</span><strong>Нажми на слово</strong><p>Здесь появятся перевод, форма слова и русский контекст. Панель больше не будет прыгать поверх текста.</p></div>}
  </aside>
}

function buildGradeGlossary(entries:ReadingEntry[]){
  const singleWords=new Map<string,string>(),phrases:Array<[string,string]>=[]
  entries.forEach(entry=>entry.glossary.forEach(([term,translation])=>{
    const key=normalize(term)
    if(!key.includes(' ')&&!singleWords.has(key))singleWords.set(key,translation)
    else if(key.includes(' '))phrases.push([term,translation])
  }))
  return{singleWords,phrases}
}
function uniqueGlossary(entries:ReadingEntry[]){
  const seen=new Set<string>(),result:Array<{item:[string,string];source:ReadingEntry}>=[]
  entries.forEach(source=>source.glossary.forEach(item=>{const key=normalize(item[0]);if(!seen.has(key)){seen.add(key);result.push({item,source})}}))
  return result
}
function buildLexicon(items:LearningItem[]){
  const map=new Map<string,string>()
  items.forEach(item=>{const key=normalize(item.answer);if(key&&!map.has(key))map.set(key,item.translation)})
  return map
}
function findTranslation(term:string,local:Map<string,string>,lexicon:Map<string,string>){
  const word=normalize(term)
  const candidates=lemmaCandidates(word)
  for(const key of candidates){
    const hit=local.get(key)||readingWordDictionary[key]||lexicon.get(key)
    if(hit)return{translation:hit,base:key}
  }
  return{} as {translation?:string;base?:string}
}
function lemmaCandidates(word:string){
  const result=[word]
  const irregular=commonIrregularBases[word]
  if(irregular)result.push(irregular)
  if(word.endsWith('ies')&&word.length>4)result.push(word.slice(0,-3)+'y')
  if(word.endsWith('ves')&&word.length>4)result.push(word.slice(0,-3)+'f',word.slice(0,-3)+'fe')
  if(word.endsWith('ing')&&word.length>5)result.push(word.slice(0,-3),word.slice(0,-3)+'e',word.slice(0,-4))
  if(word.endsWith('ied')&&word.length>4)result.push(word.slice(0,-3)+'y')
  if(word.endsWith('ed')&&word.length>4)result.push(word.slice(0,-2),word.slice(0,-1))
  if(word.endsWith('es')&&word.length>4)result.push(word.slice(0,-2),word.slice(0,-1))
  if(word.endsWith('s')&&word.length>3)result.push(word.slice(0,-1))
  return[...new Set(result)]
}
function findPhraseForWord(term:string,phrases:Array<[string,string]>){
  const word=normalize(term)
  return phrases.find(([phrase])=>normalize(phrase).split(' ').includes(word))
}
function pairedSentenceTranslation(entry:ReadingEntry,term:string){
  const english=splitSentences(entry.text),russian=splitSentences(entry.translation),needle=normalize(term)
  const index=english.findIndex(sentence=>normalize(sentence).includes(needle))
  return index>=0?russian[index]??entry.translation:entry.translation
}
function sentenceFor(text:string,target:string){
  const needle=normalize(target)
  return splitSentences(text).find(sentence=>normalize(sentence).includes(needle))??text
}
function splitSentences(text:string){return text.trim().split(/(?<=[.!?])\s+/).filter(Boolean)}
function tokenize(sentence:string){return sentence.split(/(\s+|(?=[,.;:!?“”"()—])|(?<=[,.;:!?“”"()—]))/).filter(token=>token!=='')}
function isWord(token:string){return /[A-Za-z]/.test(token)}
function cleanTerm(value:string){return value.replace(/^[^A-Za-z’']+|[^A-Za-z’']+$/g,'')}
function normalize(value:string){return value.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z' -]/g,'').replace(/\s+/g,' ').trim()}
function countWords(text:string){return (text.match(/[A-Za-z]+(?:['’][A-Za-z]+)*/g)??[]).length}
function estimateLearnerMinutes(text:string){return Math.max(1,Math.ceil(countWords(text)/105))}
function gradeForLevel(level:string){
  const value=level.toUpperCase()
  if(value.includes('C2'))return 10
  if(value.includes('C1'))return 9
  if(value.includes('B2'))return 7
  if(value.includes('B1'))return 5
  if(value.includes('A2'))return 3
  return 1
}
function loadCompleted(){try{return new Set<string>(JSON.parse(localStorage.getItem(completedKey)??'[]'))}catch{return new Set<string>()}}
function saveCompleted(items:Set<string>){try{localStorage.setItem(completedKey,JSON.stringify([...items]))}catch{/* storage can be unavailable */}}
function loadView():ReadingView{try{return localStorage.getItem(viewKey)==='part'?'part':'immersive'}catch{return'immersive'}}
function saveView(view:ReadingView){try{localStorage.setItem(viewKey,view)}catch{/* storage can be unavailable */}}
function speak(text:string,country?:string){
  if(!('speechSynthesis'in window))return
  window.speechSynthesis.cancel()
  const utterance=new SpeechSynthesisUtterance(text)
  utterance.lang=country==='UK'?'en-GB':'en-US'
  utterance.rate=.82
  window.speechSynthesis.speak(utterance)
}
