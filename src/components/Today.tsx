import { todayPlan } from '../data/seed'
import type { LearnerState,LearningStats } from '../types'

interface Props{learner:LearnerState;stats:LearningStats;dueCount:number;newCount:number;onStart:()=>void;onOpenModule:(module:string)=>void}

export function Today({learner,stats,dueCount,newCount,onStart,onOpenModule}:Props){
  const weekday=new Intl.DateTimeFormat('ru-RU',{weekday:'long'}).format(new Date()).toUpperCase()
  const target=Math.max(1,Math.min(7,dueCount+newCount||7))
  const progress=Math.min(100,Math.round(stats.reviewedToday/target*100))
  const status=dueCount>0?`${dueCount} элементов готовы к повторению`:newCount>0?`Повторения закрыты · ${newCount} новых элементов ждут знакомства`:'Демо-набор пройден · следующие повторения появятся по FSRS'
  return <div className="page today-page">
    <section className="welcome-row"><div><p className="eyebrow">{weekday} · YOUR ENGLISH</p><h1>Привет, {learner.name}! <span className="sun">✦</span></h1><p className="muted">Сегодня достаточно одного хорошего занятия.</p></div><div className="streak-pill"><span>🔥</span><strong>{stats.streak}</strong><small>дней</small></div></section>
    <section className="hero-card"><div className="hero-copy"><span className="hero-kicker">ТВОЙ ПЛАН НА СЕГОДНЯ</span><h2>{dueCount?'Продолжить повторение':'Продолжить обучение'}</h2><p>{status}</p><div className="progress-track" aria-label={`Сегодня выполнено ${progress}%`}><span style={{width:`${progress}%`}} /></div><button className="primary-button" onClick={onStart}>Начать сессию <span>→</span></button></div><div className="hero-visual" aria-hidden="true"><div className="landscape"><span className="moon"/><span className="mountain mountain-a"/><span className="mountain mountain-b"/><span className="path"/></div><blockquote>Small steps.<br/>Real fluency.</blockquote></div></section>
    <section className="section-block"><div className="section-heading"><div><p className="eyebrow">BALANCED PRACTICE</p><h2>Сегодняшний план</h2></div><button className="text-button" onClick={()=>onOpenModule('settings')}>Настроить</button></div><div className="plan-grid">{todayPlan.map(item=><button key={item.id} className={`plan-card tone-${item.tone}`} onClick={()=>onOpenModule(item.id)}><span className="plan-icon">{item.icon}</span><strong>{item.title}</strong><small>{planSubtitle(item.id,item.subtitle,dueCount,newCount)}</small></button>)}</div></section>
    <section className="section-block stats-block"><div className="section-heading"><div><p className="eyebrow">WHAT IS ACTUALLY STICKING</p><h2>Твой язык</h2></div><span className="level-chip">{learner.level}</span></div><div className="stats-grid"><Stat number={String(stats.studied)} label="Изучено элементов"/><Stat number={String(stats.strong)} label="Уверенно вспоминаются"/><Stat number={String(stats.irregularKnown)} label="Глаголы уверенно"/><Stat number={String(stats.expressions)} label="Выражения встречались"/></div></section>
  </div>
}

function planSubtitle(id:string,fallback:string,dueCount:number,newCount:number){if(id==='review')return dueCount?`${dueCount} сейчас`:'нет назначенных';if(id==='new')return newCount?`${Math.min(newCount,5)} в ближайшей сессии`:'всё изучено';return fallback}
function Stat({number,label}:{number:string;label:string}){return <div className="stat-card"><strong>{number}</strong><span>{label}</span></div>}
