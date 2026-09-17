import type { ColorMode,LearnerState,LearningGoal,LearningStats,ThemeStyle } from '../types'
import { ThemeControls } from './ThemeControls'

interface Props{learner:LearnerState;stats:LearningStats;onThemeStyle:(value:ThemeStyle)=>void;onColorMode:(value:ColorMode)=>void;onPreferences:(goal:LearningGoal,dailyMinutes:number)=>void;onReset:()=>void}
const goals:Array<[LearningGoal,string]>=[['conversation','Разговор'],['media','Фильмы и YouTube'],['travel','Путешествия'],['work','Работа'],['general','Общий английский']]
const minutes=[10,15,20,30]

export function Profile({learner,stats,onThemeStyle,onColorMode,onPreferences,onReset}:Props){
  const reset=()=>{if(window.confirm('Сбросить историю повторений и учебный прогресс на этом устройстве? Personal Inbox и настройки останутся.'))onReset()}
  return <div className="page generic-page"><p className="eyebrow">YOUR LEARNING SYSTEM</p><h1>Профиль</h1><div className="profile-card"><div className="avatar">{learner.name.slice(0,1).toUpperCase()||'S'}</div><div><h2>{learner.name||'Без имени'}</h2><p>{learner.level} · {stats.streak} дней практики подряд · цель: {goalName(learner.goal)}</p></div></div>
  <section className="settings-card"><div><p className="eyebrow">LEARNING PREFERENCES</p><h2>План обучения</h2><p>Эти настройки действительно влияют на приоритет материала и размер ближайшей карточной сессии.</p></div><div><p className="eyebrow">ОСНОВНАЯ ЦЕЛЬ</p><div className="tool-switch">{goals.map(([id,label])=><button key={id} className={learner.goal===id?'active':''} onClick={()=>onPreferences(id,learner.dailyMinutes)}>{label}</button>)}</div><p className="eyebrow">ОБЫЧНАЯ ДЛИТЕЛЬНОСТЬ</p><div className="tool-switch">{minutes.map(value=><button key={value} className={learner.dailyMinutes===value?'active':''} onClick={()=>onPreferences(learner.goal,value)}>{value} мин</button>)}</div></div></section>
  <section className="settings-card"><div><p className="eyebrow">APPEARANCE</p><h2>Оформление</h2><p>Обе утверждённые дизайн-системы равноправны и поддерживают светлый, тёмный и системный режим.</p></div><ThemeControls themeStyle={learner.themeStyle} colorMode={learner.colorMode} onThemeStyle={onThemeStyle} onColorMode={onColorMode}/></section><section className="settings-card"><div><p className="eyebrow">LOCAL PROTOTYPE</p><h2>Учебные данные</h2><p>Прогресс хранится локально в этом браузере. Сброс очищает расписание, ошибки и историю практики, но не удаляет твой Personal Inbox.</p></div><button className="danger-button" onClick={reset}>Сбросить прогресс</button></section></div>
}

function goalName(goal:LearnerState['goal']){return{conversation:'разговор',media:'фильмы и YouTube',travel:'путешествия',work:'работа',general:'общий английский'}[goal]}
