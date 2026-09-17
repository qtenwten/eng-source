import type { ProductiveMode } from '../types'

export const readingTexts=[
  {
    id:'reading-small-habits',title:'Small habits beat perfect plans',cefr:'B1',minutes:4,
    text:'People often wait for the perfect moment to start learning, but progress usually comes from small actions repeated consistently. A short session that you actually finish is more useful than an ambitious plan you keep postponing. Over time, those small choices add up and turn into real ability.',
    targets:[['wait for','ждать'],['add up','накапливаться, складываться'],['turn into','превращаться в']],
  },
  {
    id:'reading-problem-solving',title:'How people figure things out',cefr:'B1–B2',minutes:5,
    text:'When a problem first appears, the answer is rarely obvious. People test ideas, notice what went wrong, and gradually figure out what works. The useful part is not avoiding every mistake, but learning how to respond when something does not turn out as expected.',
    targets:[['figure out','разобраться, понять'],['go wrong','пойти не так'],['turn out','оказаться в итоге']],
  },
]

export const listeningClips=[
  {id:'listen-1',cefr:'A2–B1',text:'I was about to leave when he called me back.',translation:'Я уже собирался уходить, когда он перезвонил.',target:'be about to'},
  {id:'listen-2',cefr:'B1',text:'It turned out that we had been talking about the same person.',translation:'Оказалось, что мы говорили об одном и том же человеке.',target:'turn out'},
  {id:'listen-3',cefr:'B1',text:'I eventually figured out why the app was not working.',translation:'В конце концов я понял, почему приложение не работало.',target:'eventually / figure out'},
]

export const productiveTasks:Array<{id:string;mode:ProductiveMode;title:string;prompt:string;targets:string[];repeatAfterDays:number}>=[
  {id:'speak-problem',mode:'speaking',title:'Расскажи о проблеме, которую удалось решить',prompt:'Опиши недавнюю проблему: что произошло, что ты попробовал и чем всё закончилось.',targets:['figure out','eventually','turn out'],repeatAfterDays:3},
  {id:'speak-change',mode:'speaking',title:'Что изменилось за последнее время?',prompt:'Расскажи о привычке или проекте, который изменился за последние недели. Постарайся сравнить прошлое и настоящее.',targets:['used to','now','recently'],repeatAfterDays:4},
  {id:'write-message',mode:'writing',title:'Короткое сообщение другу',prompt:'Напиши 4–6 предложений другу о том, почему планы изменились и что ты собираешься делать вместо этого.',targets:['was supposed to','instead','probably'],repeatAfterDays:3},
]
