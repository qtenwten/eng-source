import { coreLexicon } from './coreLexicon'
import { extendedLexicon } from './extendedLexicon'
import { irregularVerbItems } from './irregularVerbs'

export const learningItems = [...coreLexicon,...extendedLexicon,...irregularVerbItems]

export const todayPlan = [
  {id:'new',icon:'✦',title:'Новое',subtitle:'адаптивная очередь',tone:'blue'},
  {id:'review',icon:'↻',title:'Повторение',subtitle:'по расписанию',tone:'green'},
  {id:'chunks',icon:'◌',title:'Выражения',subtitle:'фразы и сочетания',tone:'purple'},
  {id:'verbs',icon:'⚡',title:'Неправильные глаголы',subtitle:'таблица → изучение → тест V2/V3',tone:'orange'},
  {id:'listening',icon:'◉',title:'Аудирование',subtitle:'сначала слушаем',tone:'red'},
  {id:'speaking',icon:'◎',title:'Говорение и письмо',subtitle:'повторяем продуктивные задачи',tone:'cyan'},
]
