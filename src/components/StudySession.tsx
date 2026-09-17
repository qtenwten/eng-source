import { useState,type FormEvent } from 'react'
import { glossForToken } from '../data/glossary'
import { formatNextReview } from '../lib/srs'
import type { LearningItem,MemoryState,ReviewRating } from '../types'

interface Props{items:LearningItem[];memory:Record<string,MemoryState>;onRate:(itemId:string,rating:ReviewRating)=>void;onClose:()=>void}
const labels:Record<ReviewRating,{title:string;hint:string}>={
  again:{title:'Не вспомнил',hint:'повторить скорее'},
  hard:{title:'С трудом',hint:'интервал короче'},
  good:{title:'Уверенно',hint:'обычный интервал'},
  easy:{title:'Знал сразу',hint:'интервал длиннее'},
}

type WritingFeedback={correct:boolean;message:string}
type SelectedGloss={token:string;translation:string}

export function StudySession({items,memory,onRate,onClose}:Props){
  // Freeze the queue at session start. Parent memory updates must not reorder/remove items mid-session.
  const[queue]=useState(()=>items.slice())
  const[index,setIndex]=useState(0)
  const[revealed,setRevealed]=useState(false)
  const[finished,setFinished]=useState(false)
  const[typedAnswer,setTypedAnswer]=useState('')
  const[typedPast,setTypedPast]=useState('')
  const[typedParticiple,setTypedParticiple]=useState('')
  const[writingFeedback,setWritingFeedback]=useState<WritingFeedback|null>(null)
  const[selectedGloss,setSelectedGloss]=useState<SelectedGloss|null>(null)

  if(!queue.length)return <div className="study-overlay" role="dialog" aria-modal="true"><div className="study-sheet finish-card"><div className="success-orbit">✓</div><p className="eyebrow">ВСЁ ГОТОВО</p><h2>Сейчас ничего не назначено.</h2><p>Повторения появятся по расписанию. Можно выбрать отдельный модуль в разделе «Учить».</p><button className="primary-button" onClick={onClose}>Вернуться</button></div></div>
  if(finished)return <div className="study-overlay" role="dialog" aria-modal="true"><div className="study-sheet finish-card"><div className="success-orbit">✓</div><p className="eyebrow">СЕССИЯ ЗАВЕРШЕНА</p><h2>Готово.</h2><p>Твои оценки уже повлияли на будущие интервалы FSRS. «Не вспомнил» — тоже полезный сигнал: он помогает системе назначить повтор раньше.</p><button className="primary-button" onClick={onClose}>Вернуться на главную</button></div></div>

  const item=queue[index]
  const currentMemory=memory[item.id]
  const resetCardState=()=>{setRevealed(false);setTypedAnswer('');setTypedPast('');setTypedParticiple('');setWritingFeedback(null);setSelectedGloss(null)}
  const rate=(rating:ReviewRating)=>{
    onRate(item.id,rating)
    if(index+1>=queue.length)setFinished(true)
    else{setIndex(value=>value+1);resetCardState()}
  }
  const reveal=()=>{setRevealed(true);setWritingFeedback(null)}
  const checkWritten=(event:FormEvent)=>{
    event.preventDefault()
    if(item.kind==='irregular'&&item.irregularForms){
      const pastCorrect=normalize(typedPast)===normalize(item.irregularForms.past)
      const participleCorrect=normalize(typedParticiple)===normalize(item.irregularForms.participle)
      if(pastCorrect&&participleCorrect){setWritingFeedback({correct:true,message:'Обе формы верны. Отлично.'});setRevealed(true);return}
      const parts=[pastCorrect?'V2 верно':'V2 проверь',participleCorrect?'V3 верно':'V3 проверь']
      setWritingFeedback({correct:false,message:`${parts.join(' · ')}. Попробуй ещё раз или открой ответ.`});return
    }
    if(!typedAnswer.trim()){setWritingFeedback({correct:false,message:'Сначала введи английский ответ.'});return}
    if(normalize(typedAnswer)===normalize(item.answer)){setWritingFeedback({correct:true,message:'Верно. Теперь проверь контекст и оцени, насколько легко вспомнил.'});setRevealed(true)}
    else setWritingFeedback({correct:false,message:'Пока не совпало. Проверь написание и попробуй ещё раз — правильный ответ пока скрыт.'})
  }

  return <div className="study-overlay" role="dialog" aria-modal="true" aria-label="Учебная сессия">
    <div className="study-sheet">
      <header className="study-header"><button className="icon-button" onClick={onClose} aria-label="Закрыть">×</button><div className="session-progress"><span style={{width:`${((index+1)/queue.length)*100}%`}}/></div><span className="counter">{index+1}/{queue.length}</span></header>
      <div className="study-kind">{kindName(item)}</div>
      <div className="study-card">
        <p className="study-prompt-label">{promptLabel(item)}</p>
        {item.kind==='irregular'&&item.irregularForms?<IrregularPrompt item={item}/>:<h1>{item.prompt}</h1>}
        {!revealed?<div className="recall-area">
          <WrittenRecall item={item} typedAnswer={typedAnswer} typedPast={typedPast} typedParticiple={typedParticiple} feedback={writingFeedback} onAnswer={setTypedAnswer} onPast={setTypedPast} onParticiple={setTypedParticiple} onSubmit={checkWritten}/>
          <div className="recall-divider"><span>или</span></div>
          <button className="reveal-button" onClick={reveal}>Ответил устно — показать ответ</button>
        </div>:<div className="answer-area">
          {item.kind==='irregular'&&item.irregularForms?<IrregularAnswer item={item}/>:<div className="answer-main"><strong>{item.answer}</strong><span>{item.translation}</span></div>}
          <button className="sound-button" onClick={()=>speak(item.irregularForms?[item.irregularForms.base,item.irregularForms.past,item.irregularForms.participle].join(', '):item.answer)}>◖)) Слушать</button>
          <InteractiveExample item={item} selected={selectedGloss} onSelect={setSelectedGloss}/>
          {item.note&&<p className="note">⌁ {item.note}</p>}
          {writingFeedback?.correct&&<p className="writing-feedback correct">✓ {writingFeedback.message}</p>}
          {currentMemory&&<p className="next-review">Было запланировано: {formatNextReview(currentMemory.dueAt)}</p>}
        </div>}
      </div>
      {revealed&&<><p className="rating-explainer">Как ты вспомнил ответ? Выбор изменит срок следующего повтора.</p><div className="rating-grid">{(Object.keys(labels) as ReviewRating[]).map(rating=><button key={rating} className={`rating rating-${rating}`} onClick={()=>rate(rating)}><strong>{labels[rating].title}</strong><small>{labels[rating].hint}</small></button>)}</div></>}
    </div>
  </div>
}

