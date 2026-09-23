import { useEffect,useMemo,useState } from 'react'
import { translateReadingWord,type ReadingTranslationResult } from '../lib/readingTranslation'
import type { ActivityKind } from '../types'

type BookMeta={
  slug:string
  title:string
  author:string
  gutenbergId:number
  cefr:string
  country:'UK'|'US'
  year:number
  description:string
  sourcePage:string
  source:string
  publicDomain:boolean
  wordCount:number
  partCount:number
}

type BookPart={id:string;title:string;wordCount:number;text:string}
type BookPayload={meta:BookMeta;parts:BookPart[]}
type Lookup={
  term:string
  context:string
  translation?:string
  base?:string
  source?:ReadingTranslationResult['source']
  loading:boolean
  failed?:boolean
}

type Props={
  onSave:(text:string,translation:string,context:string)=>void
  onActivity:(kind:ActivityKind,durationMinutes:number)=>void
}

const progressKey='seng-books-progress-v1'

export function BooksLibrary({onSave,onActivity}:Props){
  const[catalog,setCatalog]=useState<BookMeta[]>([])
  const[catalogLoading,setCatalogLoading]=useState(true)
  const[error,setError]=useState('')
  const[selectedSlug,setSelectedSlug]=useState<string|null>(null)
  const[book,setBook]=useState<BookPayload|null>(null)
  const[bookLoading,setBookLoading]=useState(false)
  const[partIndex,setPartIndex]=useState(0)
  const[lookup,setLookup]=useState<Lookup|null>(null)
  const[fontScale,setFontScale]=useState(1)
  const[country,setCountry]=useState<'ALL'|'UK'|'US'>('ALL')
  const[progress,setProgress]=useState<Record<string,number>>(()=>loadProgress())

  useEffect(()=>{
    let cancelled=false
    void fetchAsset<BookMeta[]>('books/catalog.json').then(data=>{
      if(cancelled)return
      if(!data){setError('Не удалось загрузить каталог книг. Попробуй обновить страницу.');setCatalogLoading(false);return}
      setCatalog(data)
      setCatalogLoading(false)
    })
    return()=>{cancelled=true}
  },[])

  useEffect(()=>{
    if(!selectedSlug){setBook(null);return}
    let cancelled=false
    setBookLoading(true);setError('');setLookup(null)
    void fetchAsset<BookPayload>(`books/${selectedSlug}.json`).then(data=>{
      if(cancelled)return
      if(!data){setError('Не удалось загрузить книгу. Попробуй ещё раз.');setBookLoading(false);return}
      setBook(data)
      const saved=Math.max(0,Math.min((progress[selectedSlug]??0),data.parts.length-1))
      setPartIndex(saved)
      setBookLoading(false)
    })
    return()=>{cancelled=true}
  },[selectedSlug])

  const filtered=useMemo(()=>country==='ALL'?catalog:catalog.filter(item=>item.country===country),[catalog,country])
  const current=book?.parts[partIndex]

  const openWord=(raw:string,paragraph:string)=>{
    const term=cleanTerm(raw)
    if(!term)return
    const context=sentenceFor(paragraph,term)
    setLookup({term,context,loading:true})
    void translateReadingWord(term).then(result=>{
      setLookup(currentLookup=>{
        if(!currentLookup||currentLookup.term!==term||currentLookup.context!==context)return currentLookup
        if(!result)return{...currentLookup,loading:false,failed:true}
        return{...currentLookup,loading:false,translation:result.translation,base:result.base,source:result.source}
      })
    })
  }

  const finishPart=()=>{
    if(!book||!current)return
    const next=Math.max(progress[book.meta.slug]??0,partIndex+1)
    const updated={...progress,[book.meta.slug]:next}
    setProgress(updated);saveProgress(updated)
    onActivity('reading',Math.max(2,Math.round(current.wordCount/110)))
    if(partIndex<book.parts.length-1){
      setPartIndex(partIndex+1)
      setLookup(null)
      requestAnimationFrame(()=>document.querySelector('.books-reader')?.scrollIntoView({behavior:'smooth',block:'start'}))
    }
  }

  if(catalogLoading)return <div className="books-loading"><span className="dictionary-spinner"/><strong>Загружаю библиотеку…</strong></div>

  if(!selectedSlug)return <div className="books-library">
    <section className="books-hero">
      <div><p className="eyebrow">FULL ORIGINAL BOOKS · PUBLIC DOMAIN</p><h2>Книги в оригинале</h2><p>Полные произведения без учебного пересказа. Нажимай на любое слово — основной перевод берётся из собственной базы sENG, а внешний сервис используется только как резерв.</p></div>
      <div className="books-total"><strong>{catalog.length}</strong><span>полных книг</span></div>
    </section>
    <div className="books-filters"><button className={country==='ALL'?'active':''} onClick={()=>setCountry('ALL')}>Все</button><button className={country==='UK'?'active':''} onClick={()=>setCountry('UK')}>UK</button><button className={country==='US'?'active':''} onClick={()=>setCountry('US')}>US</button></div>
    {error&&<p className="books-error">{error}</p>}
    <div className="books-grid">{filtered.map(item=>{
      const done=Math.min(progress[item.slug]??0,item.partCount)
      const percent=item.partCount?Math.round(done/item.partCount*100):0
      return <button className="book-card" key={item.slug} onClick={()=>setSelectedSlug(item.slug)}>
        <div className="book-card-top"><span>{item.country}</span><span>{item.cefr}</span></div>
        <div className="book-monogram">{monogram(item.title)}</div>
        <div className="book-card-copy"><h3>{item.title}</h3><strong>{item.author}</strong><p>{item.description}</p></div>
        <div className="book-card-meta"><span>{formatWords(item.wordCount)} слов</span><span>{item.partCount} частей</span><span>{item.year}</span></div>
        <div className="book-progress"><i style={{width:`${percent}%`}}/><span>{percent}%</span></div>
      </button>
    })}</div>
    <p className="books-source-note">Оригинальные англоязычные тексты подготавливаются из изданий Project Gutenberg при публикации сайта. Источник каждой книги указан внутри читалки.</p>
  </div>

  if(bookLoading||!book||!current)return <div className="books-loading"><span className="dictionary-spinner"/><strong>Открываю книгу…</strong></div>

  const done=Math.min(progress[book.meta.slug]??0,book.parts.length)
  return <div className={lookup?'books-workspace dictionary-open':'books-workspace'}>
    <aside className="books-toc">
      <button className="books-back" onClick={()=>{setSelectedSlug(null);setLookup(null)}}>← Библиотека</button>
      <div className="books-toc-title"><span>{book.meta.country} · {book.meta.cefr}</span><strong>{book.meta.title}</strong><small>{book.meta.author}</small></div>
      <div className="books-parts">{book.parts.map((part,index)=><button key={part.id} className={index===partIndex?'active':''} onClick={()=>{setPartIndex(index);setLookup(null)}}>
        <span className={index<done?'done':''}>{index<done?'✓':index+1}</span><div><strong>{part.title}</strong><small>{formatWords(part.wordCount)} слов</small></div>
      </button>)}</div>
    </aside>

    <article className="books-reader">
      <header className="books-reader-head">
        <div><p className="eyebrow">ORIGINAL TEXT · {book.meta.country} · {book.meta.cefr}</p><h1>{book.meta.title}</h1><p>{book.meta.author} · {book.meta.year} · часть {partIndex+1}/{book.parts.length}</p></div>
        <button className="speak-reading" onClick={()=>speak(current.text)}>▶ EN</button>
      </header>
      <div className="books-reader-toolbar">
        <div><span>{formatWords(current.wordCount)} слов</span><span>≈ {Math.max(2,Math.round(current.wordCount/110))} мин</span></div>
        <div className="font-controls"><button onClick={()=>setFontScale(v=>Math.max(.86,v-.08))}>A−</button><button onClick={()=>setFontScale(v=>Math.min(1.34,v+.08))}>A+</button></div>
      </div>
      <div className="books-copy" style={{fontSize:`${fontScale}em`}}>
        {current.text.split(/\n\n+/).map((paragraph,index)=><BookParagraph key={index} text={paragraph} selected={lookup?.term} onWord={openWord}/>)}
      </div>
      <footer className="books-reader-footer">
        <div><strong>{done}/{book.parts.length} частей прочитано</strong><span>Оригинальный текст · {formatWords(book.meta.wordCount)} слов во всей книге</span></div>
        <button className="primary-action" onClick={finishPart}>{partIndex<book.parts.length-1?'Прочитано · дальше →':'Закончить книгу ✓'}</button>
      </footer>
      <div className="books-attribution">Источник текста: <a href={book.meta.sourcePage} target="_blank" rel="noreferrer">{book.meta.source}</a> · Project Gutenberg помечает выбранное издание как public domain.</div>
    </article>

    <aside className="books-dictionary">
      {lookup?<div className="dictionary-card">
        <div className="dictionary-top"><div><p className="eyebrow">СЛОВАРЬ КНИГИ</p><h3>{lookup.term}</h3></div><button className="word-close" onClick={()=>setLookup(null)} aria-label="Закрыть перевод">×</button></div>
        {lookup.loading?<div className="dictionary-translation dictionary-loading"><span className="dictionary-spinner"/><div><strong>Ищу перевод…</strong><small>Сначала в собственной базе sENG.</small></div></div>
          :lookup.translation?<div className="dictionary-translation"><strong>{lookup.translation}</strong>{lookup.base&&normalize(lookup.base)!==normalize(lookup.term)&&<small>Форма слова → {lookup.base}</small>}<small>{lookup.source==='site'?'Локальная база sENG · WikDict / Wiktionary':'Резервный онлайн-перевод'}</small></div>
          :<div className="dictionary-translation sentence-fallback"><small>Отдельный перевод не найден. Контекст ниже поможет разобрать значение.</small></div>}
        <div className="context-pair"><span>Контекст</span><p>{lookup.context}</p></div>
        {lookup.translation&&<button className="primary-action" onClick={()=>onSave(lookup.term,lookup.translation!,lookup.context)}>＋ Добавить в обучение</button>}
      </div>:<div className="dictionary-empty"><span>Aa</span><strong>Нажми на слово</strong><p>Перевод появится здесь, не закрывая книгу.</p></div>}
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
function saveProgress(progress:Record<string,number>){try{localStorage.setItem(progressKey,JSON.stringify(progress))}catch{/* optional persistence */}}

function speak(text:string){
  if(!('speechSynthesis'in window))return
  window.speechSynthesis.cancel()
  const utterance=new SpeechSynthesisUtterance(text.slice(0,12000))
  utterance.lang='en-US'
  utterance.rate=.88
  window.speechSynthesis.speak(utterance)
}
