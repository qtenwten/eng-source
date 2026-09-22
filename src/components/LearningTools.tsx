import { useMemo,useState } from 'react'
import { listeningClips,productiveTasks } from '../data/productivity'
import { ClassicReading } from './ClassicReading'
import { countProductiveUses,masteryLabels,masteryStage } from '../lib/productivity'
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
  onRecordProduction:(taskId:string,mode:ProductiveMode,response:string,targets:string[],repeatAfterDays:number,durationMinutes?:number)=>{feedback:string[]}
}

export function LearningTools(props:Props){
  return <div className="tool-overlay" role="dialog" aria-modal="true"><section className="tool-sheet"><header className="tool-header"><button className="icon-button" onClick={props.onClose} aria-label="Закрыть">×</button><div><p className="eyebrow">sENG LEARNING LAB</p><h2>{toolTitle(props.tool)}</h2></div></header><div className="tool-body">{renderTool(props)}</div></section></div>
}

function renderTool(props:Props){
  switch(props.tool){
    case'inbox':return <Inbox learner={props.learner} onAdd={props.onAddInbox}/>
    case'reading':return <ClassicReading level={props.learner.level} allItems={props.allItems} onSave={props.onAddInbox} onActivity={props.onRecordActivity}/>
    case'listening':return <Listening onSave={props.onAddInbox} onActivity={props.onRecordActivity}/>
    case'errors':return <Errors learner={props.learner} onAdd={props.onAddError} onPractice={props.onPracticeError}/>
    case'production':return <Production learner={props.learner} allItems={props.allItems} onRecord={props.onRecordProduction}/>
    case'coach':return <Coach learner={props.learner} allItems={props.allItems} onRecord={props.onRecordProduction}/>
    case'active':return <ActiveVocabulary learner={props.learner} allItems={props.allItems}/>
  }
}
function toolTitle(tool:LearningTool){return{inbox:'Personal Inbox',reading:'Чтение',listening:'Аудирование',errors:'Мои ошибки',production:'Говорение и письмо',coach:'sENG Coach',active:'Активный словарь'}[tool]}

function Inbox({learner,onAdd}:{learner:LearnerState;onAdd:Props['onAddInbox']}){
  const[text,setText]=useState(''),[translation,setTranslation]=useState(''),[context,setContext]=useState('')
  const canSubmit=Boolean(text.trim()&&(translation.trim()||context.trim()))
  const submit=(event:React.FormEvent)=>{event.preventDefault();if(!canSubmit)return;onAdd(text,translation,context);setText('');setTranslation('');setContext('')}
  return <><p className="tool-lead">Сохраняй выражение вместе со смыслом или исходным контекстом. Без понятной подсказки активное вспоминание превращается в угадывание, поэтому одного слова без контекста недостаточно.</p><form className="tool-form" onSubmit={submit}><label>Английское слово или фраза<input value={text} onChange={e=>setText(e.target.value)} placeholder="get away with it"/></label><label>Перевод / смысл<input value={translation} onChange={e=>setTranslation(e.target.value)} placeholder="выйти сухим из воды"/></label><label>Где встретилось<textarea value={context} onChange={e=>setContext(e.target.value)} placeholder="He thought he could get away with it."/></label><button className="primary-action" disabled={!canSubmit}>Добавить в обучение</button></form><div className="saved-list">{learner.inbox.slice().reverse().map(item=><article className="saved-item" key={item.id}><strong>{item.text}</strong><span>{item.translation||'Подсказка берётся из контекста'}</span>{item.context&&<small>“{item.context}”</small>}</article>)}{!learner.inbox.length&&<Empty text="Пока пусто. Добавь первую фразу из своей реальной жизни."/>}</div></>
}

