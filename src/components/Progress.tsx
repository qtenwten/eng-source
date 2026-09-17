import type { LearnerState,LearningStats } from '../types'

export function Progress({learner,stats}:{learner:LearnerState;stats:LearningStats}){
  const reviews=learner.reviewLog.length
  const strongAnswers=learner.reviewLog.filter(item=>item.rating==='good'||item.rating==='easy').length
  const strongShare=reviews?Math.round(strongAnswers/reviews*100):null
  return <div className="page generic-page">
    <p className="eyebrow">PROGRESS WITHOUT FAKE PRECISION</p>
    <h1>Прогресс</h1>
    <p className="page-lead">sENG показывает только то, что реально может обосновать твоими ответами. Навыковые оценки появятся после соответствующих упражнений.</p>
    <div className="progress-hero">
      <div className="level-ring"><span>{learner.level}</span><small>стартовая гипотеза</small></div>
      <div className="skill-list">
        <Evidence label="Vocabulary / recall" state={reviews?'данные собираются':'ещё нет данных'} detail={reviews?`${reviews} ответов · ${stats.strong} элементов сейчас устойчивы`:'пройди первую сессию'}/>
        <Evidence label="Listening" state="не измерено" detail="нужны listening-задачи"/>
        <Evidence label="Speaking" state="не измерено" detail="нужны speaking-задачи"/>
        <Evidence label="Reading" state="не измерено" detail="нужны reading-задачи"/>
      </div>
    </div>
    <div className="stats-grid wide-stats">
      <Metric title="Изучено" value={String(stats.studied)} hint="элементов с историей"/>
      <Metric title="Уверенно" value={String(stats.strong)} hint="по текущей памяти"/>
      <Metric title="Strong answers" value={strongShare===null?'—':`${strongShare}%`} hint="good + easy, не retention"/>
      <Metric title="Streak" value={`${stats.streak} дн`} hint="по реальным дням практики"/>
    </div>
    <div className="strand-card">
      <div><p className="eyebrow">FOUR STRANDS</p><h2>Баланс без придуманных процентов</h2><p className="muted">Текущий MVP уже собирает language-focused review. Input, output и fluency получат отдельные события после появления чтения, listening и speaking. До этого проценты не рисуем.</p></div>
    </div>
  </div>
}

function Evidence({label,state,detail}:{label:string;state:string;detail:string}){return <div className="evidence-row"><div className="evidence-copy"><span>{label}</span><small>{detail}</small></div><b>{state}</b></div>}
function Metric({title,value,hint}:{title:string;value:string;hint:string}){return <div className="stat-card metric"><span>{title}</span><strong>{value}</strong><small>{hint}</small></div>}
