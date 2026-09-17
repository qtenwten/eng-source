export type ThemeStyle = 'modern' | 'cozy'
export type ColorMode = 'light' | 'dark' | 'system'
export type NavSection = 'today' | 'learn' | 'practice' | 'progress' | 'profile'
export type ItemKind = 'word' | 'chunk' | 'irregular'
export type ReviewRating = 'again' | 'hard' | 'good' | 'easy'
export type LearningGoal = 'conversation' | 'media' | 'travel' | 'work' | 'general'
export type LearningTool = 'inbox' | 'reading' | 'listening' | 'errors' | 'production' | 'coach' | 'active'
export type ProductiveMode = 'speaking' | 'writing'
export type ActivityKind = 'reading' | 'listening' | 'speaking' | 'writing'
export type MasteryStage = 'unseen' | 'recognition' | 'recall' | 'context' | 'active'

export interface LearningItem { id: string; kind: ItemKind; prompt: string; answer: string; translation: string; example: string; note?: string; tags: string[] }
export interface MemoryState {
  itemId: string
  dueAt: number
  stability: number
  difficulty: number
  elapsedDays: number
  scheduledDays: number
  learningSteps: number
  reviews: number
  lapses: number
  state: number
  lastReviewedAt?: number
  lastRating?: ReviewRating
}
export interface ReviewEvent { id: string; itemId: string; rating: ReviewRating; reviewedAt: number; previousDueAt: number; nextDueAt: number }
export interface OnboardingProfile { name: string; level: string; goal: LearningGoal; dailyMinutes: number }
export interface InboxItem { id: string; text: string; translation: string; context: string; createdAt: number }
export interface LearnerError { id: string; incorrect: string; correct: string; explanation: string; count: number; createdAt: number; lastSeenAt: number; nextPracticeAt: number; resolvedCount: number; source: 'manual' | 'writing' | 'study' }
export interface ProductiveAttempt {
  id: string
  taskId: string
  mode: ProductiveMode
  response: string
  createdAt: number
  targetHits: number
  feedback: string[]
  nextDueAt: number
  /** Optional for migration compatibility with attempts created before productive-evidence tracking. */
  targets?: string[]
  usedTargets?: string[]
}
export interface ActivityEvent { id: string; kind: ActivityKind; durationMinutes: number; completedAt: number }
export interface LearningStats { studied: number; strong: number; active: number; expressions: number; irregularKnown: number; reviewedToday: number; streak: number; errorsDue: number }
export interface LearnerState {
  onboardingComplete: boolean
  name: string
  level: string
  goal: LearningGoal
  dailyMinutes: number
  themeStyle: ThemeStyle
  colorMode: ColorMode
  memory: Record<string, MemoryState>
  reviewLog: ReviewEvent[]
  inbox: InboxItem[]
  errors: LearnerError[]
  productiveAttempts: ProductiveAttempt[]
  activityLog: ActivityEvent[]
}
