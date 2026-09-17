import { useMemo,useState } from 'react'
import { irregularVerbs } from '../data/irregularVerbs'

export function IrregularVerbTable({onClose,onStartTest}:{onClose:()=>void;onStartTest:()=>void}){
  const[query,setQuery]=useState('')
  const[level,setLevel]=useState('all')
  const rows=useMemo(()=>{
    const q=query.trim().toLowerCase()
    return irregularVerbs.filter(row=>{
      const matchesLevel=level==='all'||row.level===level
      const haystack=`${row.base} ${row.past} ${row.participle} ${row.translation}`.toLowerCase()
      return matchesLevel&&(!q||haystack.includes(q))
    })
  },[query,level])

  return <div className="tool-overlay" role="dialog" aria-modal="true" aria-label="Таблица неправильных глаголов">
    <section className="tool-sheet verb-table-sheet">
      <header className="tool-header"><button className="icon-button" onClick={onClose} aria-label="Закрыть">×</button><div><p className="eyebrow">V1 · V2 · V3</p><h2>Неправильные глаголы</h2></div></header>
      <div className="tool-body verb-table-body">
        <div className="verb-table-intro"><div><h3>Сначала изучи формы, потом проверь себя</h3><p>V1 — начальная форма, V2 — Past Simple, V3 — Past Participle. Не обязательно учить все 91 за один раз: фильтруй по уровню и возвращайся к таблице перед тестированием.</p></div><button className="primary-action verb-test-button" onClick={onStartTest}>Перейти к тесту V2/V3 →</button></div>
        <div className="verb-table-controls"><label><span>Поиск</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="go, went, идти…"/></label><div className="verb-levels">{['all','A1','A2','B1','B2'].map(item=><button key={item} className={level===item?'active':''} onClick={()=>setLevel(item)}>{item==='all'?'Все':item}</button>)}</div></div>
        <div className="verb-table-head"><b>V1 · начальная</b><b>V2 · Past Simple</b><b>V3 · Past Participle</b><b>Перевод</b></div>
        <div className="verb-table-list">{rows.map(row=><article className="verb-row" key={row.base}>
          <div className="verb-cell verb-v1"><small>V1 · начальная форма</small><button onClick={()=>speak(row.base)}><strong>{row.base}</strong><span>🔊</span></button></div>
          <div className="verb-cell"><small>V2 · Past Simple</small><button onClick={()=>speak(row.past.replace(' / ',' '))}><strong>{row.past}</strong><span>🔊</span></button></div>
          <div className="verb-cell"><small>V3 · Past Participle</small><button onClick={()=>speak(row.participle.replace(' / ',' '))}><strong>{row.participle}</strong><span>🔊</span></button></div>
          <div className="verb-cell verb-translation"><small>Перевод · {row.level}</small><strong>{row.translation}</strong></div>
          <div className="verb-example"><span>{row.example}</span><small>{row.exampleTranslation}</small></div>
        </article>)}</div>
        {!rows.length&&<div className="empty-tool"><span>⌕</span><p>По этому запросу ничего не найдено.</p></div>}
        <div className="verb-table-footer"><p>Показано {rows.length} из {irregularVerbs.length} глаголов.</p><button className="primary-action" onClick={onStartTest}>Начать тест: вписать V2 и V3</button></div>
      </div>
    </section>
  </div>
}

function speak(text:string){if(!('speechSynthesis' in window))return;window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-US';utterance.rate=.88;window.speechSynthesis.speak(utterance)}
