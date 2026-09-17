import { useEffect,useMemo,useState } from 'react'
import { useLearner } from './app/useLearner'
import { resolveColorMode } from './app/theme'
import { BottomNav } from './components/BottomNav'
import { Today } from './components/Today'
import { Learn } from './components/Learn'
import { Practice } from './components/Practice'
import { Progress } from './components/Progress'
import { Profile } from './components/Profile'
import { StudySession } from './components/StudySession'
import { ThemeControls } from './components/ThemeControls'
import { Onboarding } from './components/Onboarding'
import type { ItemKind,NavSection } from './types'
import './styles.css'
import './alignment.css'

type SessionKind=ItemKind|'due'|'new'
type Availability=Record<ItemKind,number>

export default function App(){
  const{state,dueItems,newItems,stats,setThemeStyle,setColorMode,completeOnboarding,rateItem,resetProgress}=useLearner()
  const[section,setSection]=useState<NavSection>('today')
  const[sessionKind,setSessionKind]=useState<SessionKind|null>(null)
  const[systemTick,setSystemTick]=useState(0)

  useEffect(()=>{const media=window.matchMedia('(prefers-color-scheme: dark)');const handler=()=>setSystemTick(value=>value+1);media.addEventListener?.('change',handler);return()=>media.removeEventListener?.('change',handler)},[])
  const resolvedMode=useMemo(()=>resolveColorMode(state.colorMode),[state.colorMode,systemTick])
  const availableByKind=useMemo<Availability>(()=>({
    word:dueItems.filter(item=>item.kind==='word').length+newItems.filter(item=>item.kind==='word').length,
    chunk:dueItems.filter(item=>item.kind==='chunk').length+newItems.filter(item=>item.kind==='chunk').length,
    irregular:dueItems.filter(item=>item.kind==='irregular').length+newItems.filter(item=>item.kind==='irregular').length,
  }),[dueItems,newItems])
  const sessionItems=useMemo(()=>{
    if(!sessionKind)return[]
    if(sessionKind==='due')return dueItems.slice(0,7)
    if(sessionKind==='new')return newItems.slice(0,7)
    const scheduled=dueItems.filter(item=>item.kind===sessionKind)
    const unseen=newItems.filter(item=>item.kind===sessionKind)
    return [...scheduled,...unseen].slice(0,7)
  },[sessionKind,dueItems,newItems])
  const startPrimary=()=>{
    if(dueItems.length)setSessionKind('due')
    else if(newItems.length)setSessionKind('new')
  }

  if(!state.onboardingComplete)return <div className={`app theme-${state.themeStyle} mode-${resolvedMode}`}><Onboarding onComplete={completeOnboarding}/></div>

  const openModule=(module:string)=>{
    if(module==='verbs'&&availableByKind.irregular)setSessionKind('irregular')
    else if(module==='chunks'&&availableByKind.chunk)setSessionKind('chunk')
    else if(module==='review'&&dueItems.length)setSessionKind('due')
    else if(module==='new'&&newItems.length)setSessionKind('new')
    else if(module==='settings')setSection('profile')
  }

  return <div className={`app theme-${state.themeStyle} mode-${resolvedMode}`}>
    <aside className="desktop-sidebar">
      <div className="brand"><span className="brand-mark">s</span><strong>sENG</strong></div>
      <p className="brand-tagline">English that stays.</p>
      <Sidebar section={section} onChange={setSection}/>
      <div className="sidebar-bottom"><ThemeControls themeStyle={state.themeStyle} colorMode={state.colorMode} onThemeStyle={setThemeStyle} onColorMode={setColorMode}/><div className="mini-profile"><span>{state.name.slice(0,1).toUpperCase()}</span><div><strong>{state.name}</strong><small>{state.level} · 🔥 {stats.streak}</small></div></div></div>
    </aside>
    <main className="main-content">
      <header className="mobile-topbar"><div className="brand"><span className="brand-mark">s</span><strong>sENG</strong></div><span className="level-chip">{state.level}</span></header>
      {section==='today'&&<Today learner={state} stats={stats} dueCount={dueItems.length} newCount={newItems.length} availability={availableByKind} onStart={startPrimary} onOpenModule={openModule}/>} 
      {section==='learn'&&<Learn availability={availableByKind} onStartKind={setSessionKind}/>} 
      {section==='practice'&&<Practice dueCount={dueItems.length} newCount={newItems.length} onStart={startPrimary}/>} 
      {section==='progress'&&<Progress learner={state} stats={stats}/>} 
      {section==='profile'&&<Profile learner={state} stats={stats} onThemeStyle={setThemeStyle} onColorMode={setColorMode} onReset={resetProgress}/>} 
    </main>
    <BottomNav current={section} onChange={setSection}/>
    {sessionKind&&<StudySession items={sessionItems} memory={state.memory} onRate={rateItem} onClose={()=>setSessionKind(null)}/>} 
  </div>
}

function Sidebar({section,onChange}:{section:NavSection;onChange:(value:NavSection)=>void}){
  const items:Array<[NavSection,string,string]>=[['today','⌂','Сегодня'],['learn','▤','Учить'],['practice','↻','Практика'],['progress','⌁','Прогресс'],['profile','○','Профиль']]
  return <nav className="sidebar-nav">{items.map(([id,icon,label])=><button key={id} className={section===id?'active':''} onClick={()=>onChange(id)}><span>{icon}</span>{label}</button>)}</nav>
}