function WrittenRecall({item,typedAnswer,typedPast,typedParticiple,feedback,onAnswer,onPast,onParticiple,onSubmit}:{item:LearningItem;typedAnswer:string;typedPast:string;typedParticiple:string;feedback:WritingFeedback|null;onAnswer:(value:string)=>void;onPast:(value:string)=>void;onParticiple:(value:string)=>void;onSubmit:(event:FormEvent)=>void}){
  if(item.kind==='irregular'&&item.irregularForms)return <form className="written-recall irregular-recall" onSubmit={onSubmit}>
    <p className="written-title">Напиши формы сам</p>
    <div className="verb-input-grid">
      <label><span>V2 · Past Simple</span><input value={typedPast} onChange={event=>onPast(event.target.value)} autoCapitalize="none" autoComplete="off" spellCheck={false} placeholder="например: went"/></label>
      <label><span>V3 · Past Participle</span><input value={typedParticiple} onChange={event=>onParticiple(event.target.value)} autoCapitalize="none" autoComplete="off" spellCheck={false} placeholder="например: gone"/></label>
    </div>
    <button className="check-answer-button" type="submit">Проверить написание</button>
    {feedback&&<p className={`writing-feedback ${feedback.correct?'correct':'incorrect'}`}>{feedback.message}</p>}
  </form>
  return <form className="written-recall" onSubmit={onSubmit}>
    <label><span className="written-title">Напиши английский вариант</span><input value={typedAnswer} onChange={event=>onAnswer(event.target.value)} autoCapitalize="none" autoComplete="off" spellCheck={false} placeholder="Введи ответ…"/></label>
    <button className="check-answer-button" type="submit">Проверить написание</button>
    {feedback&&<p className={`writing-feedback ${feedback.correct?'correct':'incorrect'}`}>{feedback.message}</p>}
  </form>
}

function IrregularPrompt({item}:{item:LearningItem}){
  const forms=item.irregularForms!
  return <div className="verb-forms prompt-forms">
    <div><small>V1 · начальная форма</small><strong>{forms.base}</strong></div>
    <span>→</span>
    <div><small>V2 · Past Simple</small><strong>?</strong></div>
    <span>→</span>
    <div><small>V3 · Past Participle</small><strong>?</strong></div>
  </div>
}

function IrregularAnswer({item}:{item:LearningItem}){
  const forms=item.irregularForms!
  return <div className="verb-forms answer-forms">
    <div><small>V1 · начальная форма</small><strong>{forms.base}</strong></div>
    <span>→</span>
    <div><small>V2 · Past Simple</small><strong>{forms.past}</strong></div>
    <span>→</span>
    <div><small>V3 · Past Participle</small><strong>{forms.participle}</strong></div>
    <p>{item.translation}</p>
  </div>
}

function InteractiveExample({item,selected,onSelect}:{item:LearningItem;selected:SelectedGloss|null;onSelect:(value:SelectedGloss)=>void}){
  const parts=item.example.match(/[\p{L}]+(?:['’][\p{L}]+)?|[^\p{L}]+/gu)??[item.example]
  return <div className="example-block">
    <p className="example interactive-example">“{parts.map((part,index)=>/^[\p{L}]/u.test(part)?<button type="button" key={`${part}-${index}`} onClick={()=>onSelect({token:part,translation:glossForToken(part)})}>{part}</button>:<span key={`${part}-${index}`}>{part}</span>)}”</p>
    {item.exampleTranslation&&<p className="example-translation"><span>Перевод:</span> {item.exampleTranslation}</p>}
    <p className="word-tap-hint">Нажми на любое английское слово, чтобы увидеть его перевод.</p>
    {selected&&<div className="word-gloss" role="status"><strong>{selected.token}</strong><span>{selected.translation}</span></div>}
  </div>
}

function kindName(item:LearningItem){if(item.kind==='irregular')return'НЕПРАВИЛЬНЫЙ ГЛАГОЛ';if(item.kind==='chunk')return'ЖИВОЕ ВЫРАЖЕНИЕ';return'АКТИВНЫЙ СЛОВАРЬ'}
function promptLabel(item:LearningItem){if(item.kind==='irregular')return'Вспомни и назови V2 и V3';return'Скажи или напиши по-английски до открытия ответа'}
function normalize(value:string){return value.toLocaleLowerCase('en-US').replace(/[’‘]/g,"'").replace(/[^\p{L}\p{N}']+/gu,' ').trim().replace(/\s+/g,' ')}
function speak(text:string){if(!('speechSynthesis' in window))return;window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-US';utterance.rate=.92;window.speechSynthesis.speak(utterance)}
