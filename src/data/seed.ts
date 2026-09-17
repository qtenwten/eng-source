import type { LearningItem } from '../types'
export const learningItems: LearningItem[] = [
{id:'word-reliable',kind:'word',prompt:'reliable',answer:'reliable',translation:'надёжный',example:'She is one of the most reliable people on the team.',note:'Common collocation: reliable source / reliable person',tags:['B1','people','work']},
{id:'chunk-figure-out',kind:'chunk',prompt:'разобраться / понять',answer:'figure out',translation:'разобраться, понять',example:'I finally figured out how the system works.',note:'Useful chunk: figure out how / why / what',tags:['B1','phrasal verb']},
{id:'chunk-turn-out',kind:'chunk',prompt:'оказаться / выясниться',answer:'turn out',translation:'оказаться, выясниться',example:'It turned out to be much easier than we expected.',tags:['B1','phrasal verb']},
{id:'chunk-take-care',kind:'chunk',prompt:'я этим займусь',answer:"I'll take care of it.",translation:'Я этим займусь.',example:"Don't worry about the booking. I'll take care of it.",tags:['A2','conversation']},
{id:'verb-go',kind:'irregular',prompt:'go → ? → ?',answer:'went → gone',translation:'идти / ехать',example:"I've already gone through the report.",note:'Past Simple: went · Past Participle: gone',tags:['A1','irregular verb']},
{id:'verb-seek',kind:'irregular',prompt:'seek → ? → ?',answer:'sought → sought',translation:'искать, стремиться',example:'They sought advice before making the decision.',tags:['B2','irregular verb']},
{id:'chunk-make-decision',kind:'chunk',prompt:'принять решение',answer:'make a decision',translation:'принять решение',example:'We need to make a decision by Friday.',note:'Not “do a decision”.',tags:['A2','collocation']},
{id:'word-awkward',kind:'word',prompt:'awkward',answer:'awkward',translation:'неловкий / неудобный',example:'There was an awkward silence after the question.',tags:['B1','emotion']},
{id:'chunk-depend-on',kind:'chunk',prompt:'зависеть от',answer:'depend on',translation:'зависеть от',example:'It depends on what you want to achieve.',note:'Common Russian-speaker error: depend from ✕',tags:['A2','preposition','error pattern']}
]
export const todayPlan = [
{id:'new',icon:'✦',title:'Новые слова',subtitle:'5 слов',tone:'blue'},
{id:'review',icon:'↻',title:'Повторение',subtitle:'10 слов',tone:'green'},
{id:'chunks',icon:'◌',title:'Выражения',subtitle:'5 фраз',tone:'purple'},
{id:'verbs',icon:'⚡',title:'Неправильные глаголы',subtitle:'3 глагола',tone:'orange'},
{id:'listening',icon:'◉',title:'Аудирование',subtitle:'3 задания',tone:'red'},
{id:'speaking',icon:'◎',title:'Разговор',subtitle:'5 минут',tone:'cyan'}]
