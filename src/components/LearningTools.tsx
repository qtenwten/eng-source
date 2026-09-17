import { useMemo,useState } from 'react'
import { listeningClips,productiveTasks,readingTexts } from '../data/productivity'
import { masteryLabels,masteryStage } from '../lib/productivity'
import type { ActivityKind,LearnerState,LearningItem,LearningTool,ProductiveMode } from '../types'

interface Props{
  tool:LearningTool
  learner:LearnerState
  allItems:LearningItem[]
  onClose:()=>void
  onAddInbox:(text:string,translation:string,context:string)=>void
  onAddError:(incorrect:string,correct:string,explanation:string)=>void
  onPracticeError:(id:string,success:boolean)=>void
  onRecordActivity:(kind:ActivityKind,durationMinutes:number)=>void
  onRecordProduction:(taskId:string,mode:ProductiveMode,response:string,targets:string[],repeatAfterDays:number)=>{feedback:string[]}
}

export function LearningTools(props:Props){
  return <div className="tool-overlay" role="dialog" aria-modal="true"><section className="tool-sheet"><header className="tool-header"><button className="icon-button" onClick={props.onClose} aria-label="Закрыть">×</button><div><p className="eyebrow">sENG LEARNING LAB</p><h2>{toolTitle(props.tool)}</h2></div></header><div className="tool-body">{renderTool(props)}</div></section></div>
}

function renderTool(props:Props){
  switch(props.tool){
    case'inbox':return <Inbox learner={props.learner} onAdd={props.onAddInbox}/>
    case'reading':return <Reading onSave={props.onAddInbox} onActivity={props.onRecordActivity}/>
    case'listening':return <Listening onSave={props.onAddInbox} onActivity={props.onRecordActivity}/>
    case'errors':return <Errors learner={props.learner} onAdd={props.onAddError} onPractice={props.onPracticeError}/>
    case'production':return <Production learner={props.learner} onRecord={props.onRecordProduction}/>
    case'coach':return <Coach learner={props.learner} onRecord={props.onRecordProduction}/>
    case'active':return <ActiveVocabulary learner={props.learner} allItems={props.allItems}/>
  }
}
function toolTitle(tool:LearningTool){return{inbox:'Personal Inbox',reading:'Чтение',listening:'Аудирование',errors:'Мои ошибки',production:'Говорение и письмо',coach:'sENG Coach',active:'Активный словарь'}[tool]}

function Inbox({learner,onAdd}:{learner:LearnerState;onAdd:Props['onAddInbox']}){
  const[text,setText]=useState(''),[translation,setTranslation]=useState(''),[context,setContext]=useState('')
  const submit=(event:React.FormEvent)=>{event.preventDefault();if(!text.trim())return;onAdd(text,translation,context);setText('');setTranslation('');setContext('')}
  return <><p className="tool-lead">Сохраняй выражение вместе со смыслом и исходным контекстом. Оно автоматически попадёт в очередь новых элементов FSRS.</p><form className="tool-form" onSubmit={submit}><label>Английское слово или фраза<input value={text} onChange={e=>setText(e.target.value)} placeholder="get away with it"/></label><label>Перевод / смысл<input value={translation} onChange={e=>setTranslation(e.target.value)} placeholder="выйти сухим из воды"/></label><label>Где встретилось<textarea value={context} onChange={e=>setContext(e.target.value)} placeholder="He thought he could get away with it."/></label><button className="primary-action" disabled={!text.trim()}>Добавить в обучение</button></form><div className="saved-list">{learner.inbox.slice().reverse().map(item=><article className="saved-item" key={item.id}><strong>{item.text}</strong><span>{item.translation||'Без перевода'}</span>{item.context&&<small>“{item.context}”</small>}</article>)}{!learner.inbox.length&&<Empty text="Пока пусто. Добавь первую фразу из своей реальной жизни."/>}</div></>
}

function Reading({onSave,onActivity}:{onSave:Props['onAddInbox'];onActivity:Props['onRecordActivity']}){
  const[index,setIndex]=useState(0),[done,setDone]=useState(false);const text=readingTexts[index]
  const finish=()=>{if(!done){onActivity('reading',text.minutes);setDone(true)}}
  return <><div className="tool-switch">{readingTexts.map((item,i)=><button key={item.id} className={i===index?'active':''} onClick={()=>{setIndex(i);setDone(false)}}>{item.cefr} · {item.minutes} мин</button>)}</div><article className="reading-card"><p className="eyebrow">EXTENSIVE READING · {text.cefr}</p><h2>{text.title}</h2><p className="reading-text">{text.text}</p><div className="target-list">{text.targets.map(target=><button key={target[0]} onClick={()=>onSave(target[0],target[1],text.text)}><strong>{target[0]}</strong><span>{target[1]}</span><small>＋ в Inbox</small></button>)}</div><button className="primary-action" onClick={finish}>{done?'Зачтено ✓':'Прочитал без постоянного перевода'}</button></article></>
}

