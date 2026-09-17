import type { LearnerState } from '../types'
const KEY = 'seng:learner:v1'
export const defaultLearnerState: LearnerState = { onboardingComplete:false, name:'', streak:0, level:'A2–B1', goal:'general', dailyMinutes:15, activeVocabulary:0, totalVocabulary:0, expressions:0, irregularKnown:0, irregularTotal:120, themeStyle:'modern', colorMode:'system', memory:{}, reviewLog:[] }
export function loadLearner(): LearnerState { try { const raw=localStorage.getItem(KEY); if(!raw) return defaultLearnerState; return {...defaultLearnerState,...JSON.parse(raw)} } catch { return defaultLearnerState } }
export function saveLearner(state: LearnerState) { localStorage.setItem(KEY, JSON.stringify(state)) }
