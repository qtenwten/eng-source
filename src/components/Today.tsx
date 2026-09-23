import { DailyLearningPlan } from './DailyLearningPlan'
import type { LearnerState,LearningStats } from '../types'

interface Props{learner:LearnerState;stats:LearningStats;dueCount:number;newCount:number;onStart:()=>void;onOpenModule:(module:string)=>void}

export function Today({learner,stats,dueCount,newCount,onStart,onOpenModule}:Props){
  const weekday=new Intl.DateTimeFormat('ru-RU',{weekday:'long'}).format(new Date()).toUpperCase()
  const reviewTotal=stats.reviewedToday+dueCount
  const progress=reviewTotal?Math.min(100,Math.round(stats.reviewedToday/reviewTotal*100)):100
  const queueEmpty=!dueCount&&!newCount
  const status=dueCount>0?`${dueCount} элементов готовы к повторению`:newCount>0?`Повторения закрыты · ${newCount} новых элементов ждут знакомства`:'Карточки закрыты. Следующий шаг — чтение, аудирование или собственная речь в плане ниже.'
  const greeting=learner.name?`Привет, ${learner.name}!`:'Привет!'
  return <div className="page today-page">
    <section className="welcome-row"><div><p className="eyebrow">{weekday} · YOUR ENGLISH</p><h1>{greeting} <span className="sun">✦</span></h1><p className="muted">Сегодня достаточно одного хорошего занятия — но язык лучше растёт из разных типов практики.</p></div><div className="streak-pill"><span>🔥</span><strong>{stats.streak}</strong><small>дней</small></div></section>
    <section className="hero-card"><div className="hero-copy"><span className="hero-kicker">ТВОЙ ПЛАН НА СЕГОДНЯ</span><h2>{dueCount?'Продолжить повторение':newCount?'Продолжить обучение':'Перейти к живому языку'}</h2><p>{status}</p><div className="progress-track" aria-label={`FSRS-повторения сегодня выполнены на ${progress}%`}><span style={{width:`${progress}%`}} /></div>{!queueEmpty&&<button className="primary-button" onClick={onStart}>Начать сессию <span>→</span></button>}</div><div className="hero-visual" aria-hidden="true"><div className="landscape"><span className="moon"/><span className="mountain mountain-a"/><span className="mountain mountain-b"/><span className="path"/></div><blockquote>Small steps.<br/>Real fluency.</blockquote></div></section>
    <DailyLearningPlan learner={learner} dueCount={dueCount} newCount={newCount} onOpenModule={onOpenModule}/>
    <section className="section-block stats-block"><div className="section-heading"><div><p className="eyebrow">WHAT IS ACTUALLY STICKING</p><h2>Твой язык</h2></div><span className="level-chip">{learner.level}</span></div><div className="stats-grid"><Stat number={String(stats.studied)} label="Изучено элементов"/><Stat number={String(stats.strong)} label="Уверенно вспоминаются"/><Stat number={String(stats.active)} label="Подтверждены в речи/письме"/><Stat number={String(stats.errorsDue)} label="Ошибок к повторению"/></div></section>
  </div>
}

function Stat({number,label}:{number:string;label:string}){return <div className="stat-card"><strong>{number}</strong><span>{label}</span></div>}
