import { todayPlan } from '../data/seed'
import type { ItemKind,LearnerState,LearningStats } from '../types'

type Availability=Record<ItemKind,number>
interface Props{learner:LearnerState;stats:LearningStats;dueCount:number;newCount:number;availability:Availability;onStart:()=>void;onOpenModule:(module:string)=>void}

export function Today({learner,stats,dueCount,newCount,availability,onStart,onOpenModule}:Props){
  const weekday=new Intl.DateTimeFormat('ru-RU',{weekday:'long'}).format(new Date()).toUpperCase()
  const visibleNew=Math.min(newCount,5)
  const remaining=dueCount+visibleNew
  const denominator=Math.max(1,stats.reviewedToday+remaining)
  const progress=Math.min(100,Math.round(stats.reviewedToday/denominator*100))
  const queueEmpty=!dueCount&&!newCount
  const status=dueCount>0?`${dueCount} элементов готовы к повторению`:newCount>0?`Повторения закрыты · ${newCount} новых элементов ждут знакомства`:'Демо-набор пройден · следующие повторения появятся по FSRS'
  return <div className="page today-page">
    <section className="welcome-row"><div><p className="eyebrow">{weekday} · YOUR ENGLISH</p><h1>Привет, {learner.name}! <span className="sun">✦</span></h1><p className="muted">Сегодня достаточно одного хорошего занятия.</p></div><div className="streak-pill"><span>🔥</span><strong>{stats.streak}</strong><small>дней</small></div></section>
    <section className="hero-card"><div className="hero-copy"><span className="hero-kicker">ТВОЙ ПЛАН НА СЕГОДНЯ</span><h2>{dueCount?'Продолжить повторение':'Продолжить обучение'}</h2><p>{status}</p><div className="progress-track" aria-label={`Сегодня выполнено ${progress}%`}><span style={{width:`${progress}%`}} /></div><button className="primary-button" onClick={onStart} disabled={queueEmpty}>{queueEmpty?'На сегодня очередь пуста':'Начать сессию'} {!queueEmpty&&<span>→</span>}</button></div><div className="hero-visual" aria-hidden="true"><div className="landscape"><span className="moon"/><span className="mountain mountain-a"/><span className="mountain mountain-b"/><span className="path"/></div><blockquote>Small steps.<br/>Real fluency.</blockquote></div></section>
    <section className="section-block"><div className="section-heading"><div><p className="eyebrow">BALANCED PRACTICE</p><h2>Сегодняшний план</h2></div><button className="text-button" onClick={()=>onOpenModule('settings')}>Настроить</button></div><div className="plan-grid">{todayPlan.map(item=>{
      const available=isPlanAvailable(item.id,dueCount,newCount,availability)
      return <button key={item.id} className={`plan-card tone-${item.tone}`} disabled={!available} aria-disabled={!available} onClick={()=>available&&onOpenModule(item.id)}><span className="plan-icon">{item.icon}</span><strong>{item.title}</strong><small>{planSubtitle(item.id,item.subtitle,dueCount,newCount,availability)}</small></button>
    })}</div></section>
    <section className="section-block stats-block"><div className="section-heading"><div><p className="eyebrow">WHAT IS ACTUALLY STICKING</p><h2>Твой язык</h2></div><span className="level-chip">{learner.level}</span></div><div className="stats-grid"><Stat number={String(stats.studied)} label="Изучено элементов"/><Stat number={String(stats.strong)} label="Уверенно вспоминаются"/><Stat number={String(stats.irregularKnown)} label="Глаголы уверенно"/><Stat number={String(stats.expressions)} label="Выражения встречались"/></div></section>
  </div>
}

function isPlanAvailable(id:string,dueCount:number,newCount:number,availability:Availability){
  if(id==='review')return dueCount>0
  if(id==='new')return newCount>0
  if(id==='chunks')return availability.chunk>0
  if(id==='verbs')return availability.irregular>0
  return false
}
function planSubtitle(id:string,fallback:string,dueCount:number,newCount:number,availability:Availability){
  if(id==='review')return dueCount?`${dueCount} сейчас`:'нет назначенных'
  if(id==='new')return newCount?`${Math.min(newCount,5)} в ближайшей сессии`:'всё изучено'
  if(id==='chunks')return availability.chunk?`${availability.chunk} сейчас`:'нет назначенных'
  if(id==='verbs')return availability.irregular?`${availability.irregular} сейчас`:'нет назначенных'
  if(id==='listening'||id==='speaking')return'в разработке'
  return fallback
}
function Stat({number,label}:{number:string;label:string}){return <div className="stat-card"><strong>{number}</strong><span>{label}</span></div>}
