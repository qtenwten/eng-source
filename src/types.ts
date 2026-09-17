export type ThemeStyle = 'modern' | 'cozy'
export type ColorMode = 'light' | 'dark' | 'system'
export type NavSection = 'today' | 'learn' | 'practice' | 'progress' | 'profile'
export type ItemKind = 'word' | 'chunk' | 'irregular'
export type ReviewRating = 'again' | 'hard' | 'good' | 'easy'
export type LearningGoal = 'conversation' | 'media' | 'travel' | 'work' | 'general'

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
export interface LearningStats { studied: number; strong: number; expressions: number; irregularKnown: number; reviewedToday: number; streak: number }
export interface LearnerState { onboardingComplete: boolean; name: string; level: string; goal: LearningGoal; dailyMinutes: number; themeStyle: ThemeStyle; colorMode: ColorMode; memory: Record<string, MemoryState>; reviewLog: ReviewEvent[] }