function Listening({onSave,onActivity}:{onSave:Props['onAddInbox'];onActivity:Props['onRecordActivity']}){
  const[index,setIndex]=useState(0),[revealed,setRevealed]=useState(false),[done,setDone]=useState(false),[playCount,setPlayCount]=useState(0),[audioAvailable,setAudioAvailable]=useState(true);const clip=listeningClips[index]
  const reset=(i:number)=>{setIndex(i);setRevealed(false);setDone(false);setPlayCount(0);setAudioAvailable(true)}
  const play=()=>{if(speak(clip.text)){setPlayCount(value=>value+1);setAudioAvailable(true)}else setAudioAvailable(false)}
  const finish=()=>{if(playCount>0&&!done){onActivity('listening',2);setDone(true)}}
  return <><div className="tool-switch">{listeningClips.map((item,i)=><button key={item.id} className={i===index?'active':''} onClick={()=>reset(i)}>{i+1}</button>)}</div><article className="listening-card"><p className="eyebrow">AUDIO FIRST · {clip.cefr}</p><h2>Сначала только услышать</h2><p className="tool-lead">Прослушай хотя бы один раз без текста. Расшифровка — поддержка после собственной попытки понять смысл, а не замена аудированию.</p><button className="listen-big" onClick={play}>▶ Прослушать {playCount?`· ${playCount}`:''}</button>{!audioAvailable&&<p className="provider-note">На этом устройстве браузерная озвучка недоступна. Эта попытка не будет записана как аудирование.</p>}{!revealed?<button className="secondary-action" disabled={!playCount} onClick={()=>setRevealed(true)}>{playCount?'Показать расшифровку':'Сначала прослушай'}</button>:<div className="transcript"><strong>{clip.text}</strong><span>{clip.translation}</span>{clip.targets.map(target=><button key={target[0]} onClick={()=>onSave(target[0],target[1],clip.text)}>＋ Сохранить: {target[0]} — {target[1]}</button>)}</div>}<button className="primary-action" onClick={finish} disabled={!playCount||done}>{done?'Аудирование записано ✓':'Закончить аудирование'}</button></article></>
}

function Errors({learner,onAdd,onPractice}:{learner:LearnerState;onAdd:Props['onAddError'];onPractice:Props['onPracticeError']}){
  const[wrong,setWrong]=useState(''),[right,setRight]=useState(''),[why,setWhy]=useState(''),[revealed,setRevealed]=useState<Record<string,boolean>>({})
  const submit=(e:React.FormEvent)=>{e.preventDefault();if(!wrong.trim()||!right.trim())return;onAdd(wrong,right,why);setWrong('');setRight('');setWhy('')}
  const now=Date.now(),sorted=[...learner.errors].sort((a,b)=>a.nextPracticeAt-b.nextPracticeAt)
  const rate=(id:string,success:boolean)=>{onPractice(id,success);setRevealed(current=>({...current,[id]:false}))}
  return <><p className="tool-lead">Ошибка становится отдельным учебным объектом. Правильная форма скрыта до попытки вспомнить; ещё не назначенные ошибки не пересчитывают расписание раньше срока.</p><form className="error-form" onSubmit={submit}><input value={wrong} onChange={e=>setWrong(e.target.value)} placeholder="I am agree"/><span>→</span><input value={right} onChange={e=>setRight(e.target.value)} placeholder="I agree"/><input className="wide" value={why} onChange={e=>setWhy(e.target.value)} placeholder="Почему? (необязательно)"/><button className="primary-action wide">Добавить ошибку</button></form><div className="error-list">{sorted.map(error=>{
    const due=error.nextPracticeAt<=now,show=Boolean(revealed[error.id])
    return <article key={error.id} className="error-card"><div><del>{error.incorrect}</del>{show&&<><strong>{error.correct}</strong><p>{error.explanation}</p></>}<small>Встречалась: {error.count} · успешных исправлений: {error.resolvedCount}</small>{!due&&<small>Следующее повторение: {formatDue(error.nextPracticeAt)}</small>}</div><div className="error-actions">{due&&!show&&<button className="success" onClick={()=>setRevealed(current=>({...current,[error.id]:true}))}>Вспомнить исправление</button>}{due&&show&&<><button onClick={()=>rate(error.id,false)}>Не вспомнил</button><button className="success" onClick={()=>rate(error.id,true)}>Вспомнил ✓</button></>}</div></article>
  })}{!sorted.length&&<Empty text="Ошибок пока нет. Они будут появляться из письменных задач или их можно добавить вручную."/>}</div></>
}

