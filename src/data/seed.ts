import type { LearningItem } from '../types'

export const learningItems: LearningItem[] = [
  {id:'word-reliable',kind:'word',prompt:'надёжный',answer:'reliable',translation:'надёжный',example:'She is one of the most reliable people on the team.',exampleTranslation:'Она — один из самых надёжных людей в команде.',note:'Частые сочетания: reliable source — надёжный источник; reliable person — надёжный человек.',tags:['B1','people','work']},
  {id:'chunk-figure-out',kind:'chunk',prompt:'разобраться / понять',answer:'figure out',translation:'разобраться, понять',example:'I finally figured out how the system works.',exampleTranslation:'Я наконец разобрался, как работает система.',note:'Полезная модель: figure out how / why / what — разобраться, как / почему / что.',tags:['B1','phrasal verb']},
  {id:'chunk-turn-out',kind:'chunk',prompt:'оказаться / выясниться',answer:'turn out',translation:'оказаться, выясниться',example:'It turned out to be much easier than we expected.',exampleTranslation:'Оказалось, что это намного проще, чем мы ожидали.',tags:['B1','phrasal verb']},
  {id:'chunk-take-care',kind:'chunk',prompt:'я этим займусь',answer:"I'll take care of it.",translation:'Я этим займусь.',example:"Don't worry about the booking. I'll take care of it.",exampleTranslation:'Не переживай насчёт бронирования. Я этим займусь.',tags:['A2','conversation']},
  {id:'verb-go',kind:'irregular',prompt:'go',answer:'went → gone',translation:'идти / ехать',example:"She's already gone home.",exampleTranslation:'Она уже ушла домой.',irregularForms:{base:'go',past:'went',participle:'gone'},note:'V2 используется в Past Simple; V3 — в Perfect временах и пассиве.',tags:['A1','irregular verb']},
  {id:'verb-seek',kind:'irregular',prompt:'seek',answer:'sought → sought',translation:'искать, стремиться',example:'They sought advice before making the decision.',exampleTranslation:'Они обратились за советом перед тем, как принять решение.',irregularForms:{base:'seek',past:'sought',participle:'sought'},note:'У seek формы V2 и V3 совпадают: sought.',tags:['B2','irregular verb']},
  {id:'chunk-make-decision',kind:'chunk',prompt:'принять решение',answer:'make a decision',translation:'принять решение',example:'We need to make a decision by Friday.',exampleTranslation:'Нам нужно принять решение к пятнице.',note:'По-английски говорят make a decision, а не do a decision.',tags:['A2','collocation','work']},
  {id:'word-awkward',kind:'word',prompt:'неловкий / неудобный',answer:'awkward',translation:'неловкий / неудобный',example:'There was an awkward silence after the question.',exampleTranslation:'После вопроса повисло неловкое молчание.',tags:['B1','emotion']},
  {id:'chunk-depend-on',kind:'chunk',prompt:'зависеть от',answer:'depend on',translation:'зависеть от',example:'It depends on what you want to achieve.',exampleTranslation:'Это зависит от того, чего ты хочешь достичь.',note:'Частая ошибка русскоязычных: depend from ✕. Правильно: depend on.',tags:['A2','preposition','error pattern']},
  {id:'word-eventually',kind:'word',prompt:'в конце концов / со временем',answer:'eventually',translation:'в конце концов, со временем',example:'I eventually figured out what was causing the problem.',exampleTranslation:'В конце концов я разобрался, что было причиной проблемы.',tags:['B1','conversation']},
  {id:'chunk-used-to',kind:'chunk',prompt:'раньше обычно / раньше было так',answer:'used to',translation:'раньше обычно; раньше было так',example:'I used to work late, but now I finish earlier.',exampleTranslation:'Раньше я работал допоздна, но теперь заканчиваю раньше.',note:'used to + начальная форма глагола описывает прошлую привычку или состояние, которых сейчас уже нет.',tags:['A2','grammar pattern','conversation']},
  {id:'word-recently',kind:'word',prompt:'недавно / в последнее время',answer:'recently',translation:'недавно, в последнее время',example:"I've been reading more in English recently.",exampleTranslation:'В последнее время я стал больше читать на английском.',tags:['A2','conversation']},
  {id:'chunk-supposed-to',kind:'chunk',prompt:'должен был / предполагалось',answer:'was supposed to',translation:'должен был; предполагалось',example:'I was supposed to call him, but the plan changed.',exampleTranslation:'Я должен был ему позвонить, но план изменился.',tags:['B1','grammar pattern','conversation']},
  {id:'word-instead',kind:'word',prompt:'вместо этого',answer:'instead',translation:'вместо этого',example:'The café was closed, so we went somewhere else instead.',exampleTranslation:'Кафе было закрыто, поэтому вместо этого мы пошли в другое место.',tags:['A2','conversation']},
  {id:'word-probably',kind:'word',prompt:'вероятно / скорее всего',answer:'probably',translation:'вероятно, скорее всего',example:"I'll probably stay home tonight.",exampleTranslation:'Скорее всего, сегодня вечером я останусь дома.',tags:['A2','conversation']},
]

export const todayPlan = [
  {id:'new',icon:'✦',title:'Новое',subtitle:'адаптивная очередь',tone:'blue'},
  {id:'review',icon:'↻',title:'Повторение',subtitle:'по расписанию',tone:'green'},
  {id:'chunks',icon:'◌',title:'Выражения',subtitle:'фразы и сочетания',tone:'purple'},
  {id:'verbs',icon:'⚡',title:'Неправильные глаголы',subtitle:'V1 · V2 · V3 в контексте',tone:'orange'},
  {id:'listening',icon:'◉',title:'Аудирование',subtitle:'сначала слушаем',tone:'red'},
  {id:'speaking',icon:'◎',title:'Говорение и письмо',subtitle:'повторяем продуктивные задачи',tone:'cyan'},
]
