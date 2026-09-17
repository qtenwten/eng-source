import type { LearnerState } from '../types'
const KEY = 'seng:learner:v1'
export const defaultLearnerState: LearnerState = { name:'Alex', streak:12, level:'B1', activeVocabulary:716, totalVocabulary:1284, expressions:243, irregularKnown:87, irregularTotal:120, themeStyle:'modern', colorMode:'system', memory:{}, reviewLog:[] }
export function loadLearner(): LearnerState { try { const raw=localStorage.getItem(KEY); if(!raw) return defaultLearnerState; return {...defaultLearnerState,...JSON.parse(raw)} } catch { return defaultLearnerState } }
export function saveLearner(state: LearnerState) { localStorage.setItem(KEY, JSON.stringify(state)) }
