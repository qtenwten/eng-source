import type { LearnerState,LearningStats } from '../types'

export function Progress({learner,stats}:{learner:LearnerState;stats:LearningStats}){
  const reviews=learner.reviewLog.length
  const strongAnswers=learner.reviewLog.filter(item=>item.rating==='good'||item.rating==='easy').length
  const strongShare=reviews?Math.round(strongAnswers/reviews*100):null
  const activity=(kind:'reading'|'listening'|'speaking'|'writing')=>learner.activityLog.filter(item=>item.kind===kind).reduce((sum,item)=>sum+item.durationMinutes,0)
  const outputAttempts=learner.productiveAttempts.length
  return <div className="page generic-page">
    <p className="eyebrow">PROGRESS WITHOUT FAKE PRECISION</p>
    <h1>Прогресс</h1>
    <p className="page-lead">sENG разделяет память, input и output. Здесь показываются только реальные события, а не декоративные проценты уровня.</p>
    <div className="progress-hero">
      <div className="level-ring"><span>{learner.level}</span><small>стартовая гипотеза</small></div>
      <div className="skill-list">
        <Evidence label="Vocabulary / recall" state={reviews?'измеряется':'нет данных'} detail={reviews?`${reviews} ответов · ${stats.active} элементов дошли до active`:'пройди первую сессию'}/>
        <Evidence label="Listening" state={activity('listening')?`${activity('listening')} мин`:'нет данных'} detail="аудио-сессии с delayed transcript"/>
        <Evidence label="Speaking / writing" state={outputAttempts?`${outputAttempts} попыт.`:'нет данных'} detail="продуктивные задачи с возвратом через несколько дней"/>
        <Evidence label="Reading" state={activity('reading')?`${activity('reading')} мин`:'нет данных'} detail="meaning-focused reading"/>
      </div>
    </div>
    <div className="stats-grid wide-stats">
      <Metric title="Изучено" value={String(stats.studied)} hint="элементов с историей"/>
      <Metric title="Active" value={String(stats.active)} hint="устойчивое использование"/>
      <Metric title="Strong answers" value={strongShare===null?'—':`${strongShare}%`} hint="good + easy, не retention"/>
      <Metric title="Ошибки due" value={String(stats.errorsDue)} hint="персональная очередь"/>
    </div>
    <div className="strand-card"><div><p className="eyebrow">FOUR STRANDS</p><h2>Баланс теперь собирается из реальных действий</h2><p className="muted">Language-focused learning фиксируется review-событиями; meaning-focused input — чтением и listening; output — speaking/writing. Fluency будет выделена отдельно, когда появятся повторные timed-задачи. Проценты не рисуются, пока данных недостаточно.</p></div><div className="activity-summary"><span>Reading <b>{activity('reading')} мин</b></span><span>Listening <b>{activity('listening')} мин</b></span><span>Speaking <b>{activity('speaking')} мин</b></span><span>Writing <b>{activity('writing')} мин</b></span></div></div>
  </div>
}

function Evidence({label,state,detail}:{label:string;state:string;detail:string}){return <div className="evidence-row"><div className="evidence-copy"><span>{label}</span><small>{detail}</small></div><b>{state}</b></div>}
function Metric({title,value,hint}:{title:string;value:string;hint:string}){return <div className="stat-card metric"><span>{title}</span><strong>{value}</strong><small>{hint}</small></div>}
