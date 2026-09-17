import { learningItems } from '../data/seed'
import type { ItemKind } from '../types'

type Availability=Record<ItemKind,number>
const groups:Array<{kind:ItemKind;title:string;description:string;icon:string}>=[
  {kind:'word',title:'Словарь',description:'Активное вспоминание, произношение и контекст',icon:'Aa'},
  {kind:'chunk',title:'Выражения и collocations',description:'Фразы, которыми реально строится речь',icon:'⌘'},
  {kind:'irregular',title:'Неправильные глаголы',description:'Формы через контекст, а не мёртвую таблицу',icon:'↯'},
]

export function Learn({availability,onStartKind}:{availability:Availability;onStartKind:(kind:ItemKind)=>void}){
  return <div className="page generic-page">
    <p className="eyebrow">BUILD THE LANGUAGE GRAPH</p><h1>Учить</h1>
    <p className="page-lead">Не собирай слова как покемонов. Связывай форму, смысл, звук и реальные фразы.</p>
    <div className="module-stack">{groups.map(group=>{
      const total=learningItems.filter(item=>item.kind===group.kind).length
      const available=availability[group.kind]
      return <button key={group.kind} className="module-row" disabled={!available} aria-disabled={!available} onClick={()=>available&&onStartKind(group.kind)}>
        <span className="module-icon">{group.icon}</span>
        <span className="module-copy"><strong>{group.title}</strong><small>{group.description}</small></span>
        <span className="module-meta">{available?`${available} сейчас`:`${total} в базе`} <b>{available?'→':'✓'}</b></span>
      </button>
    })}</div>
    <div className="inbox-card"><div><span className="eyebrow">PERSONAL INBOX</span><h2>Сохраняй английский из своей жизни</h2><p>Слово из ролика, игры, фильма или переписки должно попадать в обучение вместе с исходным контекстом. Эта функция будет следующим полноценным модулем.</p></div><button className="secondary-button" disabled aria-disabled="true" title="Будет добавлено следующим этапом">Скоро: добавить фразу</button></div>
  </div>
}
