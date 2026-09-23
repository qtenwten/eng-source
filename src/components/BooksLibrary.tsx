import { useEffect,useMemo,useState } from 'react'
import { readingGrades } from '../data/readingLibrary'
import { readingLongforms } from '../data/readingLongforms'
import { translateReadingContext,translateReadingWord,type ReadingTranslationResult } from '../lib/readingTranslation'
import type { ActivityKind } from '../types'

type LevelBucket='A1'|'A2'|'B1'|'B2'|'C1'
type BookKind='original'|'adapted'

type BookMeta={
  slug:string
  title:string
  author:string
  gutenbergId:number
  cefr:string
  country:'UK'|'US'|'CA'
  year:number
  description:string
  sourcePage:string
  source:string
  publicDomain:boolean
  wordCount:number
  partCount:number
}

type BookPart={
  id:string
  title:string
  wordCount:number
  text:string
  translation?:string
}

type BookPayload={
  meta:{
    id:string
    slug:string
    kind:BookKind
    title:string
    author:string
    cefr:string
    country:string
    year?:number
    description:string
    sourcePage?:string
    source:string
    wordCount:number
    partCount:number
  }
  parts:BookPart[]
}

type CatalogItem=BookPayload['meta']

type Lookup={
  term:string
  context:string
  contextTranslation?:string
  translation?:string
  base?:string
  source?:ReadingTranslationResult['source']
  loadingWord:boolean
  loadingContext:boolean
  wordFailed?:boolean
  contextFailed?:boolean
}

type Props={
  onSave:(text:string,translation:string,context:string)=>void
  onActivity:(kind:ActivityKind,durationMinutes:number)=>void
}

const progressKey='seng-books-progress-v2'
const levelOrder:LevelBucket[]=['A1','A2','B1','B2','C1']
const levelInfo:Record<LevelBucket,{title:string;description:string}>={
  A1:{title:'A1 · Начальный',description:'Короткие адаптации с базовой лексикой и простыми предложениями.'},
  A2:{title:'A2 · Базовый',description:'Адаптации и самые доступные детские оригиналы.'},
  B1:{title:'B1 · Средний',description:'Детская и подростковая классика в оригинале с понятным сюжетом.'},
  B2:{title:'B2 · Уверенный',description:'Полноценная литературная проза, больше идиом и сложных конструкций.'},
  C1:{title:'C1 · Продвинутый',description:'Сложная классика почти без скидок на изучающего язык.'},
}

