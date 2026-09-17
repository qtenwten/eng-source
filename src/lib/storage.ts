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
  inbox:[],
  errors:[],
  productiveAttempts:[],
  activityLog:[],
}

export function loadLearner(): LearnerState {
  try {
    const raw=localStorage.getItem(KEY)
    if(raw){
      const parsed=JSON.parse(raw) as Partial<LearnerState>
      return {
        ...defaultLearnerState,
        ...parsed,
        memory:parsed.memory??{},
        reviewLog:parsed.reviewLog??[],
        inbox:parsed.inbox??[],
        errors:parsed.errors??[],
        productiveAttempts:parsed.productiveAttempts??[],
        activityLog:parsed.activityLog??[],
      }
    }
    const legacy=localStorage.getItem(LEGACY_KEY)
    if(!legacy)return defaultLearnerState
    const parsed=JSON.parse(legacy) as Partial<LearnerState>
    return {...defaultLearnerState,...parsed,memory:{},reviewLog:[],inbox:[],errors:[],productiveAttempts:[],activityLog:[]}
  } catch {
    return defaultLearnerState
  }
}

export function saveLearner(state: LearnerState) {
  try {
    localStorage.setItem(KEY,JSON.stringify(state))
  } catch {
    // The learning session should keep working even if private mode/quota blocks persistence.
  }
}
