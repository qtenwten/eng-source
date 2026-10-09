import { useMemo,useState } from 'react'
import { conversationCategories } from '../data/conversationPhrases'
import type { ConversationPhrase,ConversationPhraseRole } from '../data/conversationPhrases'

interface Props{onStart:()=>void}

const roleLabels:Record<ConversationPhraseRole,string>={
  question:'Вопрос',
  answer:'Ответ',
  reaction:'Реакция',
  polite:'Вежливо',
  survival:'Если не понял',
}

export function ConversationPhrases({onStart}:Props){
  const[categoryId,setCategoryId]=useState('all')
  const[query,setQuery]=useState('')
  const items=useMemo(()=>conversationCategories.flatMap(category=>category.phrases.map(phrase=>({phrase,category}))),[])
  const normalized=query.trim().toLowerCase()
  const visible=items.filter(({phrase,category})=>{
    if(categoryId!=='all'&&category.id!==categoryId)return false
    if(!normalized)return true
    return [phrase.english,phrase.translation,phrase.note,...phrase.variants,...phrase.replies.flatMap(reply=>reply)].some(value=>value.toLowerCase().includes(normalized))
  })

  return <>
    <section className="conversation-intro">
      <div>
        <p className="eyebrow">EVERYDAY CONVERSATION</p>
        <h3>Фразы, которыми реально держится разговор</h3>
        <p>Здесь не учебниковые диалоги, а готовые вопросы, ответы, реакции и фразы-спасатели. У каждой реплики есть естественные варианты, перевод и подсказка по тону.</p>
      </div>
      <button className="primary-action conversation-start" onClick={onStart}>Тренировать фразы →</button>
    </section>

    <div className="conversation-toolbar">
      <label className="conversation-search">
        <span>Поиск</span>
        <input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Например: как дела, work, coffee..."/>
      </label>
      <div className="conversation-count"><strong>{visible.length}</strong><span>реплик</span></div>
    </div>

    <div className="conversation-categories" role="tablist" aria-label="Темы разговорных фраз">
      <button className={categoryId==='all'?'active':''} onClick={()=>setCategoryId('all')}>Все</button>
      {conversationCategories.map(category=><button key={category.id} className={categoryId===category.id?'active':''} onClick={()=>setCategoryId(category.id)}>{category.icon} {category.title}</button>)}
    </div>

    <div className="conversation-list">
      {visible.map(({phrase,category})=><PhraseCard key={phrase.id} phrase={phrase} categoryTitle={category.title}/>)}
    </div>
  </>
}

function PhraseCard({phrase,categoryTitle}:{phrase:ConversationPhrase;categoryTitle:string}){
  return <article className="conversation-card">
    <header>
      <div className="conversation-tags">
        <span>{roleLabels[phrase.role]}</span>
        <span>{phrase.level}</span>
        <span>{registerLabel(phrase.register)}</span>
      </div>
      <button className="conversation-sound" onClick={()=>speak(phrase.english)} aria-label={"Прослушать: "+phrase.english}>◖))</button>
    </header>

    <p className="conversation-category-name">{categoryTitle}</p>
    <h3>{phrase.english}</h3>
    <p className="conversation-translation">{phrase.translation}</p>

    {phrase.variants.length>0&&<div className="conversation-section">
      <small>Ещё так говорят</small>
      <div className="conversation-variants">{phrase.variants.map(variant=><button key={variant} onClick={()=>speak(variant)}>{variant} <span>◖))</span></button>)}</div>
    </div>}

    {phrase.replies.length>0&&<div className="conversation-section">
      <small>Что можно ответить</small>
      <div className="conversation-replies">{phrase.replies.map(([reply,translation])=><button key={reply} onClick={()=>speak(reply)}><strong>{reply}</strong><span>{translation}</span></button>)}</div>
    </div>}

    <div className="conversation-note"><b>Почему это полезно:</b> {phrase.note}</div>
    <div className="conversation-example"><span>Пример</span><p>{phrase.example}</p><small>{phrase.exampleTranslation}</small></div>
  </article>
}

function registerLabel(value:ConversationPhrase['register']){
  if(value==='informal')return'разговорно'
  if(value==='polite')return'вежливо'
  return'нейтрально'
}

function speak(text:string){
  if(!('speechSynthesis'in window))return
  window.speechSynthesis.cancel()
  const utterance=new SpeechSynthesisUtterance(text)
  utterance.lang='en-US'
  utterance.rate=.9
  window.speechSynthesis.speak(utterance)
}