export function BooksLibrary({onSave,onActivity}:Props){
  const[catalog,setCatalog]=useState<BookMeta[]>([])
  const[catalogLoading,setCatalogLoading]=useState(true)
  const[error,setError]=useState('')
  const[selectedId,setSelectedId]=useState<string|null>(null)
  const[book,setBook]=useState<BookPayload|null>(null)
  const[bookLoading,setBookLoading]=useState(false)
  const[partIndex,setPartIndex]=useState(0)
  const[lookup,setLookup]=useState<Lookup|null>(null)
  const[fontScale,setFontScale]=useState(1)
  const[levelFilter,setLevelFilter]=useState<'ALL'|LevelBucket>('ALL')
  const[kindFilter,setKindFilter]=useState<'ALL'|BookKind>('ALL')
  const[progress,setProgress]=useState<Record<string,number>>(()=>loadProgress())

  const adaptedCatalog=useMemo<CatalogItem[]>(()=>readingLongforms.map(longform=>{
    const grade=readingGrades.find(item=>item.grade===longform.grade)
    const wordCount=longform.sections.reduce((sum,section)=>sum+countWords(section.en),0)
    const cefr=grade?.cefr??'B1'
    return{
      id:`adapt:${longform.grade}`,
      slug:`adapt-${longform.grade}`,
      kind:'adapted',
      title:grade?.work??longform.title,
      author:grade?.author??'sENG',
      cefr,
      country:grade?.country??'UK/US',
      description:grade?.description??'Учебная адаптация sENG для постепенного чтения.',
      source:'Адаптация sENG',
      wordCount,
      partCount:longform.sections.length,
    }
  }),[])

  useEffect(()=>{
    let cancelled=false
    void fetchAsset<BookMeta[]>('books/catalog.json').then(data=>{
      if(cancelled)return
      if(!data){
        setError('Не удалось загрузить каталог оригинальных книг. Адаптации sENG всё равно доступны.')
        setCatalogLoading(false)
        return
      }
      setCatalog(data)
      setCatalogLoading(false)
    })
    return()=>{cancelled=true}
  },[])

  const originalCatalog=useMemo<CatalogItem[]>(()=>catalog.map(item=>({
    id:`orig:${item.slug}`,
    slug:item.slug,
    kind:'original',
    title:item.title,
    author:item.author,
    cefr:item.cefr,
    country:item.country,
    year:item.year,
    description:item.description,
    sourcePage:item.sourcePage,
    source:item.source,
    wordCount:item.wordCount,
    partCount:item.partCount,
  })),[catalog])

  const fullCatalog=useMemo(()=>[...adaptedCatalog,...originalCatalog],[adaptedCatalog,originalCatalog])

  const filtered=useMemo(()=>fullCatalog
    .filter(item=>levelFilter==='ALL'||levelBucket(item.cefr)===levelFilter)
    .filter(item=>kindFilter==='ALL'||item.kind===kindFilter)
    .sort((a,b)=>levelOrder.indexOf(levelBucket(a.cefr))-levelOrder.indexOf(levelBucket(b.cefr))||Number(a.kind==='original')-Number(b.kind==='original')||a.title.localeCompare(b.title))
  ,[fullCatalog,levelFilter,kindFilter])

  const grouped=useMemo(()=>levelOrder.map(level=>({
    level,
    items:filtered.filter(item=>levelBucket(item.cefr)===level)
  })).filter(group=>group.items.length),[filtered])

  useEffect(()=>{
    if(!selectedId){setBook(null);return}

    if(selectedId.startsWith('adapt:')){
      const gradeNumber=Number(selectedId.split(':')[1])
      const longform=readingLongforms.find(item=>item.grade===gradeNumber)
      const grade=readingGrades.find(item=>item.grade===gradeNumber)
      if(!longform||!grade){setError('Не удалось открыть адаптацию.');return}
      const parts=longform.sections.map((section,index)=>({
        id:`part-${index+1}`,
        title:index===0?'Начало':index===longform.sections.length-1?'Финал':`Часть ${index+1}`,
        wordCount:countWords(section.en),
        text:section.en,
        translation:section.ru,
      }))
      const payload:BookPayload={
        meta:{
          id:selectedId,
          slug:`adapt-${gradeNumber}`,
          kind:'adapted',
          title:grade.work,
          author:grade.author,
          cefr:grade.cefr,
          country:grade.country,
          description:grade.description,
          source:'Учебная адаптация sENG',
          wordCount:parts.reduce((sum,part)=>sum+part.wordCount,0),
          partCount:parts.length,
        },
        parts,
      }
      setBook(payload)
      setPartIndex(Math.max(0,Math.min(progress[selectedId]??0,parts.length-1)))
      setLookup(null)
      setBookLoading(false)
      return
    }

    const slug=selectedId.replace(/^orig:/,'')
    let cancelled=false
    setBookLoading(true);setError('');setLookup(null)
    void fetchAsset<{meta:BookMeta;parts:BookPart[]}>(`books/${slug}.json`).then(data=>{
      if(cancelled)return
      if(!data){setError('Не удалось загрузить книгу. Попробуй ещё раз.');setBookLoading(false);return}
      const payload:BookPayload={
        meta:{
          id:selectedId,
          slug:data.meta.slug,
          kind:'original',
          title:data.meta.title,
          author:data.meta.author,
          cefr:data.meta.cefr,
          country:data.meta.country,
          year:data.meta.year,
          description:data.meta.description,
          sourcePage:data.meta.sourcePage,
          source:data.meta.source,
          wordCount:data.meta.wordCount,
          partCount:data.meta.partCount,
        },
        parts:data.parts,
      }
      setBook(payload)
      const saved=Math.max(0,Math.min((progress[selectedId]??0),data.parts.length-1))
      setPartIndex(saved)
      setBookLoading(false)
    })
    return()=>{cancelled=true}
  },[selectedId])

  const current=book?.parts[partIndex]

  const openWord=(raw:string,paragraph:string)=>{
    if(!book||!current)return
    const term=cleanTerm(raw)
    if(!term)return
    const context=sentenceFor(paragraph,term)
    const adaptedContext=book.meta.kind==='adapted'?current.translation:undefined

    setLookup({
      term,
      context,
      contextTranslation:adaptedContext,
      loadingWord:true,
      loadingContext:book.meta.kind==='original',
    })

    void translateReadingWord(term).then(result=>{
      setLookup(currentLookup=>{
        if(!currentLookup||currentLookup.term!==term||currentLookup.context!==context)return currentLookup
        if(!result)return{...currentLookup,loadingWord:false,wordFailed:true}
        return{
          ...currentLookup,
          loadingWord:false,
          translation:result.translation,
          base:result.base,
          source:result.source,
        }
      })
    })

    if(book.meta.kind==='original'){
      void translateReadingContext(context).then(translation=>{
        setLookup(currentLookup=>{
          if(!currentLookup||currentLookup.term!==term||currentLookup.context!==context)return currentLookup
          if(!translation)return{...currentLookup,loadingContext:false,contextFailed:true}
          return{...currentLookup,loadingContext:false,contextTranslation:translation}
        })
      })
    }
  }

  const finishPart=()=>{
    if(!book||!current)return
    const next=Math.max(progress[book.meta.id]??0,partIndex+1)
    const updated={...progress,[book.meta.id]:next}
    setProgress(updated);saveProgress(updated)
    onActivity('reading',Math.max(2,Math.round(current.wordCount/110)))
    if(partIndex<book.parts.length-1){
      setPartIndex(partIndex+1)
      setLookup(null)
      requestAnimationFrame(()=>document.querySelector('.books-reader')?.scrollIntoView({behavior:'smooth',block:'start'}))
    }
  }

  if(catalogLoading)return <div className="books-loading"><span className="dictionary-spinner"/><strong>Собираю библиотеку по уровням…</strong></div>

  if(!selectedId)return <div className="books-library">
    <section className="books-hero">
      <div>
        <p className="eyebrow">GRADED READERS + FULL ORIGINALS</p>
        <h2>Библиотека по уровню английского</h2>
        <p>Сначала — простые адаптации A1/A2, дальше детские и подростковые оригиналы, затем полноценная классика B2/C1. CEFR здесь — практический ориентир sENG, а не официальная сертификация книги.</p>
      </div>
      <div className="books-total"><strong>{fullCatalog.length}</strong><span>книг и адаптаций</span></div>
    </section>

    <div className="books-filter-stack">
      <div className="books-filter-row"><span>Уровень</span><div className="books-filters">
        <button className={levelFilter==='ALL'?'active':''} onClick={()=>setLevelFilter('ALL')}>Все</button>
        {levelOrder.map(level=><button key={level} className={levelFilter===level?'active':''} onClick={()=>setLevelFilter(level)}>{level}</button>)}
      </div></div>
      <div className="books-filter-row"><span>Тип</span><div className="books-filters">
        <button className={kindFilter==='ALL'?'active':''} onClick={()=>setKindFilter('ALL')}>Все</button>
        <button className={kindFilter==='adapted'?'active':''} onClick={()=>setKindFilter('adapted')}>Адаптации</button>
        <button className={kindFilter==='original'?'active':''} onClick={()=>setKindFilter('original')}>Оригиналы</button>
      </div></div>
    </div>

    {error&&<p className="books-error">{error}</p>}

    <div className="books-levels">{grouped.map(group=><section className="books-level-section" key={group.level}>
      <header className="books-level-head">
        <div><p className="eyebrow">{group.level}</p><h3>{levelInfo[group.level].title}</h3><p>{levelInfo[group.level].description}</p></div>
        <strong>{group.items.length}</strong>
      </header>
      <div className="books-grid">{group.items.map(item=>{
        const done=Math.min(progress[item.id]??0,item.partCount)
        const percent=item.partCount?Math.round(done/item.partCount*100):0
        return <button className={`book-card ${item.kind==='adapted'?'adapted':''}`} key={item.id} onClick={()=>setSelectedId(item.id)}>
          <div className="book-card-top"><span>{item.kind==='adapted'?'АДАПТАЦИЯ sENG':'ОРИГИНАЛ · '+item.country}</span><span>{item.cefr}</span></div>
          <div className="book-monogram">{monogram(item.title)}</div>
          <div className="book-card-copy"><h3>{item.title}</h3><strong>{item.author}</strong><p>{item.description}</p></div>
          <div className="book-card-meta"><span>{formatWords(item.wordCount)} слов</span><span>{item.partCount} частей</span>{item.year&&<span>{item.year}</span>}</div>
          <div className="book-progress"><i style={{width:`${percent}%`}}/><span>{percent}%</span></div>
        </button>
      })}</div>
    </section>)}</div>

    <p className="books-source-note">Оригиналы подготавливаются из изданий Project Gutenberg и хранятся на sENG после публикации. Адаптации A1–C1 написаны для учебного чтения на основе общественного достояния.</p>
  </div>

  if(bookLoading||!book||!current)return <div className="books-loading"><span className="dictionary-spinner"/><strong>Открываю книгу…</strong></div>

  const done=Math.min(progress[book.meta.id]??0,book.parts.length)
  return <div className={lookup?'books-workspace dictionary-open':'books-workspace'}>
    <aside className="books-toc">
      <button className="books-back" onClick={()=>{setSelectedId(null);setLookup(null)}}>← Библиотека</button>
      <div className="books-toc-title">
        <span>{book.meta.kind==='adapted'?'АДАПТАЦИЯ sENG':book.meta.country+' · ОРИГИНАЛ'} · {book.meta.cefr}</span>
        <strong>{book.meta.title}</strong>
        <small>{book.meta.author}</small>
      </div>
      <div className="books-parts">{book.parts.map((part,index)=><button key={part.id} className={index===partIndex?'active':''} onClick={()=>{setPartIndex(index);setLookup(null)}}>
        <span className={index<done?'done':''}>{index<done?'✓':index+1}</span><div><strong>{part.title}</strong><small>{formatWords(part.wordCount)} слов</small></div>
      </button>)}</div>
    </aside>

    <article className="books-reader">
      <header className="books-reader-head">
        <div>
          <p className="eyebrow">{book.meta.kind==='adapted'?'GRADED READER · sENG ADAPTATION':'ORIGINAL TEXT'} · {book.meta.cefr}</p>
          <h1>{book.meta.title}</h1>
          <p>{book.meta.author}{book.meta.year?` · ${book.meta.year}`:''} · часть {partIndex+1}/{book.parts.length}</p>
        </div>
        <button className="speak-reading" onClick={()=>speak(current.text)}>▶ EN</button>
      </header>
      <div className="books-reader-toolbar">
        <div><span>{formatWords(current.wordCount)} слов</span><span>≈ {Math.max(2,Math.round(current.wordCount/110))} мин</span><span>{book.meta.kind==='adapted'?'учебная адаптация':'полный оригинал'}</span></div>
        <div className="font-controls"><button onClick={()=>setFontScale(v=>Math.max(.86,v-.08))}>A−</button><button onClick={()=>setFontScale(v=>Math.min(1.34,v+.08))}>A+</button></div>
      </div>
      <div className="books-copy" style={{fontSize:`${fontScale}em`}}>
        {current.text.split(/\n\n+/).map((paragraph,index)=><BookParagraph key={index} text={paragraph} selected={lookup?.term} onWord={openWord}/>)}
        {book.meta.kind==='adapted'&&current.translation&&<details className="adapted-part-translation"><summary>Показать перевод этой части</summary><p>{current.translation}</p></details>}
      </div>
      <footer className="books-reader-footer">
        <div><strong>{done}/{book.parts.length} частей прочитано</strong><span>{book.meta.kind==='adapted'?'Адаптация по уровню':'Оригинальный текст'} · {formatWords(book.meta.wordCount)} слов</span></div>
        <button className="primary-action" onClick={finishPart}>{partIndex<book.parts.length-1?'Прочитано · дальше →':'Закончить книгу ✓'}</button>
      </footer>
      {book.meta.kind==='original'&&book.meta.sourcePage
        ?<div className="books-attribution">Источник текста: <a href={book.meta.sourcePage} target="_blank" rel="noreferrer">{book.meta.source}</a> · Project Gutenberg помечает выбранное издание как public domain.</div>
        :<div className="books-attribution">Учебная адаптация sENG на основе классического произведения общественного достояния.</div>}
    </article>

    <aside className="books-dictionary">
      {lookup?<div className="dictionary-card">
        <div className="dictionary-top"><div><p className="eyebrow">СЛОВАРЬ КНИГИ</p><h3>{lookup.term}</h3></div><button className="word-close" onClick={()=>setLookup(null)} aria-label="Закрыть перевод">×</button></div>

        {lookup.loadingWord?<div className="dictionary-translation dictionary-loading"><span className="dictionary-spinner"/><div><strong>Ищу слово…</strong><small>Сначала в собственной базе sENG.</small></div></div>
          :lookup.translation?<div className="dictionary-translation"><strong>{lookup.translation}</strong>{lookup.base&&normalize(lookup.base)!==normalize(lookup.term)&&<small>Форма слова → {lookup.base}</small>}<small>{lookup.source==='site'?'Локальная база sENG · WikDict / Wiktionary':'Резервный онлайн-перевод'}</small></div>
          :<div className="dictionary-translation sentence-fallback"><small>Отдельный перевод слова не найден.</small></div>}

        <div className="context-pair">
          <span>Контекст</span><p>{lookup.context}</p>
          <span>Перевод контекста</span>
          {lookup.loadingContext?<div className="context-loading"><span className="dictionary-spinner"/><small>Перевожу предложение…</small></div>
            :lookup.contextTranslation?<p className="context-ru">{lookup.contextTranslation}</p>
            :<p className="context-missing">{lookup.contextFailed?'Не удалось перевести контекст сейчас. Попробуй нажать ещё раз.':'Перевод контекста недоступен.'}</p>}
        </div>

        {lookup.translation&&<button className="primary-action" onClick={()=>onSave(lookup.term,lookup.translation!,lookup.context)}>＋ Добавить в обучение</button>}
      </div>:<div className="dictionary-empty"><span>Aa</span><strong>Нажми на слово</strong><p>Справа появятся перевод слова и русский перевод предложения, в котором оно встретилось.</p></div>}
    </aside>
  </div>
}

