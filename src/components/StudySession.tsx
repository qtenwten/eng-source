import { useState } from 'react'
import { formatNextReview } from '../lib/srs'
import type { LearningItem,MemoryState,ReviewRating } from '../types'

interface Props{items:LearningItem[];memory:Record<string,MemoryState>;onRate:(itemId:string,rating:ReviewRating)=>void;onClose:()=>void}
const labels:Record<ReviewRating,{title:string;hint:string}>={again:{title:'Ещё раз',hint:'Не вспомнил'},hard:{title:'Трудно',hint:'Еле вспомнил'},good:{title:'Хорошо',hint:'Вспомнил'},easy:{title:'Легко',hint:'Автоматически'}}

export function StudySession({items,memory,onRate,onClose}:Props){
  // Freeze the queue at session start. Parent memory updates must not reorder/remove items mid-session.
  const[queue]=useState(()=>items.slice())
  const[index,setIndex]=useState(0)
  const[revealed,setRevealed]=useState(false)
  const[finished,setFinished]=useState(false)

  if(!queue.length)return <div className="study-overlay" role="dialog" aria-modal="true"><div className="study-sheet finish-card"><div className="success-orbit">✓</div><p className="eyebrow">ALL CLEAR</p><h2>Сейчас ничего не назначено.</h2><p>Повторения появятся по расписанию. Можно выбрать отдельный модуль в разделе «Учить».</p><button className="primary-button" onClick={onClose}>Вернуться</button></div></div>
  if(finished)return <div className="study-overlay" role="dialog" aria-modal="true"><div className="study-sheet finish-card"><div className="success-orbit">✓</div><p className="eyebrow">SESSION COMPLETE</p><h2>Сессия завершена.</h2><p>Каждая оценка уже повлияла на будущий интервал FSRS. Даже «Ещё раз» — полезный сигнал памяти, а не неудача.</p><button className="primary-button" onClick={onClose}>Вернуться на главную</button></div></div>

  const item=queue[index]
  const currentMemory=memory[item.id]
  const rate=(rating:ReviewRating)=>{
    onRate(item.id,rating)
    if(index+1>=queue.length)setFinished(true)
    else{setIndex(value=>value+1);setRevealed(false)}
  }

  return <div className="study-overlay" role="dialog" aria-modal="true" aria-label="Учебная сессия">
    <div className="study-sheet">
      <header className="study-header"><button className="icon-button" onClick={onClose} aria-label="Закрыть">×</button><div className="session-progress"><span style={{width:`${((index+1)/queue.length)*100}%`}}/></div><span className="counter">{index+1}/{queue.length}</span></header>
      <div className="study-kind">{kindName(item)}</div>
      <div className="study-card">
        <p className="study-prompt-label">{promptLabel(item)}</p>
        <h1>{item.prompt}</h1>
        {!revealed?<button className="reveal-button" onClick={()=>setRevealed(true)}>Показать ответ</button>:<div className="answer-area">
          <div className="answer-main"><strong>{item.answer}</strong><span>{item.translation}</span></div>
          <button className="sound-button" onClick={()=>speak(item.answer)}>◖)) Слушать</button>
          <p className="example">“{item.example}”</p>
          {item.note&&<p className="note">⌁ {item.note}</p>}
          {currentMemory&&<p className="next-review">Было запланировано: {formatNextReview(currentMemory.dueAt)}</p>}
        </div>}
      </div>
      {revealed&&<div className="rating-grid">{(Object.keys(labels) as ReviewRating[]).map(rating=><button key={rating} className={`rating rating-${rating}`} onClick={()=>rate(rating)}><strong>{labels[rating].title}</strong><small>{labels[rating].hint}</small></button>)}</div>}
    </div>
  </div>
}

function kindName(item:LearningItem){if(item.kind==='irregular')return'НЕПРАВИЛЬНЫЙ ГЛАГОЛ';if(item.kind==='chunk')return'ЖИВОЕ ВЫРАЖЕНИЕ';return'АКТИВНЫЙ СЛОВАРЬ'}
function promptLabel(item:LearningItem){if(item.kind==='irregular')return'Вспомни обе формы';return'Скажи по-английски до открытия ответа'}
function speak(text:string){if(!('speechSynthesis' in window))return;window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-US';utterance.rate=.92;window.speechSynthesis.speak(utterance)}
