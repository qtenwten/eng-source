import { coreLexicon } from './coreLexicon'
import { extendedLexicon } from './extendedLexicon'
import { lexiconA1 } from './lexiconA1'
import { lexiconA2 } from './lexiconA2'
import { lexiconB1 } from './lexiconB1'
import { lexiconB2 } from './lexiconB2'
import { irregularVerbItems } from './irregularVerbs'

export const learningItems = [
  ...coreLexicon,
  ...extendedLexicon,
  ...lexiconA1,
  ...lexiconA2,
  ...lexiconB1,
  ...lexiconB2,
  ...irregularVerbItems,
]

export const todayPlan = [
  {id:'new',icon:'✦',title:'Новое',subtitle:'адаптивная очередь',tone:'blue'},
  {id:'review',icon:'↻',title:'Повторение',subtitle:'по расписанию',tone:'green'},
  {id:'chunks',icon:'◌',title:'Выражения',subtitle:'фразы и сочетания',tone:'purple'},
  {id:'verbs',icon:'⚡',title:'Неправильные глаголы',subtitle:'таблица → изучение → тест V2/V3',tone:'orange'},
  {id:'listening',icon:'◉',title:'Аудирование',subtitle:'сначала слушаем',tone:'red'},
  {id:'speaking',icon:'◎',title:'Говорение и письмо',subtitle:'повторяем продуктивные задачи',tone:'cyan'},
]
