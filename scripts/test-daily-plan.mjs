import assert from 'node:assert/strict'

// Node 22 strips the erasable TypeScript syntax; the planner's only import
// is type-only, so no browser or TypeScript compiler API is needed here.
const { buildDailyPlan } = await import(new URL('../src/lib/dailyPlan.ts', import.meta.url).href)

const now = new Date()
now.setHours(12, 0, 0, 0)
const current = now.getTime()
const prior = current - 2 * 86_400_000
const base = () => ({
  dailyMinutes: 15,
  goal: 'general',
  reviewLog: [],
  activityLog: [],
  memory: { sample: { dueAt: 123456, stability: 1 } },
})
const step = (plan, id) => plan.steps.find(item => item.id === id)

{
  const learner = base()
  const originalMemory = JSON.stringify(learner.memory)
  const plan = buildDailyPlan(learner, 14, 200, current)
  assert.equal(step(plan, 'memory').module, 'review', 'due cards must precede new cards')
  assert.equal(plan.steps.reduce((sum, item) => sum + item.minutes, 0), 15)
  assert.equal(JSON.stringify(learner.memory), originalMemory, 'planner must not reschedule FSRS')
}

{
  const plan = buildDailyPlan(base(), 0, 20, current)
  assert.equal(step(plan, 'memory').module, 'new')
  assert.equal(step(plan, 'memory').done, false)
}

{
  const learner = base()
  learner.reviewLog = Array.from({ length: 3 }, (_, i) => ({
    itemId: 'new-' + i, reviewedAt: current - 1_000 - i,
    previousDueAt: current - 1_000 - i, nextDueAt: current + 86_400_000,
  }))
  const plan = buildDailyPlan(learner, 0, 17, current)
  assert.equal(step(plan, 'memory').done, true, 'introduced items should count as evidence')
}

{
  const learner = base()
  learner.activityLog = [{ kind: 'reading', durationMinutes: 12, completedAt: prior }]
  const plan = buildDailyPlan(learner, 2, 20, current)
  assert.ok(step(plan, 'listening'), 'general goal should balance the weaker input channel')
  assert.equal(step(plan, 'listening').done, false)
}

{
  const learner = base()
  learner.goal = 'work'
  learner.activityLog = [{ kind: 'speaking', durationMinutes: 5, completedAt: current - 60_000 }]
  const plan = buildDailyPlan(learner, 2, 20, current)
  assert.equal(step(plan, 'output').done, false, 'work writing goal is not met by speaking')
  learner.activityLog.push({ kind: 'writing', durationMinutes: 4, completedAt: current - 20_000 })
  assert.equal(step(buildDailyPlan(learner, 2, 20, current), 'output').done, true)
}

{
  const learner = base()
  learner.dailyMinutes = 30
  const plan = buildDailyPlan(learner, 3, 20, current)
  assert.ok(step(plan, 'reading') && step(plan, 'listening'), 'long sessions cover both input modes')
  assert.equal(plan.steps.reduce((sum, item) => sum + item.minutes, 0), 30)
}

{
  const learner = base()
  learner.goal = 'media'
  learner.activityLog = [{ kind: 'listening', durationMinutes: 2, completedAt: current - 30_000 }]
  const plan = buildDailyPlan(learner, 0, 0, current)
  assert.equal(step(plan, 'listening').done, true, 'recorded listening is a real completion')
  assert.equal(plan.completed, 1)
  assert.equal(plan.steps.reduce((sum, item) => sum + item.minutes, 0), 15)
}

console.log('dailyPlan: 7 scenarios passed')
