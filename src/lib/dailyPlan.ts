import type { LearnerState, LearningGoal } from '../types'

export type DailyModule = 'review' | 'new' | 'reading' | 'books' | 'listening' | 'production'
export type DailyStepId = 'memory' | 'reading' | 'listening' | 'output'

export interface DailyStep {
  id: DailyStepId
  module: DailyModule
  title: string
  description: string
  minutes: number
  done: boolean
  available: boolean
}

export interface DailyPlan {
  steps: DailyStep[]
  completed: number
  totalMinutes: number
}

/**
 * A small, explainable daily route built only from evidence already collected
 * by sENG. Estimates are a time budget, not a claim of measured study time.
 * Reviews remain governed by FSRS; this planner never changes card due dates.
 */
export function buildDailyPlan(
  learner: LearnerState,
  dueCount: number,
  newCount: number,
  now = Date.now(),
): DailyPlan {
  const minutes = Math.max(10, Math.min(60, learner.dailyMinutes))
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)
  const today = start.getTime()

  const todayReviews = learner.reviewLog.filter(event => event.reviewedAt >= today && event.reviewedAt <= now)
  // Newly introduced cards record previousDueAt === reviewedAt in useLearner.
  const introducedToday = todayReviews.filter(event => event.previousDueAt === event.reviewedAt).length
  const scheduledToday = todayReviews.length - introducedToday
  const todayActivities = learner.activityLog.filter(event => event.completedAt >= today && event.completedAt <= now)
  const did = (kind: 'reading' | 'listening' | 'speaking' | 'writing') =>
    todayActivities.some(event => event.kind === kind)

  const memoryIsRelevant = dueCount > 0 || newCount > 0 || todayReviews.length > 0
  const memoryMinutes = memoryIsRelevant ? Math.round(minutes * 0.36) : 0
  const inputMinutes = memoryIsRelevant ? Math.round(minutes * 0.34) : Math.round(minutes * 0.5)
  const outputMinutes = minutes - memoryMinutes - inputMinutes
  const steps: DailyStep[] = []

  if (dueCount > 0) {
    steps.push({
      id: 'memory', module: 'review', title: 'Повторить по расписанию',
      description: String(dueCount) + ' элементов ожидают повторения. Сначала вспомни, затем открой ответ.',
      minutes: memoryMinutes, done: false, available: true,
    })
  } else if (scheduledToday > 0) {
    steps.push({
      id: 'memory', module: 'review', title: 'Повторение выполнено',
      description: 'Сегодняшняя очередь FSRS закрыта. Новые слова можно открыть отдельно в разделе «Учить».',
      minutes: memoryMinutes, done: true, available: false,
    })
  } else if (newCount > 0) {
    const target = Math.min(newCount + introducedToday, minutes >= 20 ? 5 : 3)
    const done = introducedToday >= target
    steps.push({
      id: 'memory', module: 'new', title: done ? 'Новые слова изучены' : 'Познакомиться с новым',
      description: done
        ? 'Первые попытки записаны; система сама назначит последующие повторения.'
        : 'Начни с ' + String(target) + ' новых слов или выражений, не перегружая память.',
      minutes: memoryMinutes, done, available: !done,
    })
  } else if (todayReviews.length > 0) {
    steps.push({
      id: 'memory', module: 'review', title: 'Работа с памятью выполнена',
      description: 'Сейчас новых карточек и назначенных повторений нет.',
      minutes: memoryMinutes, done: true, available: false,
    })
  }

  if (minutes >= 30) {
    const readingMinutes = Math.round(inputMinutes / 2)
    steps.push(readingStep(readingMinutes, did('reading')))
    steps.push({
      id: 'listening', module: 'listening', title: 'Понять речь на слух',
      description: 'Сначала прослушай без текста, потом проверь себя по расшифровке.',
      minutes: inputMinutes - readingMinutes, done: did('listening'), available: !did('listening'),
    })
  } else if (preferredInput(learner.goal, learner.activityLog, today, now) === 'reading') {
    steps.push(readingStep(inputMinutes, did('reading')))
  } else {
    steps.push({
      id: 'listening', module: 'listening', title: 'Понять речь на слух',
      description: 'Сначала прослушай без текста, потом проверь себя по расшифровке.',
      minutes: inputMinutes, done: did('listening'), available: !did('listening'),
    })
  }

  const writingGoal = learner.goal === 'work'
  const outputDone = writingGoal ? did('writing') : did('speaking') || did('writing')
  steps.push({
    id: 'output', module: 'production',
    title: writingGoal ? 'Написать своими словами' : 'Сказать своими словами',
    description: 'Выполни короткую задачу, проверь ошибки и вернись к ней позже.',
    minutes: outputMinutes, done: outputDone, available: !outputDone,
  })

  return { steps, completed: steps.filter(step => step.done).length, totalMinutes: minutes }
}

function readingStep(minutes: number, done: boolean): DailyStep {
  return {
    id: 'reading', module: minutes >= 7 ? 'books' : 'reading',
    title: 'Почитать понятный английский',
    description: 'Читай ради смысла; незнакомые выражения сохраняй вместе с контекстом.',
    minutes, done, available: !done,
  }
}

function preferredInput(
  goal: LearningGoal,
  activities: LearnerState['activityLog'],
  today: number,
  now: number,
): 'reading' | 'listening' {
  if (goal === 'media' || goal === 'conversation' || goal === 'travel') return 'listening'
  if (goal === 'work') return 'reading'
  const lastWeek = activities.filter(event => event.completedAt < today && event.completedAt >= now - 7 * 86_400_000)
  const reading = lastWeek.filter(event => event.kind === 'reading').reduce((sum, event) => sum + event.durationMinutes, 0)
  const listening = lastWeek.filter(event => event.kind === 'listening').reduce((sum, event) => sum + event.durationMinutes, 0)
  // Equal history alternates by local calendar day and stays stable during the day.
  if (reading === listening) return Math.floor(today / 86_400_000) % 2 ? 'reading' : 'listening'
  return reading < listening ? 'reading' : 'listening'
}