function Listening({onSave,onActivity}:{onSave:Props['onAddInbox'];onActivity:Props['onRecordActivity']}){
  const[index,setIndex]=useState(0),[revealed,setRevealed]=useState(false),[done,setDone]=useState(false);const clip=listeningClips[index]
  const play=()=>speak(clip.text)
  const finish=()=>{if(!done){onActivity('listening',2);setDone(true)}}
  return <><div className="tool-switch">{listeningClips.map((item,i)=><button key={item.id} className={i===index?'active':''} onClick={()=>{setIndex(i);setRevealed(false);setDone(false)}}>{i+1}</button>)}</div><article className="listening-card"><p className="eyebrow">AUDIO FIRST · {clip.cefr}</p><h2>Сначала только услышать</h2><p className="tool-lead">Прослушай несколько раз. Transcript открывай только после попытки понять смысл.</p><button className="listen-big" onClick={play}>▶ Прослушать</button>{!revealed?<button className="secondary-action" onClick={()=>setRevealed(true)}>Показать transcript</button>:<div className="transcript"><strong>{clip.text}</strong><span>{clip.translation}</span><button onClick={()=>onSave(clip.target,clip.translation,clip.text)}>＋ Сохранить цель: {clip.target}</button></div>}<button className="primary-action" onClick={finish}>{done?'Listening записан ✓':'Закончить listening'}</button></article></>
}

function Errors({learner,onAdd,onPractice}:{learner:LearnerState;onAdd:Props['onAddError'];onPractice:Props['onPracticeError']}){
  const[wrong,setWrong]=useState(''),[right,setRight]=useState(''),[why,setWhy]=useState('')
  const submit=(e:React.FormEvent)=>{e.preventDefault();if(!wrong.trim()||!right.trim())return;onAdd(wrong,right,why);setWrong('');setRight('');setWhy('')}
  const sorted=[...learner.errors].sort((a,b)=>a.nextPracticeAt-b.nextPracticeAt)
  return <><p className="tool-lead">Ошибка становится отдельным учебным объектом: исправление → повтор позже → новый контекст.</p><form className="error-form" onSubmit={submit}><input value={wrong} onChange={e=>setWrong(e.target.value)} placeholder="I am agree"/><span>→</span><input value={right} onChange={e=>setRight(e.target.value)} placeholder="I agree"/><input className="wide" value={why} onChange={e=>setWhy(e.target.value)} placeholder="Почему? (необязательно)"/><button className="primary-action wide">Добавить ошибку</button></form><div className="error-list">{sorted.map(error=><article key={error.id} className="error-card"><div><del>{error.incorrect}</del><strong>{error.correct}</strong><p>{error.explanation}</p><small>Встречалась: {error.count} · успешных исправлений: {error.resolvedCount}</small></div><div className="error-actions"><button onClick={()=>onPractice(error.id,false)}>Снова ошибся</button><button className="success" onClick={()=>onPractice(error.id,true)}>Вспомнил ✓</button></div></article>)}{!sorted.length&&<Empty text="Ошибок пока нет. Они будут появляться из writing-задач или их можно добавить вручную."/>}</div></>
}

