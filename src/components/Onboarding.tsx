import { useState } from 'react'
import type { LearningGoal,OnboardingProfile } from '../types'
import './onboarding.css'

interface Props{onComplete:(profile:OnboardingProfile)=>void}
const goals:Array<{id:LearningGoal;icon:string;title:string;copy:string}>=[
  {id:'conversation',icon:'◌',title:'Свободнее говорить',copy:'Разговорная речь, chunks и быстрый поиск слов'},
  {id:'media',icon:'▶',title:'Понимать фильмы и YouTube',copy:'Listening, живая лексика и естественные выражения'},
  {id:'travel',icon:'⌖',title:'Путешествовать',copy:'Практичные ситуации и уверенное общение'},
  {id:'work',icon:'▣',title:'Английский для работы',copy:'Переписка, созвоны и профессиональная речь'},
  {id:'general',icon:'∞',title:'Прокачать английский целиком',copy:'Сбалансированная программа без перекоса в один навык'},
]
const minuteOptions=[10,15,20,30]
const levelOptions=[
  {id:'A1',title:'A1',copy:'Знаю базовые слова и очень простые фразы'},
  {id:'A2',title:'A2',copy:'Могу объясниться в знакомых бытовых ситуациях'},
  {id:'B1',title:'B1',copy:'Понимаю основную мысль и могу поддержать разговор'},
  {id:'B2',title:'B2',copy:'Довольно свободно понимаю и выражаю мысли'},
  {id:'C1',title:'C1+',copy:'Хочу точность, естественность и сложную лексику'},
  {id:'A2–B1',title:'Не уверен',copy:'Начнём с предварительного диапазона и уточним по занятиям'},
]

export function Onboarding({onComplete}:Props){
  const[step,setStep]=useState(0)
  const[name,setName]=useState('')
  const[goal,setGoal]=useState<LearningGoal>('general')
  const[dailyMinutes,setDailyMinutes]=useState(15)
  const[level,setLevel]=useState('A2–B1')
  const finish=()=>onComplete({name:name.trim(),goal,dailyMinutes,level})
  return <main className="onboarding-shell">
    <div className="onboarding-brand"><span className="brand-mark">s</span><strong>sENG</strong></div>
    <section className="onboarding-card" aria-live="polite">
      <div className="onboarding-progress" aria-label={`Шаг ${step+1} из 4`}><span style={{width:`${((step+1)/4)*100}%`}}/></div>
      {step===0&&<div className="onboarding-step">
        <p className="eyebrow">PERSONAL SETUP</p><h1>Для чего тебе английский?</h1><p className="onboarding-lead">sENG будет менять приоритет слов, выражений и упражнений под твою цель.</p>
        <div className="choice-list">{goals.map(item=><button key={item.id} className={`choice-card ${goal===item.id?'selected':''}`} onClick={()=>setGoal(item.id)}><span className="choice-icon">{item.icon}</span><span><strong>{item.title}</strong><small>{item.copy}</small></span><b>✓</b></button>)}</div>
      </div>}
      {step===1&&<div className="onboarding-step compact-step">
        <p className="eyebrow">ABOUT YOU</p><h1>Как к тебе обращаться?</h1><p className="onboarding-lead">Можно оставить пустым — интерфейс просто будет использовать нейтральное приветствие.</p>
        <label className="name-field"><span>Имя</span><input autoFocus value={name} onChange={event=>setName(event.target.value)} placeholder="Например, Арсений" maxLength={40}/></label>
        <div className="privacy-note"><span>◎</span><p><strong>Без лишней анкеты.</strong><br/>На старте нам не нужны возраст, пол или десяток маркетинговых вопросов.</p></div>
      </div>}
      {step===2&&<div className="onboarding-step compact-step">
        <p className="eyebrow">DAILY RHYTHM</p><h1>Сколько времени обычно удобно?</h1><p className="onboarding-lead">Это не обязательство и не штрафной streak. Время используется, чтобы подобрать реалистичный размер ближайшей сессии.</p>
        <div className="minutes-grid">{minuteOptions.map(minutes=><button key={minutes} className={dailyMinutes===minutes?'selected':''} onClick={()=>setDailyMinutes(minutes)}><strong>{minutes}</strong><span>минут</span></button>)}</div>
        <p className="micro-copy">Настройку можно изменить позже в профиле — прогресс не обнулится.</p>
      </div>}
      {step===3&&<div className="onboarding-step">
        <p className="eyebrow">STARTING POINT</p><h1>Как примерно оценишь уровень?</h1><p className="onboarding-lead">Это только стартовая гипотеза. Сейчас она помогает не подсовывать слишком сложный новый материал раньше времени.</p>
        <div className="level-grid">{levelOptions.map(item=><button key={item.id} className={`level-choice ${level===item.id?'selected':''}`} onClick={()=>setLevel(item.id)}><strong>{item.title}</strong><small>{item.copy}</small></button>)}</div>
        <div className="diagnostic-note">Отдельная адаптивная диагностика vocabulary + grammar + listening остаётся следующим важным модулем; до неё sENG не выдаёт самооценку за точный измеренный уровень.</div>
      </div>}
      <footer className="onboarding-actions">{step>0?<button className="secondary-button" onClick={()=>setStep(value=>value-1)}>Назад</button>:<span/>}{step<3?<button className="onboarding-next" onClick={()=>setStep(value=>value+1)}>Продолжить <span>→</span></button>:<button className="onboarding-next" onClick={finish}>Начать обучение <span>→</span></button>}</footer>
    </section>
    <p className="onboarding-footnote">Understand it · Retrieve it · Use it · Meet it again · Make it automatic</p>
  </main>
}