function Production({learner,allItems,onRecord}:{learner:LearnerState;allItems:LearningItem[];onRecord:Props['onRecordProduction']}){
  const[mode,setMode]=useState<ProductiveMode>('speaking'),[taskIndex,setTaskIndex]=useState(0),[response,setResponse]=useState(''),[feedback,setFeedback]=useState<string[]>([]),[startedAt,setStartedAt]=useState(()=>Date.now())
  const tasks=productiveTasks.filter(item=>item.mode===mode),task=tasks[Math.min(taskIndex,tasks.length-1)]
  const last=learner.productiveAttempts.filter(item=>item.taskId===task.id).at(-1),early=Boolean(last&&last.nextDueAt>Date.now()),submitted=feedback.length>0
  const resetTask=(nextMode:ProductiveMode,index=0)=>{setMode(nextMode);setTaskIndex(index);setResponse('');setFeedback([]);setStartedAt(Date.now())}
  const move=(delta:number)=>{const next=(taskIndex+delta+tasks.length)%tasks.length;setTaskIndex(next);setResponse('');setFeedback([]);setStartedAt(Date.now())}
  const submit=()=>{if(!response.trim()||submitted)return;const minutes=Math.max(1,Math.round((Date.now()-startedAt)/60000));const result=onRecord(task.id,mode,response,task.targets,task.repeatAfterDays,minutes);setFeedback(result.feedback)}
  return <><div className="tool-switch"><button className={mode==='speaking'?'active':''} onClick={()=>resetTask('speaking')}>Говорение</button><button className={mode==='writing'?'active':''} onClick={()=>resetTask('writing')}>Письмо</button></div><article className="production-card"><p className="eyebrow">SPACED TASK REPETITION</p><h2>{task.title}</h2><p>{task.prompt}</p><div className="targets"><span>Постарайся использовать:</span>{task.targets.map(target=><b key={target}>{target}{targetGloss(target,allItems)?` · ${targetGloss(target,allItems)}`:''}</b>)}</div>{last&&<p className="repeat-note">Плановое возвращение: {formatDue(last.nextDueAt)}.{early?' Можно потренироваться раньше — ранняя попытка не сдвинет это расписание.':' Задача снова due.'}</p>}{mode==='speaking'&&<p className="provider-note">Это устная production-практика через диктовку/текстовый след. sENG пока не измеряет произношение, интонацию или качество распознавания речи.</p>}<textarea disabled={submitted} value={response} onChange={e=>setResponse(e.target.value)} placeholder={mode==='speaking'?'Скажи ответ вслух и используй диктовку клавиатуры для текстового следа…':'Напиши ответ здесь…'}/><button className="primary-action" disabled={!response.trim()||submitted} onClick={submit}>{submitted?'Попытка сохранена ✓':'Проверить и сохранить попытку'}</button>{feedback.length>0&&<div className="feedback-box">{feedback.map(item=><p key={item}>• {item}</p>)}</div>}<div className="task-pager"><button onClick={()=>move(-1)}>←</button><span>{taskIndex+1}/{tasks.length}</span><button onClick={()=>move(1)}>→</button></div></article></>
}