function Production({learner,onRecord}:{learner:LearnerState;onRecord:Props['onRecordProduction']}){
  const[mode,setMode]=useState<ProductiveMode>('speaking'),[taskIndex,setTaskIndex]=useState(0),[response,setResponse]=useState(''),[feedback,setFeedback]=useState<string[]>([])
  const tasks=productiveTasks.filter(item=>item.mode===mode),task=tasks[Math.min(taskIndex,tasks.length-1)]
  const last=learner.productiveAttempts.filter(item=>item.taskId===task.id).at(-1)
  const submit=()=>{if(!response.trim())return;const result=onRecord(task.id,mode,response,task.targets,task.repeatAfterDays);setFeedback(result.feedback)}
  return <><div className="tool-switch"><button className={mode==='speaking'?'active':''} onClick={()=>{setMode('speaking');setTaskIndex(0);setFeedback([])}}>Говорение</button><button className={mode==='writing'?'active':''} onClick={()=>{setMode('writing');setTaskIndex(0);setFeedback([])}}>Письмо</button></div><article className="production-card"><p className="eyebrow">SPACED TASK REPETITION</p><h2>{task.title}</h2><p>{task.prompt}</p><div className="targets"><span>Постарайся использовать:</span>{task.targets.map(target=><b key={target}>{target}</b>)}</div>{last&&<p className="repeat-note">Последняя попытка сохранена. Следующее возвращение: {new Date(last.nextDueAt).toLocaleDateString('ru-RU')}.</p>}<textarea value={response} onChange={e=>setResponse(e.target.value)} placeholder={mode==='speaking'?'Скажи ответ вслух и используй диктовку клавиатуры для текста…':'Напиши ответ здесь…'}/><button className="primary-action" onClick={submit}>Проверить и сохранить попытку</button>{feedback.length>0&&<div className="feedback-box">{feedback.map(item=><p key={item}>• {item}</p>)}</div>}<div className="task-pager"><button onClick={()=>setTaskIndex(value=>(value+tasks.length-1)%tasks.length)}>←</button><span>{taskIndex+1}/{tasks.length}</span><button onClick={()=>setTaskIndex(value=>(value+1)%tasks.length)}>→</button></div></article></>
}

function Coach({learner,onRecord}:{learner:LearnerState;onRecord:Props['onRecordProduction']}){
  const targets=useMemo(()=>{
    const fromErrors=learner.errors.slice().sort((a,b)=>b.lastSeenAt-a.lastSeenAt).slice(0,2).map(item=>item.correct)
    const fromInbox=learner.inbox.slice(-3).map(item=>item.text)
    return [...new Set([...fromErrors,...fromInbox,'figure out','eventually'])].slice(0,4)
  },[learner.errors,learner.inbox])
  const[response,setResponse]=useState(''),[feedback,setFeedback]=useState<string[]>([])
  const prompt=learner.goal==='work'?'Расскажи о рабочей задаче, которая сначала пошла не по плану, но в итоге была решена.':learner.goal==='media'?'Перескажи короткую сцену или сюжет, который недавно запомнился.':'Расскажи о недавней ситуации, где пришлось что-то понять, изменить план или принять решение.'
  const submit=()=>{if(!response.trim())return;setFeedback(onRecord('coach-daily','speaking',response,targets,3).feedback)}
  return <article className="coach-card"><p className="eyebrow">STRUCTURED TUTOR · LOCAL MODE</p><h2>Персональная миссия</h2><p>{prompt}</p><div className="targets">{targets.map(target=><b key={target}>{target}</b>)}</div><textarea value={response} onChange={e=>setResponse(e.target.value)} placeholder="Ответь своими словами…"/><button className="primary-action" onClick={submit}>Завершить миссию</button>{feedback.length>0&&<div className="feedback-box">{feedback.map(item=><p key={item}>• {item}</p>)}</div>}<p className="provider-note">Сейчас Coach работает детерминированно и безопасно в браузере. Серверный AI-provider позже сможет оценивать естественность и смысл, не раскрывая API-ключ клиенту.</p></article>
}

function ActiveVocabulary({learner,allItems}:{learner:LearnerState;allItems:LearningItem[]}){
  const rows=allItems.map(item=>({item,stage:masteryStage(learner.memory[item.id])}))
  const order=['active','context','recall','recognition','unseen']
  rows.sort((a,b)=>order.indexOf(a.stage)-order.indexOf(b.stage))
  return <><p className="tool-lead">«Выучено» — не один флажок. sENG различает узнавание, вспоминание и способность использовать язык.</p><div className="mastery-legend">{order.map(stage=><span key={stage}>{masteryLabels[stage as keyof typeof masteryLabels]}</span>)}</div><div className="mastery-list">{rows.slice(0,60).map(({item,stage})=><article key={item.id}><div><strong>{item.answer}</strong><small>{item.translation}</small></div><span className={`stage stage-${stage}`}>{masteryLabels[stage]}</span></article>)}</div></>
}

function Empty({text}:{text:string}){return <div className="empty-tool"><span>◎</span><p>{text}</p></div>}
function speak(text:string){if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.88;window.speechSynthesis.speak(u)}
