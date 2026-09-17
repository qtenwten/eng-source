import type { ColorMode,LearnerState,LearningStats,ThemeStyle } from '../types'
import { ThemeControls } from './ThemeControls'

interface Props{learner:LearnerState;stats:LearningStats;onThemeStyle:(value:ThemeStyle)=>void;onColorMode:(value:ColorMode)=>void;onReset:()=>void}

export function Profile({learner,stats,onThemeStyle,onColorMode,onReset}:Props){
  const reset=()=>{if(window.confirm('Сбросить историю повторений и учебный прогресс на этом устройстве?'))onReset()}
  return <div className="page generic-page"><p className="eyebrow">YOUR LEARNING SYSTEM</p><h1>Профиль</h1><div className="profile-card"><div className="avatar">{learner.name.slice(0,1).toUpperCase()||'S'}</div><div><h2>{learner.name}</h2><p>{learner.level} · {stats.streak} дней практики подряд · цель: {goalName(learner.goal)}</p></div></div><section className="settings-card"><div><p className="eyebrow">APPEARANCE</p><h2>Оформление</h2><p>Обе утверждённые дизайн-системы равноправны и поддерживают светлый, тёмный и системный режим.</p></div><ThemeControls themeStyle={learner.themeStyle} colorMode={learner.colorMode} onThemeStyle={onThemeStyle} onColorMode={onColorMode}/></section><section className="settings-card"><div><p className="eyebrow">LOCAL PROTOTYPE</p><h2>Учебные данные</h2><p>На этой стадии прогресс хранится локально в браузере. Серверная синхронизация будет отдельным слоем.</p></div><button className="danger-button" onClick={reset}>Сбросить прогресс</button></section></div>
}

function goalName(goal:LearnerState['goal']){return{conversation:'разговор',media:'фильмы и YouTube',travel:'путешествия',work:'работа',general:'общий английский'}[goal]}