function Coach({learner,allItems,onRecord}:{learner:LearnerState;allItems:LearningItem[];onRecord:Props['onRecordProduction']}){
  const targets=useMemo(()=>{
    const fromErrors=learner.errors.slice().sort((a,b)=>b.lastSeenAt-a.lastSeenAt).slice(0,2).map(item=>item.correct)
    const fromInbox=learner.inbox.slice(-3).map(item=>item.text)
    const defaults=learner.level.startsWith('A1')?['go']:learner.level.startsWith('A2')?['make a decision','probably']:['figure out','eventually']
    return [...new Set([...fromErrors,...fromInbox,...defaults])].slice(0,4)
  },[learner.errors,learner.inbox,learner.level])
  const[response,setResponse]=useState(''),[feedback,setFeedback]=useState<string[]>([]),[startedAt]=useState(()=>Date.now()),submitted=feedback.length>0
  const prompt=learner.goal==='work'?'Расскажи о рабочей задаче, которая сначала пошла не по плану, но в итоге была решена.':learner.goal==='media'?'Перескажи короткую сцену или сюжет, который недавно запомнился.':'Расскажи о недавней ситуации, где пришлось что-то понять, изменить план или принять решение.'
  const submit=()=>{if(!response.trim()||submitted)return;const minutes=Math.max(1,Math.round((Date.now()-startedAt)/60000));setFeedback(onRecord('coach-daily','speaking',response,targets,3,minutes).feedback)}
  return <article className="coach-card"><p className="eyebrow">STRUCTURED TUTOR · LOCAL MODE</p><h2>Персональная миссия</h2><p>{prompt}</p><div className="targets">{targets.map(target=><b key={target}>{target}{targetGloss(target,allItems)?` · ${targetGloss(target,allItems)}`:''}</b>)}</div><p className="provider-note">Ответ произнеси вслух, а для фиксации используй диктовку или набери текст. Произношение сейчас не оценивается.</p><textarea disabled={submitted} value={response} onChange={e=>setResponse(e.target.value)} placeholder="Ответь своими словами…"/><button className="primary-action" disabled={!response.trim()||submitted} onClick={submit}>{submitted?'Миссия сохранена ✓':'Завершить миссию'}</button>{feedback.length>0&&<div className="feedback-box">{feedback.map(item=><p key={item}>• {item}</p>)}</div>}<p className="provider-note">Coach использует прозрачные локальные правила. Он не оценивает «естественность» как факт: полноценный AI-provider позже должен быть отдельным серверным слоем и давать объяснимую обратную связь.</p></article>
}

function ActiveVocabulary({learner,allItems}:{learner:LearnerState;allItems:LearningItem[]}){
  const rows=allItems.map(item=>{const uses=countProductiveUses(item.answer,learner.productiveAttempts);return{item,uses,stage:masteryStage(learner.memory[item.id],uses)}})
  const order=['active','context','recall','recognition','unseen']
  rows.sort((a,b)=>order.indexOf(a.stage)-order.indexOf(b.stage))
  return <><p className="tool-lead">«Active» требует реального output в разные дни: карточная память может довести элемент до recall, один день с употреблением — до contextual use, использование минимум в два дня — до active.</p><div className="mastery-legend">{order.map(stage=><span key={stage}>{masteryLabels[stage as keyof typeof masteryLabels]}</span>)}</div><div className="mastery-list">{rows.slice(0,60).map(({item,stage,uses})=><article key={item.id}><div><strong>{item.answer}</strong><small>{item.translation}{uses?` · дней с output: ${uses}`:''}</small></div><span className={`stage stage-${stage}`}>{masteryLabels[stage]}</span></article>)}</div></>
}

function targetGloss(target:string,items:LearningItem[]){const needle=target.toLowerCase().trim();return items.find(item=>item.answer.toLowerCase().trim()===needle)?.translation??''}
function formatDue(timestamp:number){return new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(timestamp))}
function Empty({text}:{text:string}){return <div className="empty-tool"><span>◎</span><p>{text}</p></div>}
function speak(text:string){if(!('speechSynthesis'in window))return false;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.88;window.speechSynthesis.speak(u);return true}
