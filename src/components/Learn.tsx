import { learningItems } from '../data/seed'
import type { AppTool,ItemKind,LearningTool } from '../types'

type Availability=Record<ItemKind,number>
const groups:Array<{kind:ItemKind;title:string;description:string;icon:string}>=[
  {kind:'word',title:'Словарь',description:'Активное вспоминание, звук и контекст',icon:'Aa'},
  {kind:'chunk',title:'Выражения и collocations',description:'Фразы, которыми реально строится речь',icon:'⌘'},
  {kind:'irregular',title:'Неправильные глаголы',description:'Сначала таблица V1/V2/V3, затем отдельный тест',icon:'↯'},
]
const tools:Array<{id:LearningTool;title:string;description:string;icon:string}>=[
  {id:'reading',title:'Чтение классики',description:'100 адаптированных текстов: 10 уровней сложности × 10 чтений, EN/RU и разбор слов',icon:'R'},
  {id:'inbox',title:'Personal Inbox',description:'Добавляй слова и фразы из фильмов, игр, YouTube и жизни',icon:'＋'},
  {id:'listening',title:'Аудирование',description:'Сначала звук, затем расшифровка как временная поддержка',icon:'▶'},
  {id:'active',title:'Активный словарь',description:'От «узнаю» до подтверждённого использования, а не один счётчик',icon:'A'},
]

export function Learn({availability,onStartKind,onOpenTool}:{availability:Availability;onStartKind:(kind:ItemKind)=>void;onOpenTool:(tool:AppTool)=>void}){
  return <div className="page generic-page">
    <p className="eyebrow">BUILD THE LANGUAGE GRAPH</p><h1>Учить</h1>
    <p className="page-lead">Связывай форму, смысл, звук, контекст и реальное использование. Карточки — только один из слоёв.</p>
    <div className="module-stack">{groups.map(group=>{
      const total=learningItems.filter(item=>item.kind===group.kind).length
      const available=availability[group.kind]
      const open=()=>group.kind==='irregular'?onOpenTool('irregular-table'):available&&onStartKind(group.kind)
      return <button key={group.kind} className="module-row" disabled={group.kind!=='irregular'&&!available} aria-disabled={group.kind!=='irregular'&&!available} onClick={open}>
        <span className="module-icon">{group.icon}</span><span className="module-copy"><strong>{group.title}</strong><small>{group.description}</small></span><span className="module-meta">{group.kind==='irregular'?`${total} в таблице`:available?`${available} сейчас`:`${total} в базе`} <b>→</b></span>
      </button>
    })}</div>
    <section className="section-block"><div className="section-heading"><div><p className="eyebrow">REAL LANGUAGE INPUT</p><h2>Язык вне карточек</h2></div></div><div className="tool-launch-grid">{tools.map(tool=><button key={tool.id} className="tool-launch" onClick={()=>onOpenTool(tool.id)}><span>{tool.icon}</span><strong>{tool.title}</strong><small>{tool.description}</small><b>→</b></button>)}</div></section>
  </div>
}