function BookParagraph({text,selected,onWord}:{text:string;selected?:string;onWord:(word:string,paragraph:string)=>void}){
  const tokens=text.split(/(\s+|(?=[,.;:!?“”"'()—–\[\]])|(?<=[,.;:!?“”"'()—–\[\]]))/)
  const heading=isHeading(text)
  if(heading)return <h2 className="book-inline-heading">{text}</h2>
  return <p className="book-paragraph">{tokens.map((token,index)=>{
    if(!/[A-Za-z]/.test(token))return <span key={index}>{token}</span>
    const active=Boolean(selected&&normalize(cleanTerm(token))===normalize(selected))
    return <button className={active?'selected-word':''} key={index} onClick={()=>onWord(token,text)}>{token}</button>
  })}</p>
}

function levelBucket(cefr:string):LevelBucket{
  const value=cefr.toUpperCase()
  if(value.startsWith('A1'))return'A1'
  if(value.startsWith('A2'))return'A2'
  if(value.startsWith('B1'))return'B1'
  if(value.startsWith('B2'))return'B2'
  return'C1'
}

function isHeading(text:string){
  const clean=text.trim()
  if(clean.length>110)return false
  if(/^(chapter|book|part)\s+[ivxlcdm0-9]+\b/i.test(clean))return true
  return clean.split(/\s+/).length<=10&&clean===clean.toUpperCase()&&/[A-Z]/.test(clean)
}

function sentenceFor(paragraph:string,term:string){
  const sentences=paragraph.split(/(?<=[.!?])\s+(?=[A-Z“"'])/)
  return sentences.find(sentence=>sentence.toLowerCase().includes(term.toLowerCase()))??paragraph
}

function cleanTerm(value:string){return value.replace(/^[^A-Za-z’']+|[^A-Za-z’']+$/g,'').replace(/[’‘]/g,"'")}
function normalize(value:string){return value.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z' -]/g,'').trim()}
function monogram(title:string){return title.split(/\s+/).filter(word=>!/^(the|a|an|of|and)$/i.test(word)).slice(0,2).map(word=>word[0]?.toUpperCase()).join('')||'B'}
function countWords(value:string){return(value.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g)??[]).length}
function formatWords(value:number){return value>=1000?`${Math.round(value/100)/10}k`:String(value)}

function assetUrl(path:string){
  const base=import.meta.env.BASE_URL||'./'
  return new URL(`${base}${path}`,window.location.href).toString()
}

async function fetchAsset<T>(path:string):Promise<T|null>{
  try{
    const response=await fetch(assetUrl(path),{cache:'force-cache'})
    if(!response.ok)return null
    return await response.json() as T
  }catch{return null}
}

function loadProgress(){
  try{
    const parsed=JSON.parse(localStorage.getItem(progressKey)??'{}') as Record<string,number>
    return parsed&&typeof parsed==='object'?parsed:{}
  }catch{return{}}
}

function saveProgress(progress:Record<string,number>){
  try{localStorage.setItem(progressKey,JSON.stringify(progress))}
  catch{/* optional persistence */}
}

function speak(text:string){
  if(!('speechSynthesis'in window))return
  window.speechSynthesis.cancel()
  const utterance=new SpeechSynthesisUtterance(text.slice(0,12000))
  utterance.lang='en-US'
  utterance.rate=.88
  window.speechSynthesis.speak(utterance)
}
