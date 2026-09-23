import { buildDailyPlan } from '../lib/dailyPlan'
import type { LearnerState } from '../types'

interface Props {
  learner: LearnerState
  dueCount: number
  newCount: number
  onOpenModule: (module: string) => void
}

export function DailyLearningPlan({ learner, dueCount, newCount, onOpenModule }: Props) {
  const plan = buildDailyPlan(learner, dueCount, newCount)
  const progress = plan.steps.length ? Math.round(plan.completed / plan.steps.length * 100) : 100

  return <section className="section-block daily-route">
    <div className="section-heading">
      <div>
        <p className="eyebrow">ТВОЙ АДАПТИВНЫЙ МАРШРУТ</p>
        <h2>Не только карточки</h2>
      </div>
      <span className="daily-route-budget">≈ {plan.totalMinutes} мин</span>
    </div>
    <p className="daily-route-intro">Повторение, понимание и собственная речь. План учитывает твою цель и выполненные сегодня упражнения — без штрафов за пропуски.</p>
    <div className="daily-route-status">
      <span>{plan.completed} из {plan.steps.length} этапов выполнено</span>
      <div className="daily-route-track" role="progressbar" aria-label="Прогресс дневного маршрута" aria-valuemin={0} aria-valuemax={plan.steps.length} aria-valuenow={plan.completed}>
        <span style={{width: String(progress) + '%'}} />
      </div>
    </div>
    <div className="daily-route-grid">
      {plan.steps.map((step, index) => <button
        key={step.id}
        type="button"
        className={'daily-route-step' + (step.done ? ' is-done' : '')}
        disabled={!step.available}
        onClick={() => onOpenModule(step.module)}
      >
        <span className="daily-route-number" aria-hidden="true">{step.done ? '✓' : index + 1}</span>
        <span className="daily-route-step-copy">
          <strong>{step.title}</strong>
          <small>{step.description}</small>
          <em>{step.done ? 'Выполнено' : 'Открыть упражнение →'}</em>
        </span>
        <span className="daily-route-duration">≈ {step.minutes} мин</span>
      </button>)}
    </div>
    <p className="daily-route-footnote">Время приблизительное. Прогресс засчитывается только после реальных действий, а плановые интервалы FSRS не меняются из-за дополнительных упражнений.</p>
  </section>
}
