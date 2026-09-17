import type { LearnerState } from '../types'

const KEY='seng:learner:v2'
const LEGACY_KEY='seng:learner:v1'

export const defaultLearnerState: LearnerState = {
  onboardingComplete:false,
  name:'',
  level:'A2–B1',
  goal:'general',
  dailyMinutes:15,
  themeStyle:'modern',
  colorMode:'system',
  memory:{},
  reviewLog:[],
}

export function loadLearner(): LearnerState {
  try {
    const raw=localStorage.getItem(KEY)
    if(raw)return {...defaultLearnerState,...JSON.parse(raw),memory:JSON.parse(raw).memory??{},reviewLog:JSON.parse(raw).reviewLog??[]}
    const legacy=localStorage.getItem(LEGACY_KEY)
    if(!legacy)return defaultLearnerState
    const parsed=JSON.parse(legacy) as Partial<LearnerState>
    return {...defaultLearnerState,...parsed,memory:{},reviewLog:[]}
  } catch {
    return defaultLearnerState
  }
}

export function saveLearner(state: LearnerState) {
  localStorage.setItem(KEY,JSON.stringify(state))
}
