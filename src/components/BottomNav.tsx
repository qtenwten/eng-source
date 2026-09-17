import type { NavSection } from '../types'

const tabs:Array<{id:NavSection;label:string}>=[
  {id:'today',label:'Сегодня'},
  {id:'learn',label:'Учить'},
  {id:'practice',label:'Практика'},
  {id:'progress',label:'Прогресс'},
  {id:'profile',label:'Профиль'},
]

export function BottomNav({current,onChange}:{current:NavSection;onChange:(tab:NavSection)=>void}){
  return <nav className="bottom-nav" aria-label="Основная навигация">{tabs.map(tab=><button key={tab.id} className={current===tab.id?'active':''} onClick={()=>onChange(tab.id)} aria-current={current===tab.id?'page':undefined}><span className="nav-icon" aria-hidden="true"><NavIcon id={tab.id}/></span><span className="nav-label">{tab.label}</span></button>)}</nav>
}

function NavIcon({id}:{id:NavSection}){
  const common={width:22,height:22,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.8,strokeLinecap:'round' as const,strokeLinejoin:'round' as const}
  if(id==='today')return <svg {...common}><path d="M3.5 10.5 12 3.8l8.5 6.7"/><path d="M5.5 9.2V20h13V9.2"/><path d="M9.5 20v-6h5v6"/></svg>
  if(id==='learn')return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"/></svg>
  if(id==='practice')return <svg {...common}><path d="M20 7v5h-5"/><path d="M18.4 9.2A7 7 0 1 0 19 15"/></svg>
  if(id==='progress')return <svg {...common}><path d="M4 18V9"/><path d="M10 18V5"/><path d="M16 18v-7"/><path d="M22 18H2"/></svg>
  return <svg {...common}><circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c.8-4 3-6 6.5-6s5.7 2 6.5 6"/></svg>
}
