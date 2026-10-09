import type { LearningItem } from '../types'

export type ConversationPhraseRole = 'question' | 'answer' | 'reaction' | 'polite' | 'survival'
export type ConversationRegister = 'neutral' | 'informal' | 'polite'

export interface ConversationPhrase {
  id: string
  role: ConversationPhraseRole
  english: string
  translation: string
  variants: string[]
  replies: Array<[string,string]>
  note: string
  level: string
  register: ConversationRegister
  example: string
  exampleTranslation: string
}

export interface ConversationCategory {
  id: string
  title: string
  icon: string
  description: string
  phrases: ConversationPhrase[]
}

export const conversationCategories: ConversationCategory[] = [
  {
    "id": "greetings",
    "title": "Приветствие и знакомство",
    "icon": "👋",
    "description": "Начать разговор естественно, без учебникового официоза.",
    "phrases": [
      {
        "id": "hi-how-are-you",
        "role": "question",
        "english": "Hi, how are you?",
        "translation": "Привет, как ты?",
        "variants": [
          "Hey, how are you?",
          "Hi there, how are you?"
        ],
        "replies": [
          [
            "Pretty good, thanks. You?",
            "Довольно хорошо, спасибо. А ты?"
          ],
          [
            "I'm good, thanks. How about you?",
            "Всё хорошо, спасибо. А у тебя?"
          ]
        ],
        "note": "Нейтрально и безопасно почти в любой ситуации.",
        "level": "A1",
        "register": "neutral",
        "example": "Hi, how are you? Nice to meet you.",
        "exampleTranslation": "Привет, как ты? Приятно познакомиться."
      },
      {
        "id": "nice-to-meet-you",
        "role": "reaction",
        "english": "Nice to meet you.",
        "translation": "Приятно познакомиться.",
        "variants": [
          "Great to meet you.",
          "Good to meet you."
        ],
        "replies": [
          [
            "Nice to meet you too.",
            "Мне тоже приятно познакомиться."
          ],
          [
            "Likewise.",
            "Взаимно."
          ]
        ],
        "note": "Likewise короче и чуть взрослее по тону.",
        "level": "A1",
        "register": "neutral",
        "example": "I'm Sam. Nice to meet you.",
        "exampleTranslation": "Я Сэм. Приятно познакомиться."
      },
      {
        "id": "good-to-see-you",
        "role": "reaction",
        "english": "Good to see you.",
        "translation": "Рад тебя видеть.",
        "variants": [
          "Nice to see you.",
          "It's good to see you."
        ],
        "replies": [
          [
            "You too!",
            "Тебя тоже!"
          ],
          [
            "Good to see you too.",
            "Я тоже рад тебя видеть."
          ]
        ],
        "note": "Для человека, которого ты уже знаешь.",
        "level": "A1",
        "register": "neutral",
        "example": "Hey! Good to see you again.",
        "exampleTranslation": "Привет! Рад снова тебя видеть."
      },
      {
        "id": "long-time-no-see",
        "role": "reaction",
        "english": "Long time no see!",
        "translation": "Давно не виделись!",
        "variants": [
          "It's been a while!",
          "Haven't seen you in ages!"
        ],
        "replies": [
          [
            "I know! How have you been?",
            "Точно! Как ты поживал?"
          ],
          [
            "Yeah, it's been ages!",
            "Да, целая вечность!"
          ]
        ],
        "note": "Очень разговорно и естественно при встрече после перерыва.",
        "level": "A2",
        "register": "informal",
        "example": "Long time no see! How have you been?",
        "exampleTranslation": "Давно не виделись! Как ты поживал?"
      },
      {
        "id": "how-have-you-been",
        "role": "question",
        "english": "How have you been?",
        "translation": "Как ты поживал? Как у тебя дела в последнее время?",
        "variants": [
          "How've you been?",
          "How have things been?"
        ],
        "replies": [
          [
            "I've been good, thanks.",
            "Всё было хорошо, спасибо."
          ],
          [
            "Pretty busy, actually.",
            "Вообще-то, довольно занят."
          ]
        ],
        "note": "Обычно спрашивают после того, как какое-то время не виделись.",
        "level": "A2",
        "register": "neutral",
        "example": "It's been a while. How have you been?",
        "exampleTranslation": "Давно не виделись. Как ты поживал?"
      }
    ]
  },
  {
    "id": "how-are-you",
    "title": "Как дела — и как отвечать",
    "icon": "🙂",
    "description": "Самые частые варианты вместо одного вечного “I'm fine”.",
    "phrases": [
      {
        "id": "hows-it-going",
        "role": "question",
        "english": "How's it going?",
        "translation": "Как дела? Как оно?",
        "variants": [
          "How are things?",
          "How's everything?"
        ],
        "replies": [
          [
            "Pretty good, thanks.",
            "Довольно хорошо, спасибо."
          ],
          [
            "Not bad. You?",
            "Неплохо. А ты?"
          ]
        ],
        "note": "Очень частый нейтрально-разговорный вариант.",
        "level": "A1",
        "register": "informal",
        "example": "Hey, how's it going?",
        "exampleTranslation": "Привет, как дела?"
      },
      {
        "id": "hows-your-day-going",
        "role": "question",
        "english": "How's your day going?",
        "translation": "Как проходит твой день?",
        "variants": [
          "How's your day been?",
          "How's your day so far?"
        ],
        "replies": [
          [
            "It's going well, thanks.",
            "Хорошо проходит, спасибо."
          ],
          [
            "Pretty chill so far.",
            "Пока довольно спокойно."
          ]
        ],
        "note": "Хороший вопрос для small talk в течение дня.",
        "level": "A2",
        "register": "neutral",
        "example": "How's your day going so far?",
        "exampleTranslation": "Как твой день проходит до сих пор?"
      },
      {
        "id": "pretty-good-thanks",
        "role": "answer",
        "english": "Pretty good, thanks. You?",
        "translation": "Довольно хорошо, спасибо. А ты?",
        "variants": [
          "I'm good, thanks. How about you?",
          "Doing well, thanks. You?"
        ],
        "replies": [
          [
            "I'm good too.",
            "У меня тоже всё хорошо."
          ],
          [
            "Can't complain.",
            "Не жалуюсь."
          ]
        ],
        "note": "Коротко, естественно и сразу возвращает вопрос собеседнику.",
        "level": "A1",
        "register": "neutral",
        "example": "Pretty good, thanks. You?",
        "exampleTranslation": "Довольно хорошо, спасибо. А ты?"
      },
      {
        "id": "not-bad-just-tired",
        "role": "answer",
        "english": "Not bad, just a bit tired.",
        "translation": "Неплохо, просто немного устал.",
        "variants": [
          "I'm okay, just tired.",
          "Can't complain, just tired."
        ],
        "replies": [
          [
            "Long day?",
            "Долгий день?"
          ],
          [
            "I know the feeling.",
            "Знакомое чувство."
          ]
        ],
        "note": "Полезнее, чем односложное “fine”: даёт собеседнику тему для продолжения.",
        "level": "A2",
        "register": "neutral",
        "example": "Not bad, just a bit tired after work.",
        "exampleTranslation": "Неплохо, просто немного устал после работы."
      },
      {
        "id": "ive-been-better",
        "role": "answer",
        "english": "I've been better, to be honest.",
        "translation": "Бывало и лучше, если честно.",
        "variants": [
          "Could be better.",
          "I've had better days."
        ],
        "replies": [
          [
            "Sorry to hear that.",
            "Жаль это слышать."
          ],
          [
            "Want to talk about it?",
            "Хочешь об этом поговорить?"
          ]
        ],
        "note": "Мягкий способ сказать, что дела не очень.",
        "level": "B1",
        "register": "neutral",
        "example": "I've been better, to be honest, but I'll be okay.",
        "exampleTranslation": "Бывало и лучше, если честно, но всё будет нормально."
      }
    ]
  },
  {
    "id": "recent",
    "title": "Сегодня, недавно, выходные",
    "icon": "🗓",
    "description": "Чтобы не зависать после “How are you?”.",
    "phrases": [
      {
        "id": "what-have-you-been-up-to",
        "role": "question",
        "english": "What have you been up to?",
        "translation": "Чем ты занимался в последнее время?",
        "variants": [
          "What have you been doing lately?",
          "What have you been up to lately?"
        ],
        "replies": [
          [
            "I've been pretty busy with work.",
            "В последнее время я довольно занят работой."
          ],
          [
            "Nothing much, to be honest.",
            "Ничего особенного, если честно."
          ]
        ],
        "note": "Один из самых полезных вопросов после паузы в общении.",
        "level": "A2",
        "register": "informal",
        "example": "So, what have you been up to lately?",
        "exampleTranslation": "Ну, чем ты занимался в последнее время?"
      },
      {
        "id": "what-did-you-do-today",
        "role": "question",
        "english": "What did you do today?",
        "translation": "Что ты сегодня делал?",
        "variants": [
          "What did you get up to today?",
          "How did you spend your day?"
        ],
        "replies": [
          [
            "I mostly worked and then relaxed.",
            "В основном работал, а потом отдыхал."
          ],
          [
            "I just chilled at home.",
            "Я просто отдыхал дома."
          ]
        ],
        "note": "Get up to — разговорный вариант “заниматься чем-то”.",
        "level": "A2",
        "register": "neutral",
        "example": "What did you do today after work?",
        "exampleTranslation": "Что ты сегодня делал после работы?"
      },
      {
        "id": "how-was-your-weekend",
        "role": "question",
        "english": "How was your weekend?",
        "translation": "Как прошли выходные?",
        "variants": [
          "Did you have a good weekend?",
          "How did your weekend go?"
        ],
        "replies": [
          [
            "Pretty good, actually.",
            "Вообще-то, довольно хорошо."
          ],
          [
            "It was really chill.",
            "Было очень спокойно и расслабленно."
          ]
        ],
        "note": "Классический small talk в понедельник или после выходных.",
        "level": "A1",
        "register": "neutral",
        "example": "Morning! How was your weekend?",
        "exampleTranslation": "Доброе утро! Как прошли выходные?"
      },
      {
        "id": "nothing-much",
        "role": "answer",
        "english": "Nothing much, to be honest.",
        "translation": "Ничего особенного, если честно.",
        "variants": [
          "Not much, really.",
          "Nothing special."
        ],
        "replies": [
          [
            "Same here.",
            "У меня так же."
          ],
          [
            "Sometimes that's the best kind of day.",
            "Иногда это лучший вид дня."
          ]
        ],
        "note": "Естественный ответ на “What's up?” и вопросы о недавних делах.",
        "level": "A2",
        "register": "informal",
        "example": "Nothing much, to be honest. I just stayed home.",
        "exampleTranslation": "Ничего особенного, если честно. Я просто остался дома."
      },
      {
        "id": "ive-been-pretty-busy",
        "role": "answer",
        "english": "I've been pretty busy lately.",
        "translation": "В последнее время я довольно занят.",
        "variants": [
          "I've had a lot going on lately.",
          "It's been a busy week."
        ],
        "replies": [
          [
            "Work stuff?",
            "Из-за работы?"
          ],
          [
            "Hopefully you get a break soon.",
            "Надеюсь, скоро получится отдохнуть."
          ]
        ],
        "note": "A lot going on = много всего происходит/много дел.",
        "level": "B1",
        "register": "neutral",
        "example": "I've been pretty busy lately, mostly with work.",
        "exampleTranslation": "В последнее время я довольно занят, в основном работой."
      }
    ]
  },
  {
    "id": "getting-to-know",
    "title": "Знакомство: кто ты и чем занимаешься",
    "icon": "🧩",
    "description": "Имя, работа, интересы, откуда ты и зачем приехал.",
    "phrases": [
      {
        "id": "whats-your-name",
        "role": "question",
        "english": "What's your name?",
        "translation": "Как тебя зовут?",
        "variants": [
          "What should I call you?",
          "And your name is...?"
        ],
        "replies": [
          [
            "I'm Alex.",
            "Я Алекс."
          ],
          [
            "My name's Alex.",
            "Меня зовут Алекс."
          ]
        ],
        "note": "What should I call you? уместно, если имя сложное или есть никнейм.",
        "level": "A1",
        "register": "neutral",
        "example": "Hi, I'm Mia. What's your name?",
        "exampleTranslation": "Привет, я Мия. Как тебя зовут?"
      },
      {
        "id": "what-do-you-do",
        "role": "question",
        "english": "What do you do?",
        "translation": "Чем ты занимаешься? Кем работаешь?",
        "variants": [
          "What do you do for work?",
          "What kind of work do you do?"
        ],
        "replies": [
          [
            "I work as a designer.",
            "Я работаю дизайнером."
          ],
          [
            "I work in media.",
            "Я работаю в медиа."
          ]
        ],
        "note": "В знакомстве чаще всего это вопрос о профессии, а не “что ты сейчас делаешь?”.",
        "level": "A2",
        "register": "neutral",
        "example": "So, what do you do?",
        "exampleTranslation": "Так чем ты занимаешься?"
      },
      {
        "id": "i-work-as-a",
        "role": "answer",
        "english": "I work as a ...",
        "translation": "Я работаю ... / Я работаю в качестве ...",
        "variants": [
          "I'm a ...",
          "I work in ..."
        ],
        "replies": [
          [
            "Oh, nice. How do you like it?",
            "О, здорово. Тебе нравится?"
          ]
        ],
        "note": "После as ставь профессию: I work as a camera operator.",
        "level": "A1",
        "register": "neutral",
        "example": "I work as a camera operator.",
        "exampleTranslation": "Я работаю видеооператором."
      },
      {
        "id": "where-are-you-from",
        "role": "question",
        "english": "Where are you from?",
        "translation": "Ты откуда?",
        "variants": [
          "Where are you originally from?",
          "Where do you come from?"
        ],
        "replies": [
          [
            "I'm from Spain.",
            "Я из Испании."
          ],
          [
            "I'm originally from Spain.",
            "Я родом из Испании."
          ]
        ],
        "note": "Originally удобно, если человек сейчас живёт в другой стране.",
        "level": "A1",
        "register": "neutral",
        "example": "Where are you originally from?",
        "exampleTranslation": "Ты откуда родом?"
      },
      {
        "id": "im-from",
        "role": "answer",
        "english": "I'm from ...",
        "translation": "Я из ...",
        "variants": [
          "I'm originally from ...",
          "I grew up in ..."
        ],
        "replies": [
          [
            "Oh, nice! I've always wanted to go there.",
            "О, здорово! Я всегда хотел туда съездить."
          ]
        ],
        "note": "I grew up in ... = я вырос в ...",
        "level": "A1",
        "register": "neutral",
        "example": "I'm from Berlin, but I live in Prague now.",
        "exampleTranslation": "Я из Берлина, но сейчас живу в Праге."
      },
      {
        "id": "what-are-you-into",
        "role": "question",
        "english": "What are you into?",
        "translation": "Чем ты увлекаешься? Что тебе нравится?",
        "variants": [
          "What are you interested in?",
          "What do you like doing?"
        ],
        "replies": [
          [
            "I'm really into photography.",
            "Я очень увлекаюсь фотографией."
          ],
          [
            "I'm into games and music.",
            "Я увлекаюсь играми и музыкой."
          ]
        ],
        "note": "Informal: be into = сильно интересоваться/увлекаться.",
        "level": "A2",
        "register": "informal",
        "example": "What are you into outside of work?",
        "exampleTranslation": "Чем ты увлекаешься вне работы?"
      },
      {
        "id": "im-really-into",
        "role": "answer",
        "english": "I'm really into ...",
        "translation": "Я очень увлекаюсь ...",
        "variants": [
          "I'm really interested in ...",
          "I'm a big fan of ..."
        ],
        "replies": [
          [
            "Same!",
            "Я тоже!"
          ],
          [
            "How did you get into that?",
            "Как ты этим увлёкся?"
          ]
        ],
        "note": "После into обычно ставим существительное или -ing: I'm into cooking.",
        "level": "A2",
        "register": "informal",
        "example": "I'm really into photography and gaming.",
        "exampleTranslation": "Я очень увлекаюсь фотографией и играми."
      },
      {
        "id": "what-brings-you-here",
        "role": "question",
        "english": "What brings you here?",
        "translation": "Что тебя сюда привело? По какому поводу ты здесь?",
        "variants": [
          "What are you here for?",
          "So, what brings you to town?"
        ],
        "replies": [
          [
            "I'm here for work.",
            "Я здесь по работе."
          ],
          [
            "I'm just visiting.",
            "Я просто приехал в гости/как турист."
          ]
        ],
        "note": "Естественный вопрос на мероприятии, в поездке или новом месте.",
        "level": "B1",
        "register": "neutral",
        "example": "What brings you to Seoul?",
        "exampleTranslation": "Что привело тебя в Сеул?"
      },
      {
        "id": "im-here-for",
        "role": "answer",
        "english": "I'm here for ...",
        "translation": "Я здесь ради ... / Я приехал из-за ...",
        "variants": [
          "I'm here for work.",
          "I'm just here on vacation."
        ],
        "replies": [
          [
            "How long are you staying?",
            "На сколько ты остаёшься?"
          ]
        ],
        "note": "Подставь work, a conference, a competition, vacation и т.д.",
        "level": "A2",
        "register": "neutral",
        "example": "I'm here for a competition.",
        "exampleTranslation": "Я здесь ради соревнования."
      }
    ]
  },
  {
    "id": "flow",
    "title": "Как поддерживать разговор",
    "icon": "↪",
    "description": "Короткие реплики, которые заставляют диалог двигаться дальше.",
    "phrases": [
      {
        "id": "really-how-come",
        "role": "question",
        "english": "Really? How come?",
        "translation": "Правда? А почему так?",
        "variants": [
          "Oh really? Why's that?",
          "Really? What happened?"
        ],
        "replies": [
          [
            "It's a long story.",
            "Это долгая история."
          ],
          [
            "Mostly because of work.",
            "В основном из-за работы."
          ]
        ],
        "note": "How come? = разговорное “почему?”. После него нет инверсии: How come you left?",
        "level": "B1",
        "register": "informal",
        "example": "You don't drink coffee? Really? How come?",
        "exampleTranslation": "Ты не пьёшь кофе? Правда? А почему?"
      },
      {
        "id": "what-was-that-like",
        "role": "question",
        "english": "What was that like?",
        "translation": "И каково это было? Какие впечатления?",
        "variants": [
          "How was that?",
          "What was the experience like?"
        ],
        "replies": [
          [
            "It was amazing.",
            "Это было потрясающе."
          ],
          [
            "Honestly, pretty stressful.",
            "Честно, довольно напряжённо."
          ]
        ],
        "note": "Очень полезный вопрос после рассказа о событии или опыте.",
        "level": "A2",
        "register": "neutral",
        "example": "You lived abroad for a year? What was that like?",
        "exampleTranslation": "Ты год жил за границей? И каково это было?"
      },
      {
        "id": "how-did-that-go",
        "role": "question",
        "english": "How did that go?",
        "translation": "Ну и как всё прошло?",
        "variants": [
          "How did it go?",
          "So, how'd it go?"
        ],
        "replies": [
          [
            "Better than I expected.",
            "Лучше, чем я ожидал."
          ],
          [
            "It went pretty well.",
            "Прошло довольно хорошо."
          ]
        ],
        "note": "How'd = разговорное сокращение How did.",
        "level": "A2",
        "register": "neutral",
        "example": "You had an interview today, right? How did that go?",
        "exampleTranslation": "У тебя сегодня было собеседование, да? Как всё прошло?"
      },
      {
        "id": "tell-me-more",
        "role": "reaction",
        "english": "Tell me more.",
        "translation": "Расскажи подробнее.",
        "variants": [
          "Tell me about it.",
          "Go on."
        ],
        "replies": [
          [
            "Well, basically...",
            "Ну, в общем..."
          ]
        ],
        "note": "Go on = продолжай. Tell me about it иногда ещё значит “и не говори” — зависит от интонации.",
        "level": "A2",
        "register": "neutral",
        "example": "That sounds interesting. Tell me more.",
        "exampleTranslation": "Звучит интересно. Расскажи подробнее."
      },
      {
        "id": "what-do-you-mean",
        "role": "question",
        "english": "What do you mean?",
        "translation": "Что ты имеешь в виду?",
        "variants": [
          "What do you mean by that?",
          "How do you mean?"
        ],
        "replies": [
          [
            "I mean that...",
            "Я имею в виду, что..."
          ]
        ],
        "note": "Нейтральная просьба пояснить мысль.",
        "level": "A2",
        "register": "neutral",
        "example": "What do you mean by 'too late'?",
        "exampleTranslation": "Что ты имеешь в виду под «слишком поздно»?"
      }
    ]
  },
  {
    "id": "opinions",
    "title": "Мнение, согласие и вкусы",
    "icon": "💭",
    "description": "Спросить мнение и ответить без деревянного “I think yes”.",
    "phrases": [
      {
        "id": "what-do-you-think",
        "role": "question",
        "english": "What do you think about it?",
        "translation": "Что ты об этом думаешь?",
        "variants": [
          "What do you think?",
          "How do you feel about it?"
        ],
        "replies": [
          [
            "I think it's pretty good.",
            "Думаю, это довольно неплохо."
          ],
          [
            "I'm not sure yet.",
            "Я пока не уверен."
          ]
        ],
        "note": "How do you feel about it? сильнее спрашивает отношение/ощущение.",
        "level": "A2",
        "register": "neutral",
        "example": "What do you think about the new design?",
        "exampleTranslation": "Что ты думаешь о новом дизайне?"
      },
      {
        "id": "are-you-into",
        "role": "question",
        "english": "Are you into ...?",
        "translation": "Тебе нравится ...? Ты увлекаешься ...?",
        "variants": [
          "Do you like ...?",
          "Are you a fan of ...?"
        ],
        "replies": [
          [
            "Yeah, I'm really into it.",
            "Да, мне это очень нравится."
          ],
          [
            "Not really, to be honest.",
            "Не особо, если честно."
          ]
        ],
        "note": "Разговорный способ спросить про интересы.",
        "level": "A2",
        "register": "informal",
        "example": "Are you into horror movies?",
        "exampleTranslation": "Тебе нравятся фильмы ужасов?"
      },
      {
        "id": "whats-your-take",
        "role": "question",
        "english": "What's your take on it?",
        "translation": "Каково твоё мнение об этом?",
        "variants": [
          "What's your opinion on it?",
          "What do you make of it?"
        ],
        "replies": [
          [
            "I'm still thinking about it.",
            "Я всё ещё обдумываю это."
          ]
        ],
        "note": "What's your take? звучит современно, но чуть более взрослым/деловым тоном.",
        "level": "B1",
        "register": "neutral",
        "example": "What's your take on the new rule?",
        "exampleTranslation": "Каково твоё мнение о новом правиле?"
      },
      {
        "id": "i-think-pretty-good",
        "role": "answer",
        "english": "I think it's pretty good.",
        "translation": "Думаю, это довольно неплохо.",
        "variants": [
          "I actually quite like it.",
          "I think it's really solid."
        ],
        "replies": [
          [
            "Yeah, same.",
            "Да, согласен."
          ],
          [
            "What do you like about it?",
            "Что именно тебе в этом нравится?"
          ]
        ],
        "note": "Solid в разговорной речи = добротный, хороший.",
        "level": "A2",
        "register": "neutral",
        "example": "I think it's pretty good, especially for the price.",
        "exampleTranslation": "Думаю, это довольно неплохо, особенно за такую цену."
      },
      {
        "id": "not-my-thing",
        "role": "answer",
        "english": "It's not really my thing.",
        "translation": "Это не совсем моё.",
        "variants": [
          "I'm not really into it.",
          "It's not for me."
        ],
        "replies": [
          [
            "Fair enough.",
            "Понимаю / справедливо."
          ],
          [
            "What are you into then?",
            "А что тебе тогда нравится?"
          ]
        ],
        "note": "Мягче и естественнее, чем “I don't like it”.",
        "level": "A2",
        "register": "informal",
        "example": "Camping is not really my thing.",
        "exampleTranslation": "Кемпинг — не совсем моё."
      }
    ]
  },
  {
    "id": "clarification",
    "title": "Когда не понял английский",
    "icon": "🛟",
    "description": "Фразы-спасатели, чтобы не выпадать из разговора.",
    "phrases": [
      {
        "id": "didnt-catch-that",
        "role": "survival",
        "english": "Sorry, I didn't catch that.",
        "translation": "Извини, я не расслышал / не понял.",
        "variants": [
          "Sorry, I missed that.",
          "Sorry, I didn't get that."
        ],
        "replies": [
          [
            "No problem, I said...",
            "Без проблем, я сказал..."
          ]
        ],
        "note": "Catch that часто про то, что не расслышал; get that — что не понял смысл.",
        "level": "A2",
        "register": "polite",
        "example": "Sorry, I didn't catch that. What did you say?",
        "exampleTranslation": "Извини, я не расслышал. Что ты сказал?"
      },
      {
        "id": "say-that-again",
        "role": "survival",
        "english": "Could you say that again?",
        "translation": "Можешь повторить?",
        "variants": [
          "Can you say that again?",
          "Could you repeat that?"
        ],
        "replies": [
          [
            "Sure.",
            "Конечно."
          ],
          [
            "Of course.",
            "Конечно."
          ]
        ],
        "note": "Could you — чуть мягче; Can you — полностью нормально в обычной речи.",
        "level": "A1",
        "register": "polite",
        "example": "Could you say that again, please?",
        "exampleTranslation": "Можешь повторить, пожалуйста?"
      },
      {
        "id": "speak-slower",
        "role": "survival",
        "english": "Could you speak a little slower?",
        "translation": "Можешь говорить немного медленнее?",
        "variants": [
          "Can you speak a bit more slowly?",
          "Could you slow down a little?"
        ],
        "replies": [
          [
            "Sure, no problem.",
            "Конечно, без проблем."
          ]
        ],
        "note": "Полезнее, чем делать вид, что всё понял.",
        "level": "A2",
        "register": "polite",
        "example": "Sorry, could you speak a little slower?",
        "exampleTranslation": "Извини, можешь говорить немного медленнее?"
      },
      {
        "id": "what-does-mean",
        "role": "survival",
        "english": "What does ... mean?",
        "translation": "Что значит ...?",
        "variants": [
          "What do you mean by ...?",
          "What does that word mean?"
        ],
        "replies": [
          [
            "It means...",
            "Это значит..."
          ]
        ],
        "note": "Для конкретного слова: What does 'chill' mean?",
        "level": "A1",
        "register": "neutral",
        "example": "What does 'chill' mean here?",
        "exampleTranslation": "Что здесь значит «chill»?"
      },
      {
        "id": "do-you-mean",
        "role": "survival",
        "english": "Do you mean ...?",
        "translation": "Ты имеешь в виду ...?",
        "variants": [
          "So you mean ...?",
          "You mean ...?"
        ],
        "replies": [
          [
            "Exactly.",
            "Именно."
          ],
          [
            "Not exactly.",
            "Не совсем."
          ]
        ],
        "note": "Отличная проверка понимания без перехода на русский.",
        "level": "A2",
        "register": "neutral",
        "example": "Do you mean we should leave now?",
        "exampleTranslation": "Ты имеешь в виду, что нам надо уходить сейчас?"
      }
    ]
  },
  {
    "id": "polite",
    "title": "Просьбы и вежливые ответы",
    "icon": "🤝",
    "description": "Помощь, разрешение, благодарность и спокойные ответы.",
    "phrases": [
      {
        "id": "could-you-help",
        "role": "polite",
        "english": "Could you help me with this?",
        "translation": "Можешь помочь мне с этим?",
        "variants": [
          "Can you help me with this?",
          "Could you give me a hand with this?"
        ],
        "replies": [
          [
            "Sure, what do you need?",
            "Конечно, что тебе нужно?"
          ],
          [
            "Of course.",
            "Конечно."
          ]
        ],
        "note": "Give me a hand = помочь, буквально не переводится.",
        "level": "A2",
        "register": "polite",
        "example": "Could you help me with this for a second?",
        "exampleTranslation": "Можешь помочь мне с этим на секунду?"
      },
      {
        "id": "do-you-mind-if",
        "role": "polite",
        "english": "Do you mind if I ...?",
        "translation": "Ты не против, если я ...?",
        "variants": [
          "Would you mind if I ...?",
          "Is it okay if I ...?"
        ],
        "replies": [
          [
            "Not at all.",
            "Совсем не против."
          ],
          [
            "Go ahead.",
            "Конечно, давай."
          ]
        ],
        "note": "На Do you mind...? ответ Not at all означает “не против”.",
        "level": "B1",
        "register": "polite",
        "example": "Do you mind if I sit here?",
        "exampleTranslation": "Ты не против, если я сяду здесь?"
      },
      {
        "id": "is-it-okay-if",
        "role": "polite",
        "english": "Is it okay if I ...?",
        "translation": "Ничего, если я ...? Можно, если я ...?",
        "variants": [
          "Is it alright if I ...?",
          "Would it be okay if I ...?"
        ],
        "replies": [
          [
            "Sure, go ahead.",
            "Конечно, давай."
          ],
          [
            "I'd rather you didn't.",
            "Я бы предпочёл, чтобы ты этого не делал."
          ]
        ],
        "note": "Очень универсальный способ попросить разрешение.",
        "level": "A2",
        "register": "neutral",
        "example": "Is it okay if I open the window?",
        "exampleTranslation": "Ничего, если я открою окно?"
      },
      {
        "id": "really-appreciate-it",
        "role": "answer",
        "english": "Thanks, I really appreciate it.",
        "translation": "Спасибо, я правда это ценю.",
        "variants": [
          "Thanks, I appreciate it.",
          "I really appreciate your help."
        ],
        "replies": [
          [
            "No problem.",
            "Без проблем."
          ],
          [
            "Anytime.",
            "Обращайся."
          ]
        ],
        "note": "Теплее, чем одно Thanks, но без лишней официальности.",
        "level": "A2",
        "register": "neutral",
        "example": "Thanks, I really appreciate your help.",
        "exampleTranslation": "Спасибо, я правда ценю твою помощь."
      },
      {
        "id": "no-worries",
        "role": "answer",
        "english": "No worries.",
        "translation": "Без проблем. Всё нормально.",
        "variants": [
          "No problem.",
          "You're good."
        ],
        "replies": [
          [
            "Thanks.",
            "Спасибо."
          ]
        ],
        "note": "No worries очень распространено в неформальной речи. You're good = всё нормально, не переживай.",
        "level": "A2",
        "register": "informal",
        "example": "No worries, it happens.",
        "exampleTranslation": "Без проблем, такое бывает."
      }
    ]
  },
  {
    "id": "plans",
    "title": "Планы, встречи и приглашения",
    "icon": "☕",
    "description": "Позвать куда-то, согласиться, перенести и договориться.",
    "phrases": [
      {
        "id": "are-you-free-later",
        "role": "question",
        "english": "Are you free later?",
        "translation": "Ты свободен позже?",
        "variants": [
          "Are you free tonight?",
          "Do you have any plans later?"
        ],
        "replies": [
          [
            "Yeah, I should be.",
            "Да, вроде должен быть свободен."
          ],
          [
            "Not tonight, sorry.",
            "Сегодня вечером нет, извини."
          ]
        ],
        "note": "Should be = скорее всего буду.",
        "level": "A2",
        "register": "neutral",
        "example": "Are you free later this evening?",
        "exampleTranslation": "Ты свободен сегодня вечером попозже?"
      },
      {
        "id": "grab-a-coffee",
        "role": "question",
        "english": "Do you want to grab a coffee?",
        "translation": "Хочешь сходить за кофе / выпить кофе?",
        "variants": [
          "Want to grab a coffee?",
          "Do you fancy a coffee?"
        ],
        "replies": [
          [
            "Sure, sounds good.",
            "Конечно, звучит хорошо."
          ],
          [
            "I'd love to.",
            "С удовольствием."
          ]
        ],
        "note": "Grab a coffee — очень естественное неформальное приглашение.",
        "level": "A2",
        "register": "informal",
        "example": "Do you want to grab a coffee after work?",
        "exampleTranslation": "Хочешь выпить кофе после работы?"
      },
      {
        "id": "hang-out-sometime",
        "role": "question",
        "english": "Want to hang out sometime?",
        "translation": "Хочешь как-нибудь потусоваться / встретиться?",
        "variants": [
          "Do you want to hang out sometime?",
          "We should hang out sometime."
        ],
        "replies": [
          [
            "Yeah, definitely.",
            "Да, определённо."
          ],
          [
            "Sure, I'd be up for that.",
            "Конечно, я бы был за."
          ]
        ],
        "note": "Hang out = проводить время вместе без формального плана.",
        "level": "A2",
        "register": "informal",
        "example": "We should hang out sometime this week.",
        "exampleTranslation": "Нам стоит как-нибудь встретиться на этой неделе."
      },
      {
        "id": "what-are-you-up-to-later",
        "role": "question",
        "english": "What are you up to later?",
        "translation": "Что будешь делать позже?",
        "variants": [
          "What are you doing later?",
          "Got any plans for later?"
        ],
        "replies": [
          [
            "Not much. Why?",
            "Ничего особенного. А что?"
          ],
          [
            "I'm meeting some friends.",
            "Я встречаюсь с друзьями."
          ]
        ],
        "note": "What are you up to? = чем занимаешься / какие планы.",
        "level": "A2",
        "register": "informal",
        "example": "What are you up to later tonight?",
        "exampleTranslation": "Что будешь делать сегодня вечером позже?"
      },
      {
        "id": "im-down",
        "role": "answer",
        "english": "I'm down.",
        "translation": "Я за. Я согласен.",
        "variants": [
          "I'm in.",
          "I'm up for it."
        ],
        "replies": [
          [
            "Great, let's do it.",
            "Отлично, давай."
          ]
        ],
        "note": "Очень разговорно. I'm down = я согласен участвовать.",
        "level": "B1",
        "register": "informal",
        "example": "Pizza tonight? I'm down.",
        "exampleTranslation": "Пицца сегодня вечером? Я за."
      },
      {
        "id": "sounds-good",
        "role": "answer",
        "english": "Sounds good.",
        "translation": "Звучит хорошо. Договорились.",
        "variants": [
          "Works for me.",
          "That works."
        ],
        "replies": [
          [
            "Perfect.",
            "Отлично."
          ],
          [
            "See you then.",
            "Тогда увидимся."
          ]
        ],
        "note": "Works for me особенно удобно при согласовании времени или плана.",
        "level": "A2",
        "register": "neutral",
        "example": "Seven o'clock? Sounds good.",
        "exampleTranslation": "В семь? Договорились."
      },
      {
        "id": "maybe-another-time",
        "role": "answer",
        "english": "I can't today, but maybe another time.",
        "translation": "Сегодня не могу, но, может быть, в другой раз.",
        "variants": [
          "Not today, sorry. Maybe another time.",
          "I'd love to, but I can't today."
        ],
        "replies": [
          [
            "No worries.",
            "Без проблем."
          ],
          [
            "Sure, another time.",
            "Конечно, в другой раз."
          ]
        ],
        "note": "Мягкий отказ без ощущения, что ты отталкиваешь человека.",
        "level": "A2",
        "register": "neutral",
        "example": "I'd love to, but I can't today. Maybe another time?",
        "exampleTranslation": "Я бы с удовольствием, но сегодня не могу. Может, в другой раз?"
      }
    ]
  },
  {
    "id": "reactions",
    "title": "Живые реакции",
    "icon": "⚡",
    "description": "Короткие ответы, чтобы речь не звучала как анкета.",
    "phrases": [
      {
        "id": "thats-awesome",
        "role": "reaction",
        "english": "That's awesome!",
        "translation": "Это круто!",
        "variants": [
          "That's great!",
          "That's amazing!"
        ],
        "replies": [
          [
            "Yeah, I'm really excited.",
            "Да, я очень рад/в предвкушении."
          ]
        ],
        "note": "Awesome — обычное разговорное “круто”, не обязательно “потрясающе” буквально.",
        "level": "A1",
        "register": "informal",
        "example": "You won? That's awesome!",
        "exampleTranslation": "Ты выиграл? Это круто!"
      },
      {
        "id": "that-makes-sense",
        "role": "reaction",
        "english": "That makes sense.",
        "translation": "Это логично / понятно.",
        "variants": [
          "Makes sense.",
          "Yeah, I get that."
        ],
        "replies": [
          [
            "Exactly.",
            "Именно."
          ],
          [
            "Right, that's what I mean.",
            "Да, именно это я имею в виду."
          ]
        ],
        "note": "Makes sense — сверхчастая короткая реакция в разговоре.",
        "level": "A2",
        "register": "neutral",
        "example": "You were tired after the flight? Yeah, that makes sense.",
        "exampleTranslation": "Ты устал после перелёта? Да, это понятно."
      },
      {
        "id": "fair-enough",
        "role": "reaction",
        "english": "Fair enough.",
        "translation": "Понимаю. Справедливо. Ладно, принимается.",
        "variants": [
          "That's fair.",
          "I get that."
        ],
        "replies": [
          [
            "Yeah.",
            "Да."
          ],
          [
            "Exactly.",
            "Именно."
          ]
        ],
        "note": "Не буквальное “достаточно честно”; это спокойное принятие чужой позиции.",
        "level": "B1",
        "register": "informal",
        "example": "You'd rather stay home? Fair enough.",
        "exampleTranslation": "Ты предпочёл бы остаться дома? Понимаю."
      },
      {
        "id": "thats-rough",
        "role": "reaction",
        "english": "That's rough.",
        "translation": "Жёстко. Неприятно. Тяжело.",
        "variants": [
          "That's tough.",
          "That sucks."
        ],
        "replies": [
          [
            "Yeah, it's been a hard week.",
            "Да, неделя была тяжёлая."
          ]
        ],
        "note": "That sucks грубее/разговорнее; That's rough безопаснее.",
        "level": "B1",
        "register": "informal",
        "example": "You lost your phone? That's rough.",
        "exampleTranslation": "Ты потерял телефон? Жёстко."
      },
      {
        "id": "no-way",
        "role": "reaction",
        "english": "No way!",
        "translation": "Да ладно! Не может быть!",
        "variants": [
          "Seriously?",
          "You're kidding!",
          "That's wild!"
        ],
        "replies": [
          [
            "I'm serious!",
            "Я серьёзно!"
          ],
          [
            "I know, right?",
            "Вот именно, да?"
          ]
        ],
        "note": "No way здесь выражает удивление, а не отказ.",
        "level": "A2",
        "register": "informal",
        "example": "You met him in person? No way!",
        "exampleTranslation": "Ты встретил его лично? Да ладно!"
      }
    ]
  },
  {
    "id": "travel",
    "title": "В поездке и в новой компании",
    "icon": "🌍",
    "description": "Разговор с людьми на мероприятии, в путешествии или новом городе.",
    "phrases": [
      {
        "id": "first-time-here",
        "role": "question",
        "english": "Is this your first time here?",
        "translation": "Ты здесь впервые?",
        "variants": [
          "Is it your first time here?",
          "First time here?"
        ],
        "replies": [
          [
            "Yeah, it's my first time.",
            "Да, я здесь впервые."
          ],
          [
            "No, I've been here before.",
            "Нет, я уже здесь бывал."
          ]
        ],
        "note": "First time here? — очень естественный короткий вариант.",
        "level": "A1",
        "register": "neutral",
        "example": "Is this your first time in Korea?",
        "exampleTranslation": "Ты впервые в Корее?"
      },
      {
        "id": "been-here-before",
        "role": "question",
        "english": "Have you been here before?",
        "translation": "Ты уже бывал здесь раньше?",
        "variants": [
          "Have you ever been here before?",
          "Been here before?"
        ],
        "replies": [
          [
            "Yeah, a couple of times.",
            "Да, пару раз."
          ],
          [
            "No, never.",
            "Нет, никогда."
          ]
        ],
        "note": "Have you ever... подчёркивает опыт вообще.",
        "level": "A2",
        "register": "neutral",
        "example": "Have you been to this restaurant before?",
        "exampleTranslation": "Ты уже бывал в этом ресторане?"
      },
      {
        "id": "how-long-staying",
        "role": "question",
        "english": "How long are you staying?",
        "translation": "На сколько ты остаёшься?",
        "variants": [
          "How long are you here for?",
          "How long will you be here?"
        ],
        "replies": [
          [
            "For about two weeks.",
            "Примерно на две недели."
          ],
          [
            "Just a few days.",
            "Всего на несколько дней."
          ]
        ],
        "note": "How long are you here for? очень естественно в поездках.",
        "level": "A2",
        "register": "neutral",
        "example": "How long are you staying in Seoul?",
        "exampleTranslation": "На сколько ты остаёшься в Сеуле?"
      },
      {
        "id": "what-recommend-around-here",
        "role": "question",
        "english": "What do you recommend around here?",
        "translation": "Что посоветуешь поблизости?",
        "variants": [
          "Any places you'd recommend?",
          "What's worth checking out around here?"
        ],
        "replies": [
          [
            "There's a great place nearby.",
            "Тут рядом есть отличное место."
          ],
          [
            "You should check out the old town.",
            "Тебе стоит посмотреть старый город."
          ]
        ],
        "note": "Worth checking out = стоит посмотреть/зайти.",
        "level": "B1",
        "register": "neutral",
        "example": "Any restaurants you'd recommend around here?",
        "exampleTranslation": "Посоветуешь какие-нибудь рестораны поблизости?"
      },
      {
        "id": "here-for-couple-weeks",
        "role": "answer",
        "english": "I'm here for a couple of weeks.",
        "translation": "Я здесь на пару недель.",
        "variants": [
          "I'm staying for about two weeks.",
          "I'll be here for two weeks."
        ],
        "replies": [
          [
            "Nice, plenty of time to explore.",
            "Здорово, времени на прогулки достаточно."
          ]
        ],
        "note": "A couple of обычно означает примерно два.",
        "level": "A2",
        "register": "neutral",
        "example": "I'm here for a couple of weeks, so I want to explore.",
        "exampleTranslation": "Я здесь на пару недель, поэтому хочу всё посмотреть."
      }
    ]
  },
  {
    "id": "goodbye",
    "title": "Закончить разговор нормально",
    "icon": "👋",
    "description": "Не исчезать после awkward silence.",
    "phrases": [
      {
        "id": "nice-talking-to-you",
        "role": "polite",
        "english": "It was nice talking to you.",
        "translation": "Было приятно с тобой поговорить.",
        "variants": [
          "Nice talking to you.",
          "It was great talking to you."
        ],
        "replies": [
          [
            "You too.",
            "Мне тоже."
          ],
          [
            "Likewise.",
            "Взаимно."
          ]
        ],
        "note": "Очень естественный способ мягко завершить новый разговор.",
        "level": "A1",
        "register": "neutral",
        "example": "It was nice talking to you. Maybe I'll see you around.",
        "exampleTranslation": "Было приятно поговорить. Может, ещё увидимся."
      },
      {
        "id": "should-get-going",
        "role": "polite",
        "english": "I should get going.",
        "translation": "Мне уже пора.",
        "variants": [
          "I should probably get going.",
          "I have to get going."
        ],
        "replies": [
          [
            "Sure, see you later.",
            "Конечно, увидимся позже."
          ]
        ],
        "note": "Мягче, чем просто “I have to go”.",
        "level": "A2",
        "register": "neutral",
        "example": "It's getting late, so I should get going.",
        "exampleTranslation": "Уже поздновато, так что мне пора."
      },
      {
        "id": "see-you-around",
        "role": "polite",
        "english": "See you around.",
        "translation": "Ещё увидимся.",
        "variants": [
          "See you later.",
          "See you soon."
        ],
        "replies": [
          [
            "See you!",
            "Увидимся!"
          ]
        ],
        "note": "See you around не обещает конкретную следующую встречу.",
        "level": "A1",
        "register": "informal",
        "example": "Alright, see you around!",
        "exampleTranslation": "Ладно, ещё увидимся!"
      },
      {
        "id": "catch-you-later",
        "role": "polite",
        "english": "Catch you later.",
        "translation": "Увидимся позже.",
        "variants": [
          "Catch you soon.",
          "Talk to you later."
        ],
        "replies": [
          [
            "Later!",
            "Давай! / До встречи!"
          ]
        ],
        "note": "Разговорный дружеский вариант.",
        "level": "A2",
        "register": "informal",
        "example": "I've got to run. Catch you later.",
        "exampleTranslation": "Мне надо бежать. Увидимся позже."
      },
      {
        "id": "have-a-good-one",
        "role": "polite",
        "english": "Have a good one!",
        "translation": "Хорошего дня! Всего хорошего!",
        "variants": [
          "Have a good day!",
          "Have a great one!"
        ],
        "replies": [
          [
            "You too!",
            "Тебе тоже!"
          ]
        ],
        "note": "One = день/вечер и т.п. Очень обычное дружелюбное прощание.",
        "level": "A2",
        "register": "informal",
        "example": "Thanks for your help. Have a good one!",
        "exampleTranslation": "Спасибо за помощь. Всего хорошего!"
      }
    ]
  }
]

export const conversationPhraseItems: LearningItem[] = conversationCategories.flatMap(category =>
  category.phrases.map(phrase => ({
    id: `conversation:${phrase.id}`,
    kind: 'chunk' as const,
    prompt: phrase.translation,
    answer: phrase.english,
    acceptedAnswers: phrase.variants,
    translation: phrase.translation,
    example: phrase.example,
    exampleTranslation: phrase.exampleTranslation,
    note: phrase.variants.length
      ? `Ещё естественно: ${phrase.variants.join(' · ')}. ${phrase.note}`
      : phrase.note,
    tags: [phrase.level,'conversation','conversation-core',category.id,phrase.role,phrase.register],
  }))
)
