export type ReadingCountry='US'|'UK'|'UK/US'

export interface ReadingEntry{
  id:string
  grade:number
  cefr:string
  country:ReadingCountry
  work:string
  author:string
  title:string
  minutes:number
  text:string
  translation:string
  glossary:Array<[string,string]>
}

export interface ReadingGrade{
  grade:number
  cefr:string
  work:string
  author:string
  country:ReadingCountry
  description:string
}

export const readingGrades:ReadingGrade[]=[
  {
    "grade": 1,
    "cefr": "A1",
    "work": "Aesop’s Fables",
    "author": "Aesop (traditional)",
    "country": "UK/US",
    "description": "Очень короткие басни, базовые глаголы и понятные моральные ситуации."
  },
  {
    "grade": 2,
    "cefr": "A1–A2",
    "work": "The Tale of Peter Rabbit",
    "author": "Beatrix Potter",
    "country": "UK",
    "description": "Простое повествование, действия в последовательности и первые фразовые глаголы."
  },
  {
    "grade": 3,
    "cefr": "A2–B1",
    "work": "The Wonderful Wizard of Oz",
    "author": "L. Frank Baum",
    "country": "US",
    "description": "Приключенческий сюжет, больше связок, описаний и устойчивых выражений."
  },
  {
    "grade": 4,
    "cefr": "B1",
    "work": "Alice’s Adventures in Wonderland",
    "author": "Lewis Carroll",
    "country": "UK",
    "description": "Более необычная лексика, логика диалога и английские речевые обороты."
  },
  {
    "grade": 5,
    "cefr": "B1–B2",
    "work": "The Secret Garden",
    "author": "Frances Hodgson Burnett",
    "country": "UK",
    "description": "Психология персонажей, причинно-следственные связи и более длинные предложения."
  },
  {
    "grade": 6,
    "cefr": "B1–B2",
    "work": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "country": "US",
    "description": "Живая американская классика: юмор, решения персонажей и разговорные конструкции."
  },
  {
    "grade": 7,
    "cefr": "B2",
    "work": "Treasure Island",
    "author": "Robert Louis Stevenson",
    "country": "UK",
    "description": "Приключенческая проза, сложнее синтаксис и больше идиоматических сочетаний."
  },
  {
    "grade": 8,
    "cefr": "B2–C1",
    "work": "Little Women",
    "author": "Louisa May Alcott",
    "country": "US",
    "description": "Абстрактные темы, эмоции, мотивация и аргументация."
  },
  {
    "grade": 9,
    "cefr": "B2–C1",
    "work": "The Call of the Wild",
    "author": "Jack London",
    "country": "US",
    "description": "Плотная проза, интерпретация мотивов и более академическая лексика."
  },
  {
    "grade": 10,
    "cefr": "C1",
    "work": "Great Expectations",
    "author": "Charles Dickens",
    "country": "UK",
    "description": "Сложные идеи, социальная лексика, длинный синтаксис и почти литературный уровень."
  }
]

export const readingLibrary:ReadingEntry[]=[
  {
    "id": "g1-lion-mouse",
    "grade": 1,
    "cefr": "A1",
    "country": "UK/US",
    "work": "Aesop’s Fables",
    "author": "Aesop (traditional)",
    "title": "The Lion and the Mouse",
    "minutes": 2,
    "text": "A lion is sleeping in the sun. A little mouse runs over his paw. The lion catches the mouse, but he lets it go. Later, the mouse helps the lion escape from a net. The lion learns that a small friend can give great help.",
    "translation": "Лев спит на солнце. Маленькая мышь пробегает по его лапе. Лев ловит мышь, но отпускает её. Позже мышь помогает льву выбраться из сети. Лев понимает, что маленький друг может оказать большую помощь.",
    "glossary": [
      [
        "let it go",
        "отпустить"
      ],
      [
        "later",
        "позже"
      ],
      [
        "escape",
        "выбраться, сбежать"
      ],
      [
        "net",
        "сеть"
      ],
      [
        "great help",
        "большая помощь"
      ]
    ]
  },
  {
    "id": "g1-tortoise-hare",
    "grade": 1,
    "cefr": "A1",
    "country": "UK/US",
    "work": "Aesop’s Fables",
    "author": "Aesop (traditional)",
    "title": "The Tortoise and the Hare",
    "minutes": 2,
    "text": "A hare laughs at a slow tortoise. They decide to have a race. The hare runs fast and then stops to sleep. The tortoise keeps walking. He reaches the finish first. Slow and steady can win.",
    "translation": "Заяц смеётся над медленной черепахой. Они решают устроить гонку. Заяц быстро бежит, а потом останавливается поспать. Черепаха продолжает идти. Она первой приходит к финишу. Медленно, но упорно — тоже путь к победе.",
    "glossary": [
      [
        "laugh at",
        "смеяться над"
      ],
      [
        "have a race",
        "устроить гонку"
      ],
      [
        "keep walking",
        "продолжать идти"
      ],
      [
        "finish",
        "финиш"
      ],
      [
        "slow and steady",
        "медленно, но упорно"
      ]
    ]
  },
  {
    "id": "g1-boy-wolf",
    "grade": 1,
    "cefr": "A1",
    "country": "UK/US",
    "work": "Aesop’s Fables",
    "author": "Aesop (traditional)",
    "title": "The Boy Who Cried Wolf",
    "minutes": 2,
    "text": "A boy watches sheep near a village. He is bored and cries, “Wolf!” The people run to help, but there is no wolf. He does it again. One day a real wolf comes. The boy cries for help, but nobody believes him.",
    "translation": "Мальчик пасёт овец возле деревни. Ему скучно, и он кричит: «Волк!» Люди бегут на помощь, но волка нет. Он делает это снова. Однажды приходит настоящий волк. Мальчик зовёт на помощь, но ему уже никто не верит.",
    "glossary": [
      [
        "watch sheep",
        "пасти овец"
      ],
      [
        "be bored",
        "скучать"
      ],
      [
        "cry for help",
        "звать на помощь"
      ],
      [
        "real",
        "настоящий"
      ],
      [
        "believe",
        "верить"
      ]
    ]
  },
  {
    "id": "g1-fox-grapes",
    "grade": 1,
    "cefr": "A1",
    "country": "UK/US",
    "work": "Aesop’s Fables",
    "author": "Aesop (traditional)",
    "title": "The Fox and the Grapes",
    "minutes": 2,
    "text": "A hungry fox sees grapes high on a vine. He jumps again and again, but he cannot reach them. At last he walks away. “Those grapes are probably sour,” he says. It is easy to dislike what we cannot get.",
    "translation": "Голодная лиса видит виноград высоко на лозе. Она прыгает снова и снова, но не может достать ягоды. Наконец она уходит. «Наверное, этот виноград кислый», — говорит она. Легко не любить то, чего не можешь получить.",
    "glossary": [
      [
        "hungry",
        "голодный"
      ],
      [
        "again and again",
        "снова и снова"
      ],
      [
        "reach",
        "достать"
      ],
      [
        "walk away",
        "уйти"
      ],
      [
        "sour",
        "кислый"
      ]
    ]
  },
  {
    "id": "g1-ant-grasshopper",
    "grade": 1,
    "cefr": "A1",
    "country": "UK/US",
    "work": "Aesop’s Fables",
    "author": "Aesop (traditional)",
    "title": "The Ant and the Grasshopper",
    "minutes": 2,
    "text": "All summer, an ant carries food home. A grasshopper sings and plays. In winter, the grasshopper has nothing to eat. The ant has food because she worked before the cold came. Work today can help tomorrow.",
    "translation": "Всё лето муравей носит еду домой. Кузнечик поёт и играет. Зимой кузнечику нечего есть. У муравья есть еда, потому что он работал до наступления холода. Работа сегодня может помочь завтра.",
    "glossary": [
      [
        "all summer",
        "всё лето"
      ],
      [
        "carry",
        "нести"
      ],
      [
        "nothing to eat",
        "нечего есть"
      ],
      [
        "before",
        "до того как"
      ],
      [
        "tomorrow",
        "завтра"
      ]
    ]
  },
  {
    "id": "g1-dog-shadow",
    "grade": 1,
    "cefr": "A1",
    "country": "UK/US",
    "work": "Aesop’s Fables",
    "author": "Aesop (traditional)",
    "title": "The Dog and His Shadow",
    "minutes": 2,
    "text": "A dog has a piece of meat in his mouth. He looks into the water and sees his own shadow. He thinks another dog has more meat. He opens his mouth to take it. His own meat falls into the water.",
    "translation": "У собаки во рту кусок мяса. Она смотрит в воду и видит собственную тень. Собака думает, что у другой собаки мяса больше. Она открывает рот, чтобы забрать его. Её собственный кусок падает в воду.",
    "glossary": [
      [
        "piece of meat",
        "кусок мяса"
      ],
      [
        "shadow",
        "тень"
      ],
      [
        "another",
        "другой"
      ],
      [
        "open his mouth",
        "открыть рот"
      ],
      [
        "fall into",
        "упасть в"
      ]
    ]
  },
  {
    "id": "g1-town-country-mouse",
    "grade": 1,
    "cefr": "A1",
    "country": "UK/US",
    "work": "Aesop’s Fables",
    "author": "Aesop (traditional)",
    "title": "The Town Mouse and the Country Mouse",
    "minutes": 2,
    "text": "A town mouse visits his cousin in the country. The food is simple, but the house is quiet. Then the country mouse visits the town. There is wonderful food, but cats and people frighten him. He chooses the quiet life.",
    "translation": "Городская мышь навещает двоюродного брата в деревне. Еда простая, зато в доме тихо. Потом деревенская мышь приезжает в город. Там замечательная еда, но кошки и люди пугают её. Она выбирает спокойную жизнь.",
    "glossary": [
      [
        "visit",
        "навещать"
      ],
      [
        "simple",
        "простой"
      ],
      [
        "quiet",
        "тихий, спокойный"
      ],
      [
        "frighten",
        "пугать"
      ],
      [
        "choose",
        "выбирать"
      ]
    ]
  },
  {
    "id": "g1-crow-pitcher",
    "grade": 1,
    "cefr": "A1",
    "country": "UK/US",
    "work": "Aesop’s Fables",
    "author": "Aesop (traditional)",
    "title": "The Crow and the Pitcher",
    "minutes": 2,
    "text": "A thirsty crow finds a pitcher with a little water inside. Her beak cannot reach the water. She drops small stones into the pitcher. The water slowly rises. Soon the crow can drink.",
    "translation": "Жаждущая ворона находит кувшин, в котором немного воды. Её клюв не достаёт до воды. Она бросает в кувшин маленькие камни. Вода медленно поднимается. Вскоре ворона может напиться.",
    "glossary": [
      [
        "thirsty",
        "испытывающий жажду"
      ],
      [
        "pitcher",
        "кувшин"
      ],
      [
        "beak",
        "клюв"
      ],
      [
        "drop",
        "бросать"
      ],
      [
        "rise",
        "подниматься"
      ]
    ]
  },
  {
    "id": "g1-golden-eggs",
    "grade": 1,
    "cefr": "A1",
    "country": "UK/US",
    "work": "Aesop’s Fables",
    "author": "Aesop (traditional)",
    "title": "The Goose with the Golden Eggs",
    "minutes": 2,
    "text": "A farmer has a goose that lays one golden egg every day. He becomes greedy. He wants all the gold at once. He kills the goose, but finds no treasure inside. Now he has no goose and no golden eggs.",
    "translation": "У фермера есть гусыня, которая каждый день несёт одно золотое яйцо. Он становится жадным. Он хочет получить всё золото сразу. Он убивает гусыню, но не находит внутри сокровища. Теперь у него нет ни гусыни, ни золотых яиц.",
    "glossary": [
      [
        "lay an egg",
        "нести яйцо"
      ],
      [
        "greedy",
        "жадный"
      ],
      [
        "at once",
        "сразу"
      ],
      [
        "treasure",
        "сокровище"
      ],
      [
        "inside",
        "внутри"
      ]
    ]
  },
  {
    "id": "g1-wind-sun",
    "grade": 1,
    "cefr": "A1",
    "country": "UK/US",
    "work": "Aesop’s Fables",
    "author": "Aesop (traditional)",
    "title": "The North Wind and the Sun",
    "minutes": 2,
    "text": "The wind and the sun see a man in a coat. They want to know who is stronger. The wind blows hard, but the man holds his coat tighter. Then the sun shines warmly. The man gets hot and takes off his coat.",
    "translation": "Ветер и солнце видят человека в пальто. Они хотят узнать, кто сильнее. Ветер дует сильно, но человек плотнее запахивает пальто. Затем солнце светит тепло. Человеку становится жарко, и он снимает пальто.",
    "glossary": [
      [
        "stronger",
        "сильнее"
      ],
      [
        "blow hard",
        "сильно дуть"
      ],
      [
        "hold tighter",
        "держать крепче"
      ],
      [
        "shine",
        "светить"
      ],
      [
        "take off",
        "снять"
      ]
    ]
  },
  {
    "id": "g2-four-rabbits",
    "grade": 2,
    "cefr": "A1",
    "country": "UK",
    "work": "The Tale of Peter Rabbit",
    "author": "Beatrix Potter",
    "title": "Four Little Rabbits",
    "minutes": 3,
    "text": "Four young rabbits live with their mother under a big fir tree. Their names are Flopsy, Mopsy, Cotton-tail, and Peter. One morning their mother tells them to play in the fields, but she gives one clear warning: they must not go into Mr. McGregor’s garden.",
    "translation": "Четыре маленьких кролика живут с мамой под большой елью. Их зовут Флопси, Мопси, Коттонтейл и Питер. Однажды утром мама разрешает им поиграть в полях, но даёт одно ясное предупреждение: им нельзя заходить в сад мистера Макгрегора.",
    "glossary": [
      [
        "young",
        "маленький, молодой"
      ],
      [
        "fir tree",
        "ель"
      ],
      [
        "one morning",
        "однажды утром"
      ],
      [
        "warning",
        "предупреждение"
      ],
      [
        "must not",
        "нельзя"
      ]
    ]
  },
  {
    "id": "g2-mothers-warning",
    "grade": 2,
    "cefr": "A1",
    "country": "UK",
    "work": "The Tale of Peter Rabbit",
    "author": "Beatrix Potter",
    "title": "Mother’s Warning",
    "minutes": 3,
    "text": "Mrs. Rabbit goes to the baker. Before she leaves, she reminds the children that their father once had trouble in Mr. McGregor’s garden. Flopsy, Mopsy, and Cotton-tail listen carefully. Peter, however, is already thinking about the forbidden garden.",
    "translation": "Миссис Кролик идёт к пекарю. Перед уходом она напоминает детям, что их отец однажды попал в беду в саду мистера Макгрегора. Флопси, Мопси и Коттонтейл внимательно слушают. Питер, однако, уже думает о запретном саде.",
    "glossary": [
      [
        "before she leaves",
        "перед тем как уйти"
      ],
      [
        "remind",
        "напоминать"
      ],
      [
        "have trouble",
        "попасть в беду"
      ],
      [
        "carefully",
        "внимательно"
      ],
      [
        "however",
        "однако"
      ]
    ]
  },
  {
    "id": "g2-garden",
    "grade": 2,
    "cefr": "A1–A2",
    "country": "UK",
    "work": "The Tale of Peter Rabbit",
    "author": "Beatrix Potter",
    "title": "Into the Garden",
    "minutes": 3,
    "text": "Peter runs straight to Mr. McGregor’s garden. He squeezes under the gate and finds rows of vegetables. At first everything seems wonderful. He eats lettuce, beans, and radishes until his stomach begins to feel too full.",
    "translation": "Питер бежит прямо в сад мистера Макгрегора. Он протискивается под воротами и видит ряды овощей. Сначала всё кажется прекрасным. Он ест салат, фасоль и редис, пока живот не начинает казаться слишком полным.",
    "glossary": [
      [
        "straight to",
        "прямо к"
      ],
      [
        "squeeze under",
        "протиснуться под"
      ],
      [
        "rows of",
        "ряды"
      ],
      [
        "at first",
        "сначала"
      ],
      [
        "too full",
        "слишком полный"
      ]
    ]
  },
  {
    "id": "g2-farmer",
    "grade": 2,
    "cefr": "A1–A2",
    "country": "UK",
    "work": "The Tale of Peter Rabbit",
    "author": "Beatrix Potter",
    "title": "The Farmer Sees Peter",
    "minutes": 3,
    "text": "Suddenly Peter hears a shout. Mr. McGregor has seen him near the vegetables. Peter turns and runs as fast as he can. The farmer follows with a rake. Peter is frightened and cannot remember where the gate is.",
    "translation": "Вдруг Питер слышит крик. Мистер Макгрегор замечает его возле овощей. Питер разворачивается и бежит так быстро, как только может. Фермер преследует его с граблями. Питер напуган и не может вспомнить, где ворота.",
    "glossary": [
      [
        "suddenly",
        "вдруг"
      ],
      [
        "as fast as he can",
        "так быстро, как только может"
      ],
      [
        "follow",
        "преследовать, идти за"
      ],
      [
        "frightened",
        "испуганный"
      ],
      [
        "remember",
        "вспоминать"
      ]
    ]
  },
  {
    "id": "g2-lost-shoes",
    "grade": 2,
    "cefr": "A2",
    "country": "UK",
    "work": "The Tale of Peter Rabbit",
    "author": "Beatrix Potter",
    "title": "Two Lost Shoes",
    "minutes": 3,
    "text": "Peter rushes through the plants and loses one shoe among the cabbages. A moment later, the other shoe comes off near the potatoes. Without his shoes, he can run faster, but now his blue jacket gets caught in a net.",
    "translation": "Питер мчится между растениями и теряет один ботинок среди капусты. Через мгновение второй ботинок слетает возле картофеля. Без обуви он может бежать быстрее, но теперь его синяя куртка цепляется за сетку.",
    "glossary": [
      [
        "rush through",
        "мчаться через"
      ],
      [
        "a moment later",
        "через мгновение"
      ],
      [
        "come off",
        "слететь, сняться"
      ],
      [
        "get caught",
        "зацепиться"
      ],
      [
        "net",
        "сетка"
      ]
    ]
  },
  {
    "id": "g2-sparrows",
    "grade": 2,
    "cefr": "A2",
    "country": "UK",
    "work": "The Tale of Peter Rabbit",
    "author": "Beatrix Potter",
    "title": "The Sparrows Help",
    "minutes": 3,
    "text": "Peter thinks he is trapped. Some friendly sparrows fly down and encourage him not to give up. He slips out of the jacket just before Mr. McGregor reaches him. Peter escapes again, but he is tired and wet.",
    "translation": "Питер думает, что попался. Несколько дружелюбных воробьёв слетают вниз и убеждают его не сдаваться. Он выскальзывает из куртки прямо перед тем, как к нему подходит мистер Макгрегор. Питер снова спасается, но он устал и промок.",
    "glossary": [
      [
        "be trapped",
        "оказаться в ловушке"
      ],
      [
        "encourage",
        "подбадривать"
      ],
      [
        "give up",
        "сдаваться"
      ],
      [
        "slip out of",
        "выскользнуть из"
      ],
      [
        "just before",
        "прямо перед"
      ]
    ]
  },
  {
    "id": "g2-watering-can",
    "grade": 2,
    "cefr": "A2",
    "country": "UK",
    "work": "The Tale of Peter Rabbit",
    "author": "Beatrix Potter",
    "title": "Inside the Watering Can",
    "minutes": 3,
    "text": "Peter hides inside a watering can. It seems safe, but there is cold water at the bottom. He has to sit very still while Mr. McGregor looks around. Soon Peter sneezes. The sound gives away his hiding place.",
    "translation": "Питер прячется внутри лейки. Там кажется безопасно, но на дне есть холодная вода. Ему приходится сидеть совсем неподвижно, пока мистер Макгрегор осматривается. Вскоре Питер чихает. Звук выдаёт его укрытие.",
    "glossary": [
      [
        "hide",
        "прятаться"
      ],
      [
        "at the bottom",
        "на дне"
      ],
      [
        "sit still",
        "сидеть неподвижно"
      ],
      [
        "look around",
        "осматриваться"
      ],
      [
        "give away",
        "выдать"
      ]
    ]
  },
  {
    "id": "g2-find-gate",
    "grade": 2,
    "cefr": "A2",
    "country": "UK",
    "work": "The Tale of Peter Rabbit",
    "author": "Beatrix Potter",
    "title": "Finding the Gate",
    "minutes": 3,
    "text": "Peter runs past tools, flowerpots, and strange corners of the garden. At last he sees the gate in the distance. He races toward it, slips underneath, and does not stop until the garden is far behind him.",
    "translation": "Питер пробегает мимо инструментов, цветочных горшков и незнакомых уголков сада. Наконец он видит вдали ворота. Он мчится к ним, проскальзывает снизу и не останавливается, пока сад не остаётся далеко позади.",
    "glossary": [
      [
        "past",
        "мимо"
      ],
      [
        "at last",
        "наконец"
      ],
      [
        "in the distance",
        "вдали"
      ],
      [
        "toward",
        "по направлению к"
      ],
      [
        "far behind",
        "далеко позади"
      ]
    ]
  },
  {
    "id": "g2-home",
    "grade": 2,
    "cefr": "A2",
    "country": "UK",
    "work": "The Tale of Peter Rabbit",
    "author": "Beatrix Potter",
    "title": "Back Home",
    "minutes": 3,
    "text": "When Peter reaches home, he is too tired to explain anything. His mother notices that his clothes are gone again. She puts him to bed and wonders what happened. Peter falls asleep almost at once.",
    "translation": "Когда Питер добирается домой, он слишком устал, чтобы что-либо объяснять. Мама замечает, что его одежда снова пропала. Она укладывает его в постель и думает, что же случилось. Питер засыпает почти сразу.",
    "glossary": [
      [
        "reach home",
        "добраться домой"
      ],
      [
        "too tired to",
        "слишком устал, чтобы"
      ],
      [
        "notice",
        "заметить"
      ],
      [
        "put to bed",
        "уложить спать"
      ],
      [
        "almost at once",
        "почти сразу"
      ]
    ]
  },
  {
    "id": "g2-tea",
    "grade": 2,
    "cefr": "A2",
    "country": "UK",
    "work": "The Tale of Peter Rabbit",
    "author": "Beatrix Potter",
    "title": "Tea for Peter",
    "minutes": 3,
    "text": "That evening Peter does not feel well. His mother gives him warm chamomile tea and tells him to rest. The other rabbits enjoy bread, milk, and berries for supper. Peter has learned that adventures can have uncomfortable endings.",
    "translation": "В тот вечер Питер чувствует себя плохо. Мама даёт ему тёплый ромашковый чай и велит отдыхать. Остальные кролики едят на ужин хлеб, молоко и ягоды. Питер понял, что приключения иногда заканчиваются неприятно.",
    "glossary": [
      [
        "feel well",
        "хорошо себя чувствовать"
      ],
      [
        "tell him to rest",
        "велеть ему отдохнуть"
      ],
      [
        "for supper",
        "на ужин"
      ],
      [
        "learn",
        "усвоить"
      ],
      [
        "ending",
        "конец"
      ]
    ]
  },
  {
    "id": "g3-cyclone",
    "grade": 3,
    "cefr": "A2",
    "country": "US",
    "work": "The Wonderful Wizard of Oz",
    "author": "L. Frank Baum",
    "title": "The Cyclone",
    "minutes": 4,
    "text": "Dorothy lives in Kansas with Aunt Em, Uncle Henry, and her little dog Toto. One day the sky grows dark and a powerful cyclone lifts the house into the air. Dorothy cannot get outside, so she stays inside with Toto. After a long time, the house comes down in a strange and beautiful land.",
    "translation": "Дороти живёт в Канзасе с тётей Эм, дядей Генри и маленькой собакой Тото. Однажды небо темнеет, и мощный ураган поднимает дом в воздух. Дороти не может выйти наружу, поэтому остаётся внутри с Тото. Спустя долгое время дом опускается в незнакомой и прекрасной стране.",
    "glossary": [
      [
        "grow dark",
        "потемнеть"
      ],
      [
        "lift into the air",
        "поднять в воздух"
      ],
      [
        "stay inside",
        "оставаться внутри"
      ],
      [
        "come down",
        "опуститься"
      ],
      [
        "strange",
        "незнакомый, странный"
      ]
    ]
  },
  {
    "id": "g3-yellow-road",
    "grade": 3,
    "cefr": "A2",
    "country": "US",
    "work": "The Wonderful Wizard of Oz",
    "author": "L. Frank Baum",
    "title": "The Yellow Brick Road",
    "minutes": 4,
    "text": "Dorothy wants to return home. The people of the strange land tell her that the Wizard of Oz may be able to help. To find him, she must follow a road made of yellow bricks. Dorothy puts on the silver shoes she has been given and starts walking with Toto.",
    "translation": "Дороти хочет вернуться домой. Жители необычной страны говорят, что Волшебник страны Оз, возможно, сможет помочь. Чтобы найти его, нужно идти по дороге из жёлтого кирпича. Дороти надевает подаренные ей серебряные туфельки и отправляется в путь с Тото.",
    "glossary": [
      [
        "return home",
        "вернуться домой"
      ],
      [
        "may be able to",
        "возможно, сможет"
      ],
      [
        "follow a road",
        "идти по дороге"
      ],
      [
        "put on",
        "надеть"
      ],
      [
        "start walking",
        "отправиться пешком"
      ]
    ]
  },
  {
    "id": "g3-scarecrow",
    "grade": 3,
    "cefr": "A2",
    "country": "US",
    "work": "The Wonderful Wizard of Oz",
    "author": "L. Frank Baum",
    "title": "The Scarecrow",
    "minutes": 4,
    "text": "Beside a cornfield Dorothy meets a scarecrow on a pole. He can talk, but he believes he has no brain. Dorothy helps him down. When he hears about the Wizard, he decides to join her because he hopes the Wizard can give him a brain.",
    "translation": "Возле кукурузного поля Дороти встречает пугало на шесте. Оно умеет говорить, но считает, что у него нет мозга. Дороти помогает ему спуститься. Услышав о Волшебнике, Пугало решает присоединиться к ней, потому что надеется получить мозг.",
    "glossary": [
      [
        "beside",
        "рядом с"
      ],
      [
        "believe",
        "считать, верить"
      ],
      [
        "help him down",
        "помочь спуститься"
      ],
      [
        "join",
        "присоединиться"
      ],
      [
        "hope",
        "надеяться"
      ]
    ]
  },
  {
    "id": "g3-tin-woodman",
    "grade": 3,
    "cefr": "A2",
    "country": "US",
    "work": "The Wonderful Wizard of Oz",
    "author": "L. Frank Baum",
    "title": "The Tin Woodman",
    "minutes": 4,
    "text": "In the forest Dorothy hears a weak sound. She finds a man made of tin who cannot move because his joints have rusted. Dorothy oils them, and he can move again. The Tin Woodman says he has no heart, so he also decides to visit the Wizard.",
    "translation": "В лесу Дороти слышит слабый звук. Она находит человека из жести, который не может двигаться, потому что его суставы заржавели. Дороти смазывает их маслом, и он снова может двигаться. Железный Дровосек говорит, что у него нет сердца, поэтому тоже решает посетить Волшебника.",
    "glossary": [
      [
        "made of",
        "сделанный из"
      ],
      [
        "cannot move",
        "не может двигаться"
      ],
      [
        "rust",
        "ржаветь"
      ],
      [
        "oil",
        "смазывать маслом"
      ],
      [
        "heart",
        "сердце"
      ]
    ]
  },
  {
    "id": "g3-lion",
    "grade": 3,
    "cefr": "A2",
    "country": "US",
    "work": "The Wonderful Wizard of Oz",
    "author": "L. Frank Baum",
    "title": "The Cowardly Lion",
    "minutes": 4,
    "text": "A large lion jumps onto the road and frightens the travelers. Soon they learn that he is not cruel; he is simply ashamed of being afraid so often. He wants courage more than anything. Dorothy invites him to come with them to the Emerald City.",
    "translation": "Большой лев выпрыгивает на дорогу и пугает путешественников. Вскоре они узнают, что он не злой; ему просто стыдно, что он так часто боится. Больше всего он хочет храбрости. Дороти приглашает его пойти вместе с ними в Изумрудный город.",
    "glossary": [
      [
        "frighten",
        "пугать"
      ],
      [
        "be ashamed of",
        "стыдиться"
      ],
      [
        "be afraid",
        "бояться"
      ],
      [
        "more than anything",
        "больше всего"
      ],
      [
        "come with",
        "пойти вместе"
      ]
    ]
  },
  {
    "id": "g3-emerald-city",
    "grade": 3,
    "cefr": "A2–B1",
    "country": "US",
    "work": "The Wonderful Wizard of Oz",
    "author": "L. Frank Baum",
    "title": "The Emerald City",
    "minutes": 4,
    "text": "After several difficult days, the friends reach the Emerald City. Everything seems green, and the people wear green glasses. The Wizard agrees to hear their requests, but he gives them a task first. They must defeat the Wicked Witch of the West.",
    "translation": "После нескольких трудных дней друзья добираются до Изумрудного города. Всё кажется зелёным, а жители носят зелёные очки. Волшебник соглашается выслушать их просьбы, но сначала даёт задание. Они должны победить Злую Ведьму Запада.",
    "glossary": [
      [
        "reach",
        "добраться"
      ],
      [
        "seem",
        "казаться"
      ],
      [
        "agree to",
        "согласиться"
      ],
      [
        "request",
        "просьба"
      ],
      [
        "defeat",
        "победить"
      ]
    ]
  },
  {
    "id": "g3-west",
    "grade": 3,
    "cefr": "A2–B1",
    "country": "US",
    "work": "The Wonderful Wizard of Oz",
    "author": "L. Frank Baum",
    "title": "The Wicked Witch",
    "minutes": 4,
    "text": "The Witch sends dangers to stop Dorothy and her friends. The group stays together and helps one another. At last Dorothy throws a bucket of water during an angry moment. To everyone’s surprise, the Witch begins to disappear because water is her weakness.",
    "translation": "Ведьма посылает опасности, чтобы остановить Дороти и её друзей. Компания держится вместе и помогает друг другу. Наконец в сердитую минуту Дороти выливает ведро воды. Ко всеобщему удивлению, Ведьма начинает исчезать, потому что вода — её слабость.",
    "glossary": [
      [
        "stay together",
        "держаться вместе"
      ],
      [
        "one another",
        "друг друг"
      ],
      [
        "at last",
        "наконец"
      ],
      [
        "to everyone’s surprise",
        "ко всеобщему удивлению"
      ],
      [
        "weakness",
        "слабость"
      ]
    ]
  },
  {
    "id": "g3-secret",
    "grade": 3,
    "cefr": "B1",
    "country": "US",
    "work": "The Wonderful Wizard of Oz",
    "author": "L. Frank Baum",
    "title": "The Wizard’s Secret",
    "minutes": 4,
    "text": "Back in the Emerald City, the travelers discover that the great Wizard is an ordinary man using clever tricks. He cannot perform real magic, but he understands what the friends truly need. The Scarecrow has already shown wisdom, the Tin Woodman kindness, and the Lion courage.",
    "translation": "Вернувшись в Изумрудный город, путешественники узнают, что великий Волшебник — обычный человек, который использует хитрые трюки. Настоящей магией он не владеет, но понимает, что друзьям действительно нужно. Пугало уже проявило мудрость, Железный Дровосек — доброту, а Лев — храбрость.",
    "glossary": [
      [
        "discover",
        "обнаружить, узнать"
      ],
      [
        "ordinary",
        "обычный"
      ],
      [
        "clever tricks",
        "хитрые трюки"
      ],
      [
        "truly",
        "по-настоящему"
      ],
      [
        "show courage",
        "проявить храбрость"
      ]
    ]
  },
  {
    "id": "g3-balloon",
    "grade": 3,
    "cefr": "B1",
    "country": "US",
    "work": "The Wonderful Wizard of Oz",
    "author": "L. Frank Baum",
    "title": "The Balloon Leaves",
    "minutes": 4,
    "text": "The Wizard plans to take Dorothy home in a balloon. Just before it leaves, Toto jumps away to chase a cat. Dorothy runs after him. By the time she returns, the ropes have broken and the balloon is already rising into the sky.",
    "translation": "Волшебник собирается отвезти Дороти домой на воздушном шаре. Прямо перед отправлением Тото убегает за кошкой. Дороти бросается за ним. Когда она возвращается, верёвки уже оборвались, а шар поднимается в небо.",
    "glossary": [
      [
        "plan to",
        "планировать"
      ],
      [
        "just before",
        "прямо перед"
      ],
      [
        "run after",
        "побежать за"
      ],
      [
        "by the time",
        "к тому времени как"
      ],
      [
        "rise into the sky",
        "подняться в небо"
      ]
    ]
  },
  {
    "id": "g3-home-again",
    "grade": 3,
    "cefr": "B1",
    "country": "US",
    "work": "The Wonderful Wizard of Oz",
    "author": "L. Frank Baum",
    "title": "Home Again",
    "minutes": 4,
    "text": "Dorothy finally learns that the silver shoes can carry her home. She says goodbye to the friends who traveled beside her. Then she follows the instructions and wishes to return to Kansas. A moment later, she is back with Aunt Em and knows how precious home can be.",
    "translation": "Наконец Дороти узнаёт, что серебряные туфельки могут перенести её домой. Она прощается с друзьями, которые путешествовали рядом с ней. Затем следует инструкции и желает вернуться в Канзас. Через мгновение она снова с тётей Эм и понимает, насколько дорогим может быть дом.",
    "glossary": [
      [
        "finally",
        "наконец"
      ],
      [
        "say goodbye",
        "прощаться"
      ],
      [
        "follow instructions",
        "следовать инструкциям"
      ],
      [
        "a moment later",
        "через мгновение"
      ],
      [
        "precious",
        "дорогой, ценный"
      ]
    ]
  },
  {
    "id": "g4-rabbit",
    "grade": 4,
    "cefr": "A2–B1",
    "country": "UK",
    "work": "Alice’s Adventures in Wonderland",
    "author": "Lewis Carroll",
    "title": "A Rabbit with a Watch",
    "minutes": 5,
    "text": "Alice is sitting beside her sister when a white rabbit runs past. A talking rabbit would already be unusual, but this one also takes a watch from its pocket and complains that it is late. Curious, Alice follows it across the field and sees it disappear into a large rabbit hole. Without much thought, she goes after it.",
    "translation": "Алиса сидит рядом с сестрой, когда мимо пробегает белый кролик. Говорящий кролик уже был бы необычным, но этот ещё и достаёт часы из кармана и жалуется, что опаздывает. Из любопытства Алиса следует за ним через поле и видит, как он исчезает в большой кроличьей норе. Почти не раздумывая, она спускается за ним.",
    "glossary": [
      [
        "run past",
        "пробежать мимо"
      ],
      [
        "complain",
        "жаловаться"
      ],
      [
        "be late",
        "опаздывать"
      ],
      [
        "curious",
        "любопытный"
      ],
      [
        "go after",
        "последовать за"
      ]
    ]
  },
  {
    "id": "g4-fall",
    "grade": 4,
    "cefr": "B1",
    "country": "UK",
    "work": "Alice’s Adventures in Wonderland",
    "author": "Lewis Carroll",
    "title": "Down the Rabbit Hole",
    "minutes": 5,
    "text": "The hole suddenly becomes a deep tunnel, and Alice begins to fall. The fall lasts so long that she has time to look at shelves, maps, and jars along the walls. She even wonders whether she might fall through the whole earth. At last she lands safely on a pile of leaves.",
    "translation": "Нора внезапно превращается в глубокий тоннель, и Алиса начинает падать. Падение длится так долго, что она успевает рассматривать полки, карты и банки на стенах. Она даже задаётся вопросом, не пролетит ли насквозь через всю Землю. Наконец она безопасно приземляется на кучу листьев.",
    "glossary": [
      [
        "begin to fall",
        "начать падать"
      ],
      [
        "last so long",
        "длиться так долго"
      ],
      [
        "wonder whether",
        "задаваться вопросом, ли"
      ],
      [
        "at last",
        "наконец"
      ],
      [
        "land safely",
        "безопасно приземлиться"
      ]
    ]
  },
  {
    "id": "g4-drink-me",
    "grade": 4,
    "cefr": "B1",
    "country": "UK",
    "work": "Alice’s Adventures in Wonderland",
    "author": "Lewis Carroll",
    "title": "Drink Me",
    "minutes": 5,
    "text": "Alice finds a tiny door that opens into a beautiful garden, but she is far too large to pass through it. On a table stands a bottle marked “DRINK ME.” After checking that it does not seem dangerous, Alice tastes it. Soon she becomes so small that the door is exactly the right size.",
    "translation": "Алиса находит крошечную дверь, ведущую в прекрасный сад, но она слишком велика, чтобы пройти через неё. На столе стоит бутылочка с надписью «ВЫПЕЙ МЕНЯ». Убедившись, что она не выглядит опасной, Алиса пробует напиток. Вскоре она становится настолько маленькой, что дверь оказывается как раз подходящего размера.",
    "glossary": [
      [
        "far too large",
        "намного слишком большой"
      ],
      [
        "pass through",
        "пройти через"
      ],
      [
        "marked",
        "с надписью"
      ],
      [
        "taste",
        "пробовать на вкус"
      ],
      [
        "the right size",
        "подходящий размер"
      ]
    ]
  },
  {
    "id": "g4-caterpillar",
    "grade": 4,
    "cefr": "B1",
    "country": "UK",
    "work": "Alice’s Adventures in Wonderland",
    "author": "Lewis Carroll",
    "title": "The Caterpillar’s Question",
    "minutes": 5,
    "text": "On a mushroom Alice meets a blue caterpillar who asks, “Who are you?” The question is harder than it sounds. Alice has changed size so many times that day that she no longer feels quite like herself. The Caterpillar gives mysterious advice and tells her that different sides of the mushroom can change her height.",
    "translation": "На грибе Алиса встречает синюю гусеницу, которая спрашивает: «Кто ты?» Вопрос оказывается сложнее, чем звучит. За этот день Алиса столько раз меняла рост, что уже не совсем чувствует себя собой. Гусеница даёт загадочный совет и говорит, что разные стороны гриба могут менять её рост.",
    "glossary": [
      [
        "harder than it sounds",
        "сложнее, чем кажется"
      ],
      [
        "change size",
        "менять размер"
      ],
      [
        "no longer",
        "больше не"
      ],
      [
        "mysterious advice",
        "загадочный совет"
      ],
      [
        "height",
        "рост"
      ]
    ]
  },
  {
    "id": "g4-cheshire",
    "grade": 4,
    "cefr": "B1",
    "country": "UK",
    "work": "Alice’s Adventures in Wonderland",
    "author": "Lewis Carroll",
    "title": "The Cheshire Cat",
    "minutes": 5,
    "text": "Alice meets a smiling cat that can appear and disappear whenever it likes. She asks which road she should take. The Cat replies that the answer depends on where she wants to go. Since Alice does not know her destination, almost any road will do. The strange advice is logical in its own way.",
    "translation": "Алиса встречает улыбающегося кота, который может появляться и исчезать, когда захочет. Она спрашивает, по какой дороге ей идти. Кот отвечает, что всё зависит от того, куда она хочет попасть. Поскольку Алиса не знает своей цели, подойдёт почти любая дорога. Странный совет по-своему логичен.",
    "glossary": [
      [
        "whenever it likes",
        "когда захочет"
      ],
      [
        "depend on",
        "зависеть от"
      ],
      [
        "destination",
        "место назначения"
      ],
      [
        "will do",
        "подойдёт"
      ],
      [
        "in its own way",
        "по-своему"
      ]
    ]
  },
  {
    "id": "g4-tea",
    "grade": 4,
    "cefr": "B1",
    "country": "UK",
    "work": "Alice’s Adventures in Wonderland",
    "author": "Lewis Carroll",
    "title": "A Very Strange Tea Party",
    "minutes": 5,
    "text": "At a long table Alice finds the Hatter, the March Hare, and a sleepy Dormouse. They keep changing seats and asking riddles that do not have sensible answers. Time seems to have stopped at six o’clock, so it is always tea time. Alice tries to follow the conversation but becomes increasingly annoyed.",
    "translation": "За длинным столом Алиса встречает Шляпника, Мартовского Зайца и соню. Они постоянно меняются местами и задают загадки, у которых нет разумных ответов. Кажется, время остановилось на шести часах, поэтому здесь всегда время пить чай. Алиса пытается следить за разговором, но раздражается всё сильнее.",
    "glossary": [
      [
        "keep changing",
        "постоянно менять"
      ],
      [
        "riddle",
        "загадка"
      ],
      [
        "sensible",
        "разумный"
      ],
      [
        "tea time",
        "время чаепития"
      ],
      [
        "increasingly",
        "всё больше"
      ]
    ]
  },
  {
    "id": "g4-queen",
    "grade": 4,
    "cefr": "B1",
    "country": "UK",
    "work": "Alice’s Adventures in Wonderland",
    "author": "Lewis Carroll",
    "title": "The Queen’s Croquet Ground",
    "minutes": 5,
    "text": "The Queen of Hearts invites Alice to a game of croquet, but nothing works normally. The balls are hedgehogs, the mallets are flamingos, and the arches are made by soldiers. The Queen loses her temper whenever the game goes badly and orders punishments for everyone. Alice begins to see that the Queen’s power is mostly noise and fear.",
    "translation": "Королева Червей приглашает Алису сыграть в крокет, но здесь всё устроено ненормально. Мячи — ежи, молотки — фламинго, а воротца изображают солдаты. Когда игра идёт плохо, Королева выходит из себя и требует наказать всех подряд. Алиса начинает понимать, что власть Королевы в основном держится на шуме и страхе.",
    "glossary": [
      [
        "nothing works normally",
        "ничто не работает как обычно"
      ],
      [
        "lose her temper",
        "выйти из себя"
      ],
      [
        "go badly",
        "идти плохо"
      ],
      [
        "order punishments",
        "приказывать наказать"
      ],
      [
        "mostly",
        "в основном"
      ]
    ]
  },
  {
    "id": "g4-trial",
    "grade": 4,
    "cefr": "B1",
    "country": "UK",
    "work": "Alice’s Adventures in Wonderland",
    "author": "Lewis Carroll",
    "title": "The Trial",
    "minutes": 5,
    "text": "Alice attends a trial about some stolen tarts. The witnesses give confusing evidence, and the rules seem to change whenever it is convenient. As Alice grows larger, she becomes less afraid of the court. She finally says that the whole process is nonsense.",
    "translation": "Алиса присутствует на суде по делу об украденных пирожках. Свидетели дают запутанные показания, а правила словно меняются всякий раз, когда это удобно. По мере того как Алиса становится больше, она всё меньше боится суда. В конце концов она заявляет, что весь процесс — полная бессмыслица.",
    "glossary": [
      [
        "attend a trial",
        "присутствовать на суде"
      ],
      [
        "stolen",
        "украденный"
      ],
      [
        "evidence",
        "показания, доказательства"
      ],
      [
        "less afraid",
        "меньше бояться"
      ],
      [
        "nonsense",
        "бессмыслица"
      ]
    ]
  },
  {
    "id": "g4-cards",
    "grade": 4,
    "cefr": "B1",
    "country": "UK",
    "work": "Alice’s Adventures in Wonderland",
    "author": "Lewis Carroll",
    "title": "Only a Pack of Cards",
    "minutes": 5,
    "text": "When Alice challenges the court, the Queen becomes furious. The playing cards rise into the air and rush toward her. Instead of running away, Alice cries that they are only a pack of cards. At that moment the strange world breaks apart around her.",
    "translation": "Когда Алиса бросает вызов суду, Королева приходит в ярость. Игральные карты взлетают в воздух и несутся к ней. Вместо того чтобы убежать, Алиса кричит, что они всего лишь колода карт. В этот момент странный мир вокруг неё распадается.",
    "glossary": [
      [
        "challenge",
        "бросать вызов"
      ],
      [
        "become furious",
        "прийти в ярость"
      ],
      [
        "rush toward",
        "нестись к"
      ],
      [
        "instead of",
        "вместо"
      ],
      [
        "break apart",
        "распасться"
      ]
    ]
  },
  {
    "id": "g4-wake",
    "grade": 4,
    "cefr": "B1",
    "country": "UK",
    "work": "Alice’s Adventures in Wonderland",
    "author": "Lewis Carroll",
    "title": "Waking Up",
    "minutes": 5,
    "text": "Alice wakes beside her sister and realizes that Wonderland was a dream. Yet the dream feels unusually vivid. She remembers the strange creatures, impossible rules, and curious conversations. Then she runs home for tea, carrying the memory of a world where logic could turn upside down.",
    "translation": "Алиса просыпается рядом с сестрой и понимает, что Страна чудес была сном. Но сон кажется необычайно ярким. Она вспоминает странных существ, невозможные правила и любопытные разговоры. Затем она бежит домой к чаю, унося с собой память о мире, где логика могла перевернуться вверх дном.",
    "glossary": [
      [
        "realize",
        "осознать"
      ],
      [
        "vivid",
        "яркий, живой"
      ],
      [
        "impossible",
        "невозможный"
      ],
      [
        "carry the memory",
        "нести воспоминание"
      ],
      [
        "turn upside down",
        "перевернуться вверх дном"
      ]
    ]
  },
  {
    "id": "g5-mary",
    "grade": 5,
    "cefr": "B1",
    "country": "UK",
    "work": "The Secret Garden",
    "author": "Frances Hodgson Burnett",
    "title": "Mary Comes to England",
    "minutes": 6,
    "text": "Mary Lennox has spent her early childhood in India, where servants have done nearly everything for her. After a sudden tragedy leaves her alone, she is sent to live with an uncle in Yorkshire. Misselthwaite Manor is enormous, quiet, and full of locked rooms. Mary dislikes the place at first, yet the unfamiliar landscape slowly awakens her curiosity.",
    "translation": "Раннее детство Мэри Леннокс прошло в Индии, где слуги делали за неё почти всё. После внезапной трагедии она остаётся одна и её отправляют к дяде в Йоркшир. Поместье Мисселтуэйт огромное, тихое и полное запертых комнат. Сначала Мэри не нравится это место, но незнакомый пейзаж постепенно пробуждает её любопытство.",
    "glossary": [
      [
        "nearly everything",
        "почти всё"
      ],
      [
        "leave her alone",
        "оставить её одну"
      ],
      [
        "be sent to live",
        "быть отправленной жить"
      ],
      [
        "at first",
        "сначала"
      ],
      [
        "awaken curiosity",
        "пробуждать любопытство"
      ]
    ]
  },
  {
    "id": "g5-moor",
    "grade": 5,
    "cefr": "B1",
    "country": "UK",
    "work": "The Secret Garden",
    "author": "Frances Hodgson Burnett",
    "title": "The Yorkshire Moor",
    "minutes": 6,
    "text": "The maid Martha tells Mary about the wide moor beyond the house. Mary has never cared much about nature, but she begins walking outside every day. The wind is strong and the air feels sharp and clean. Without noticing it, she starts eating better, sleeping more deeply, and becoming interested in the world around her.",
    "translation": "Служанка Марта рассказывает Мэри о широкой пустоши за домом. Раньше Мэри почти не интересовалась природой, но теперь начинает каждый день гулять. Ветер сильный, а воздух кажется свежим и чистым. Сама того не замечая, она начинает лучше есть, крепче спать и интересоваться окружающим миром.",
    "glossary": [
      [
        "care about",
        "интересоваться, заботиться о"
      ],
      [
        "every day",
        "каждый день"
      ],
      [
        "without noticing",
        "сама того не замечая"
      ],
      [
        "sleep deeply",
        "крепко спать"
      ],
      [
        "world around her",
        "окружающий мир"
      ]
    ]
  },
  {
    "id": "g5-key",
    "grade": 5,
    "cefr": "B1",
    "country": "UK",
    "work": "The Secret Garden",
    "author": "Frances Hodgson Burnett",
    "title": "A Buried Key",
    "minutes": 6,
    "text": "Mary hears about a garden that was locked after her aunt died. No one has entered it for ten years. One day, while watching a robin, Mary notices something half-buried in the soil. It is an old key. She immediately wonders whether it might belong to the hidden garden.",
    "translation": "Мэри узнаёт о саде, который заперли после смерти её тёти. Десять лет туда никто не входил. Однажды, наблюдая за малиновкой, Мэри замечает что-то наполовину зарытое в земле. Это старый ключ. Она сразу думает, не от скрытого ли сада он.",
    "glossary": [
      [
        "hear about",
        "услышать о"
      ],
      [
        "no one",
        "никто"
      ],
      [
        "half-buried",
        "наполовину зарытый"
      ],
      [
        "belong to",
        "принадлежать"
      ],
      [
        "hidden garden",
        "скрытый сад"
      ]
    ]
  },
  {
    "id": "g5-door",
    "grade": 5,
    "cefr": "B1",
    "country": "UK",
    "work": "The Secret Garden",
    "author": "Frances Hodgson Burnett",
    "title": "The Hidden Door",
    "minutes": 6,
    "text": "The robin seems to lead Mary toward a wall covered in ivy. Behind the leaves she finds a door that is almost invisible. The old key fits the lock. Mary turns it carefully and steps into a garden that has been left alone for years. Everything looks asleep, but she believes some of the plants are still alive.",
    "translation": "Кажется, малиновка ведёт Мэри к стене, покрытой плющом. За листьями она находит почти невидимую дверь. Старый ключ подходит к замку. Мэри осторожно поворачивает его и входит в сад, который много лет был заброшен. Всё выглядит спящим, но она верит, что некоторые растения всё ещё живы.",
    "glossary": [
      [
        "covered in",
        "покрытый"
      ],
      [
        "fit the lock",
        "подходить к замку"
      ],
      [
        "step into",
        "войти"
      ],
      [
        "be left alone",
        "быть заброшенным"
      ],
      [
        "still alive",
        "всё ещё живой"
      ]
    ]
  },
  {
    "id": "g5-dickon",
    "grade": 5,
    "cefr": "B1",
    "country": "UK",
    "work": "The Secret Garden",
    "author": "Frances Hodgson Burnett",
    "title": "Dickon",
    "minutes": 6,
    "text": "Martha’s brother Dickon knows the moor and its animals better than anyone Mary has met. When she tells him about the secret garden, he does not laugh or ask too many questions. He brings tools and seeds, then helps her clear the soil. Mary is surprised by how easy it is to trust him.",
    "translation": "Брат Марты Дикон знает пустошь и её животных лучше всех, кого встречала Мэри. Когда она рассказывает ему о тайном саде, он не смеётся и не задаёт слишком много вопросов. Он приносит инструменты и семена, а затем помогает очистить землю. Мэри удивляется, насколько легко ему доверять.",
    "glossary": [
      [
        "better than anyone",
        "лучше всех"
      ],
      [
        "ask too many questions",
        "задавать слишком много вопросов"
      ],
      [
        "bring tools",
        "принести инструменты"
      ],
      [
        "clear the soil",
        "расчистить землю"
      ],
      [
        "trust him",
        "доверять ему"
      ]
    ]
  },
  {
    "id": "g5-crying",
    "grade": 5,
    "cefr": "B1",
    "country": "UK",
    "work": "The Secret Garden",
    "author": "Frances Hodgson Burnett",
    "title": "Crying in the Corridor",
    "minutes": 6,
    "text": "At night Mary sometimes hears a child crying somewhere inside the manor. The adults avoid her questions, which only makes her more determined to discover the truth. One rainy evening she follows the sound through several corridors. Behind a door she finds Colin, her uncle’s sick and lonely son.",
    "translation": "Ночью Мэри иногда слышит детский плач где-то внутри поместья. Взрослые избегают её вопросов, и это только усиливает её желание узнать правду. В один дождливый вечер она идёт на звук через несколько коридоров. За дверью она находит Колина — больного и одинокого сына своего дяди.",
    "glossary": [
      [
        "avoid questions",
        "избегать вопросов"
      ],
      [
        "determined",
        "решительно настроенный"
      ],
      [
        "discover the truth",
        "узнать правду"
      ],
      [
        "follow the sound",
        "идти на звук"
      ],
      [
        "lonely",
        "одинокий"
      ]
    ]
  },
  {
    "id": "g5-colin",
    "grade": 5,
    "cefr": "B1",
    "country": "UK",
    "work": "The Secret Garden",
    "author": "Frances Hodgson Burnett",
    "title": "Colin’s Fear",
    "minutes": 6,
    "text": "Colin believes he is seriously ill and may never grow up. Everyone has treated him as if he were extremely fragile, so he expects the worst from every pain. Mary refuses to pity him in the usual way. Their arguments are unpleasant at times, but they also make Colin think differently about himself.",
    "translation": "Колин уверен, что тяжело болен и, возможно, никогда не вырастет. Все обращались с ним так, будто он чрезвычайно хрупкий, поэтому от любой боли он ждёт худшего. Мэри отказывается жалеть его привычным образом. Их споры порой неприятны, но они заставляют Колина иначе взглянуть на себя.",
    "glossary": [
      [
        "grow up",
        "вырасти"
      ],
      [
        "treat him as if",
        "обращаться так, будто"
      ],
      [
        "expect the worst",
        "ожидать худшего"
      ],
      [
        "refuse to",
        "отказываться"
      ],
      [
        "think differently",
        "думать иначе"
      ]
    ]
  },
  {
    "id": "g5-colin-garden",
    "grade": 5,
    "cefr": "B1",
    "country": "UK",
    "work": "The Secret Garden",
    "author": "Frances Hodgson Burnett",
    "title": "Colin Enters the Garden",
    "minutes": 6,
    "text": "Mary and Dickon secretly take Colin outside in a wheelchair. When he sees the hidden garden, he is overwhelmed by its color, air, and life. The place makes him want to become stronger. He begins spending time there each day and slowly learns to stand and walk.",
    "translation": "Мэри и Дикон тайком вывозят Колина на улицу в кресле. Увидев тайный сад, он поражён его цветами, воздухом и жизнью. Это место вызывает у него желание стать сильнее. Он начинает проводить там время каждый день и постепенно учится стоять и ходить.",
    "glossary": [
      [
        "secretly",
        "тайком"
      ],
      [
        "be overwhelmed by",
        "быть поражённым"
      ],
      [
        "make him want to",
        "вызывать желание"
      ],
      [
        "spend time",
        "проводить время"
      ],
      [
        "learn to stand",
        "учиться стоять"
      ]
    ]
  },
  {
    "id": "g5-magic",
    "grade": 5,
    "cefr": "B1–B2",
    "country": "UK",
    "work": "The Secret Garden",
    "author": "Frances Hodgson Burnett",
    "title": "What They Call Magic",
    "minutes": 6,
    "text": "The children begin calling the garden’s power “Magic.” They do not mean a spell from a fairy tale. To them, Magic is the energy of growing things, fresh air, friendship, hope, and the belief that change is possible. Colin’s body becomes stronger, but just as importantly, his thoughts become less fearful.",
    "translation": "Дети начинают называть силу сада «Магией». Они имеют в виду не заклинание из сказки. Для них Магия — это энергия растущих растений, свежий воздух, дружба, надежда и вера в возможность перемен. Тело Колина становится сильнее, но не менее важно то, что его мысли становятся менее тревожными.",
    "glossary": [
      [
        "mean a spell",
        "иметь в виду заклинание"
      ],
      [
        "growing things",
        "растущие растения"
      ],
      [
        "belief",
        "вера, убеждение"
      ],
      [
        "just as importantly",
        "не менее важно"
      ],
      [
        "fearful",
        "испуганный, тревожный"
      ]
    ]
  },
  {
    "id": "g5-father-returns",
    "grade": 5,
    "cefr": "B1–B2",
    "country": "UK",
    "work": "The Secret Garden",
    "author": "Frances Hodgson Burnett",
    "title": "A Father Returns",
    "minutes": 6,
    "text": "Colin’s father has spent years avoiding the garden because it reminds him of his wife. When he finally returns, he hears a child laughing behind the old walls. He enters and sees Colin standing on his own feet. The garden that once represented grief has become a place of recovery and reunion.",
    "translation": "Отец Колина годами избегал сада, потому что тот напоминал ему о жене. Когда он наконец возвращается, то слышит детский смех за старыми стенами. Он входит и видит Колина, стоящего на собственных ногах. Сад, который когда-то символизировал горе, стал местом восстановления и воссоединения.",
    "glossary": [
      [
        "avoid",
        "избегать"
      ],
      [
        "remind him of",
        "напоминать ему о"
      ],
      [
        "on his own feet",
        "на собственных ногах"
      ],
      [
        "once represented",
        "когда-то символизировал"
      ],
      [
        "reunion",
        "воссоединение"
      ]
    ]
  },
  {
    "id": "g6-fence",
    "grade": 6,
    "cefr": "B1",
    "country": "US",
    "work": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "title": "Painting the Fence",
    "minutes": 7,
    "text": "Aunt Polly orders Tom to whitewash a long fence on Saturday, which feels like a terrible punishment. When other boys come by, Tom pretends that painting is a rare pleasure that requires special skill. Soon they are asking for a chance to try it themselves and even offering him small treasures. By afternoon the fence has several coats of paint, while Tom has done very little of the work.",
    "translation": "Тётя Полли велит Тому в субботу побелить длинный забор, и это кажется ужасным наказанием. Когда мимо проходят другие мальчишки, Том делает вид, что покраска — редкое удовольствие, требующее особого мастерства. Вскоре они сами просят дать им попробовать и даже предлагают Тому мелкие сокровища. К полудню на заборе уже несколько слоёв краски, хотя сам Том почти не работал.",
    "glossary": [
      [
        "come by",
        "проходить мимо"
      ],
      [
        "pretend",
        "делать вид"
      ],
      [
        "a chance to",
        "шанс сделать"
      ],
      [
        "offer",
        "предлагать"
      ],
      [
        "very little",
        "совсем немного"
      ]
    ]
  },
  {
    "id": "g6-school",
    "grade": 6,
    "cefr": "B1",
    "country": "US",
    "work": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "title": "Late for School",
    "minutes": 7,
    "text": "Tom arrives late to school and needs an excuse. When the teacher asks why, Tom notices Becky Thatcher sitting among the girls. Instead of inventing a safe lie, he admits that he stopped to speak with Huckleberry Finn, a boy adults disapprove of. The punishment places him near Becky, which is exactly where he wanted to be.",
    "translation": "Том опаздывает в школу и должен придумать оправдание. Когда учитель спрашивает почему, Том замечает Бекки Тэтчер среди девочек. Вместо безопасной лжи он признаётся, что остановился поговорить с Гекльберри Финном, которого взрослые не одобряют. Наказание сажает его рядом с Бекки — именно туда, куда ему и хотелось.",
    "glossary": [
      [
        "arrive late",
        "опоздать"
      ],
      [
        "need an excuse",
        "нужно оправдание"
      ],
      [
        "instead of",
        "вместо"
      ],
      [
        "admit",
        "признаться"
      ],
      [
        "disapprove of",
        "не одобрять"
      ]
    ]
  },
  {
    "id": "g6-island",
    "grade": 6,
    "cefr": "B1",
    "country": "US",
    "work": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "title": "Running Away to the Island",
    "minutes": 7,
    "text": "Feeling misunderstood, Tom, Huck, and Joe Harper decide to run away and become pirates. They take a small raft to an island in the Mississippi River. At first the freedom is exciting: they swim, fish, cook outdoors, and stay up late. Before long, however, they begin to miss home even though none of them wants to admit it.",
    "translation": "Чувствуя, что их никто не понимает, Том, Гек и Джо Харпер решают сбежать и стать пиратами. На маленьком плоту они добираются до острова на Миссисипи. Сначала свобода восхищает: они плавают, ловят рыбу, готовят на улице и поздно ложатся спать. Но вскоре начинают скучать по дому, хотя никто не хочет в этом признаваться.",
    "glossary": [
      [
        "run away",
        "сбежать"
      ],
      [
        "at first",
        "сначала"
      ],
      [
        "stay up late",
        "поздно ложиться"
      ],
      [
        "before long",
        "вскоре"
      ],
      [
        "miss home",
        "скучать по дому"
      ]
    ]
  },
  {
    "id": "g6-funeral",
    "grade": 6,
    "cefr": "B1",
    "country": "US",
    "work": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "title": "Their Own Funeral",
    "minutes": 7,
    "text": "The boys discover that the town believes they have drowned. Instead of returning immediately, Tom secretly visits home and hears plans for a funeral. He creates a dramatic idea. During the service, while everyone is grieving, the missing boys suddenly walk into the church. Shock quickly turns into joy.",
    "translation": "Мальчики узнают, что жители города считают их утонувшими. Вместо того чтобы сразу вернуться, Том тайно приходит домой и слышит о подготовке похорон. У него рождается эффектная идея. Во время службы, пока все скорбят, пропавшие мальчики внезапно входят в церковь. Шок быстро сменяется радостью.",
    "glossary": [
      [
        "believe they have drowned",
        "считать их утонувшими"
      ],
      [
        "immediately",
        "немедленно"
      ],
      [
        "grieve",
        "скорбеть"
      ],
      [
        "walk into",
        "войти"
      ],
      [
        "turn into joy",
        "смениться радостью"
      ]
    ]
  },
  {
    "id": "g6-cave",
    "grade": 6,
    "cefr": "B1–B2",
    "country": "US",
    "work": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "title": "Lost in the Cave",
    "minutes": 7,
    "text": "During a picnic, Tom and Becky explore McDougal’s Cave and wander farther than they realize. The passages twist in every direction, and their candles grow shorter. Tom tries to stay calm for Becky’s sake, even when he becomes frightened himself. He searches side passages and eventually discovers a way out.",
    "translation": "Во время пикника Том и Бекки исследуют пещеру Макдугала и заходят дальше, чем понимают. Ходы изгибаются во все стороны, а свечи становятся всё короче. Том старается сохранять спокойствие ради Бекки, даже когда сам пугается. Он обследует боковые проходы и в конце концов находит выход.",
    "glossary": [
      [
        "wander farther",
        "забрести дальше"
      ],
      [
        "in every direction",
        "во все стороны"
      ],
      [
        "for Becky’s sake",
        "ради Бекки"
      ],
      [
        "stay calm",
        "сохранять спокойствие"
      ],
      [
        "eventually",
        "в конце концов"
      ]
    ]
  },
  {
    "id": "g6-court",
    "grade": 6,
    "cefr": "B1–B2",
    "country": "US",
    "work": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "title": "Telling the Truth",
    "minutes": 7,
    "text": "Tom has witnessed a serious crime and knows that an innocent man may be punished for it. He is terrified of the real criminal, Injun Joe, but guilt becomes harder to carry than fear. In court Tom finally tells what he saw. His decision saves the innocent man, although the criminal escapes.",
    "translation": "Том стал свидетелем серьёзного преступления и знает, что за него могут наказать невиновного. Он ужасно боится настоящего преступника, Индейца Джо, но чувство вины переносить становится тяжелее, чем страх. В суде Том наконец рассказывает, что видел. Его решение спасает невиновного, хотя преступнику удаётся сбежать.",
    "glossary": [
      [
        "witness a crime",
        "стать свидетелем преступления"
      ],
      [
        "innocent",
        "невиновный"
      ],
      [
        "be terrified of",
        "ужасно бояться"
      ],
      [
        "tell what he saw",
        "рассказать, что видел"
      ],
      [
        "escape",
        "сбежать"
      ]
    ]
  },
  {
    "id": "g6-treasure",
    "grade": 6,
    "cefr": "B1–B2",
    "country": "US",
    "work": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "title": "Searching for Treasure",
    "minutes": 7,
    "text": "Tom and Huck become convinced that old, abandoned places are perfect locations for buried treasure. Their game becomes more serious when they accidentally see Injun Joe hiding a box of coins. Now the boys have a real mystery to solve. They begin watching his movements and looking for the place where he has hidden the money.",
    "translation": "Том и Гек убеждаются, что старые заброшенные места идеально подходят для спрятанных сокровищ. Их игра становится серьёзнее, когда они случайно видят, как Индеец Джо прячет ящик с монетами. Теперь у мальчиков есть настоящая тайна. Они начинают следить за его передвижениями и искать место, где спрятаны деньги.",
    "glossary": [
      [
        "become convinced",
        "убедиться"
      ],
      [
        "buried treasure",
        "зарытое сокровище"
      ],
      [
        "accidentally",
        "случайно"
      ],
      [
        "mystery to solve",
        "тайна, которую надо разгадать"
      ],
      [
        "watch his movements",
        "следить за передвижениями"
      ]
    ]
  },
  {
    "id": "g6-huck",
    "grade": 6,
    "cefr": "B1–B2",
    "country": "US",
    "work": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "title": "Huck Raises the Alarm",
    "minutes": 7,
    "text": "Huck follows Injun Joe one night and realizes that someone may be in danger. Although he is usually suspicious of respectable adults, he runs for help. His warning prevents an attack. For once, the town begins to see the troublesome boy as someone capable of courage and loyalty.",
    "translation": "Однажды ночью Гек следует за Индейцем Джо и понимает, что кому-то может грозить опасность. Хотя он обычно с недоверием относится к «приличным» взрослым, он бежит за помощью. Его предупреждение предотвращает нападение. Впервые город начинает видеть в проблемном мальчике человека, способного на храбрость и верность.",
    "glossary": [
      [
        "be in danger",
        "быть в опасности"
      ],
      [
        "suspicious of",
        "с недоверием относиться к"
      ],
      [
        "run for help",
        "побежать за помощью"
      ],
      [
        "prevent an attack",
        "предотвратить нападение"
      ],
      [
        "for once",
        "на этот раз, впервые"
      ]
    ]
  },
  {
    "id": "g6-gold",
    "grade": 6,
    "cefr": "B1–B2",
    "country": "US",
    "work": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "title": "The Gold in the Cave",
    "minutes": 7,
    "text": "After the cave is closed for safety, Tom remembers seeing Injun Joe inside it. He and Huck later return and discover the hidden treasure. The boys suddenly have more money than they ever imagined. Their adventure ends not with pirate glory, but with bank accounts, new expectations, and adults deciding what should happen next.",
    "translation": "После того как пещеру закрывают ради безопасности, Том вспоминает, что видел там Индейца Джо. Позже он и Гек возвращаются и находят спрятанное сокровище. У мальчиков внезапно оказывается больше денег, чем они могли представить. Их приключение заканчивается не пиратской славой, а банковскими счетами, новыми ожиданиями и взрослыми, решающими, что делать дальше.",
    "glossary": [
      [
        "for safety",
        "ради безопасности"
      ],
      [
        "return",
        "вернуться"
      ],
      [
        "more than they imagined",
        "больше, чем они представляли"
      ],
      [
        "end with",
        "заканчиваться чем-то"
      ],
      [
        "what should happen next",
        "что должно произойти дальше"
      ]
    ]
  },
  {
    "id": "g6-growing",
    "grade": 6,
    "cefr": "B1–B2",
    "country": "US",
    "work": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "title": "Freedom and Growing Up",
    "minutes": 7,
    "text": "Tom wants adventure, admiration, and freedom from rules, yet his adventures repeatedly force him to make difficult choices. He lies cleverly, but he also tells dangerous truths. He runs away, then returns to people he loves. The story treats childhood as a place where imagination and responsibility are constantly fighting with each other.",
    "translation": "Том хочет приключений, восхищения и свободы от правил, но его приключения снова и снова заставляют делать трудный выбор. Он ловко врёт, но также говорит опасную правду. Он сбегает, а потом возвращается к людям, которых любит. История показывает детство как пространство, где воображение и ответственность постоянно спорят друг с другом.",
    "glossary": [
      [
        "force him to",
        "заставлять его"
      ],
      [
        "difficult choices",
        "трудный выбор"
      ],
      [
        "tell the truth",
        "говорить правду"
      ],
      [
        "run away",
        "сбежать"
      ],
      [
        "fight with each other",
        "бороться друг с другом"
      ]
    ]
  },
  {
    "id": "g7-bones",
    "grade": 7,
    "cefr": "B1–B2",
    "country": "UK",
    "work": "Treasure Island",
    "author": "Robert Louis Stevenson",
    "title": "The Old Sailor",
    "minutes": 8,
    "text": "Jim Hawkins lives with his parents at the Admiral Benbow inn when an old sailor calling himself Billy Bones arrives. He pays Jim to watch for a one-legged seaman and spends his days drinking rum and frightening the guests with stories of piracy. Behind his rough behavior, however, there is obvious fear. Someone from his former life is looking for him.",
    "translation": "Джим Хокинс живёт с родителями в трактире «Адмирал Бенбоу», когда туда приезжает старый моряк, называющий себя Билли Бонс. Он платит Джиму за то, чтобы тот следил за одноногим моряком, а дни проводит за ромом и пугает постояльцев пиратскими историями. Но за грубым поведением заметен явный страх. Кто-то из его прежней жизни ищет его.",
    "glossary": [
      [
        "calling himself",
        "называющий себя"
      ],
      [
        "watch for",
        "высматривать"
      ],
      [
        "frighten the guests",
        "пугать гостей"
      ],
      [
        "rough behavior",
        "грубое поведение"
      ],
      [
        "former life",
        "прежняя жизнь"
      ]
    ]
  },
  {
    "id": "g7-map",
    "grade": 7,
    "cefr": "B1–B2",
    "country": "UK",
    "work": "Treasure Island",
    "author": "Robert Louis Stevenson",
    "title": "The Map",
    "minutes": 8,
    "text": "After Billy Bones dies, Jim and his mother open the sailor’s sea chest to recover money owed to them. Among the papers Jim finds a map marked with the location of buried treasure. Dr. Livesey and Squire Trelawney are fascinated. They decide to buy a ship and organize an expedition before anyone else can reach the island.",
    "translation": "После смерти Билли Бонса Джим и его мать открывают морской сундук, чтобы забрать причитающиеся им деньги. Среди бумаг Джим находит карту с отмеченным местом зарытого сокровища. Доктор Ливси и сквайр Трелони очарованы находкой. Они решают купить корабль и организовать экспедицию, пока кто-нибудь другой не добрался до острова первым.",
    "glossary": [
      [
        "sea chest",
        "морской сундук"
      ],
      [
        "owe money",
        "быть должным деньги"
      ],
      [
        "buried treasure",
        "зарытое сокровище"
      ],
      [
        "organize an expedition",
        "организовать экспедицию"
      ],
      [
        "before anyone else",
        "раньше кого-либо другого"
      ]
    ]
  },
  {
    "id": "g7-silver",
    "grade": 7,
    "cefr": "B2",
    "country": "UK",
    "work": "Treasure Island",
    "author": "Robert Louis Stevenson",
    "title": "Long John Silver",
    "minutes": 8,
    "text": "In Bristol, Jim meets Long John Silver, a cheerful one-legged cook who seems helpful and intelligent. Silver quickly wins the trust of nearly everyone. Jim notices how easily the man can change his manner depending on whom he is speaking to. At this stage, however, there is no clear reason to suspect that the friendly cook is connected to the pirates.",
    "translation": "В Бристоле Джим знакомится с Долговязым Джоном Сильвером — весёлым одноногим поваром, который кажется услужливым и умным. Сильвер быстро завоёвывает доверие почти всех. Джим замечает, как легко тот меняет манеру поведения в зависимости от собеседника. Но пока нет явной причины подозревать, что дружелюбный повар связан с пиратами.",
    "glossary": [
      [
        "win the trust",
        "завоевать доверие"
      ],
      [
        "depending on",
        "в зависимости от"
      ],
      [
        "at this stage",
        "на этом этапе"
      ],
      [
        "clear reason",
        "явная причина"
      ],
      [
        "be connected to",
        "быть связанным с"
      ]
    ]
  },
  {
    "id": "g7-apple-barrel",
    "grade": 7,
    "cefr": "B2",
    "country": "UK",
    "work": "Treasure Island",
    "author": "Robert Louis Stevenson",
    "title": "Inside the Apple Barrel",
    "minutes": 8,
    "text": "During the voyage Jim climbs into an almost empty apple barrel. Before he can get out, several sailors gather nearby. Hidden from view, Jim hears Silver reveal a plan for mutiny. Many members of the crew are former pirates, and they intend to seize the ship after the treasure is found. Jim waits until it is safe, then carries the warning to his friends.",
    "translation": "Во время плавания Джим забирается в почти пустую бочку из-под яблок. Прежде чем он успевает выбраться, рядом собираются несколько моряков. Скрытый от глаз, Джим слышит, как Сильвер раскрывает план мятежа. Многие члены команды — бывшие пираты, и они собираются захватить корабль после того, как найдут сокровище. Джим ждёт безопасного момента и предупреждает друзей.",
    "glossary": [
      [
        "hidden from view",
        "скрытый от глаз"
      ],
      [
        "reveal a plan",
        "раскрыть план"
      ],
      [
        "intend to",
        "намереваться"
      ],
      [
        "seize the ship",
        "захватить корабль"
      ],
      [
        "carry the warning",
        "передать предупреждение"
      ]
    ]
  },
  {
    "id": "g7-island",
    "grade": 7,
    "cefr": "B2",
    "country": "UK",
    "work": "Treasure Island",
    "author": "Robert Louis Stevenson",
    "title": "The Island",
    "minutes": 8,
    "text": "The island is hot, unfamiliar, and covered with dense vegetation. Jim goes ashore and soon becomes separated from the others. While exploring, he witnesses Silver’s friendliness vanish when a sailor refuses to join the mutiny. The discovery is terrifying: the charming cook is capable of sudden violence when persuasion fails.",
    "translation": "Остров жаркий, незнакомый и покрыт густой растительностью. Джим высаживается на берег и вскоре отделяется от остальных. Во время исследования он видит, как дружелюбие Сильвера исчезает, когда один матрос отказывается присоединиться к мятежу. Открытие пугает: обаятельный повар способен на внезапное насилие, когда убеждение не работает.",
    "glossary": [
      [
        "go ashore",
        "сойти на берег"
      ],
      [
        "become separated",
        "отделиться"
      ],
      [
        "witness",
        "стать свидетелем"
      ],
      [
        "refuse to join",
        "отказаться присоединиться"
      ],
      [
        "persuasion fails",
        "убеждение не срабатывает"
      ]
    ]
  },
  {
    "id": "g7-ben-gunn",
    "grade": 7,
    "cefr": "B2",
    "country": "UK",
    "work": "Treasure Island",
    "author": "Robert Louis Stevenson",
    "title": "Ben Gunn",
    "minutes": 8,
    "text": "Jim meets Ben Gunn, a sailor who has been stranded on the island for years. Ben speaks strangely after so much time alone, but he knows the island better than anyone. He hints that the treasure may not be where the map says it is. In exchange for help returning home, he is willing to assist Jim and the honest crew.",
    "translation": "Джим встречает Бена Ганна, моряка, который много лет живёт на острове после того, как его там оставили. Из-за долгого одиночества Бен говорит странно, зато знает остров лучше всех. Он намекает, что сокровище может находиться не там, где указано на карте. В обмен на помощь с возвращением домой он готов помочь Джиму и честной части команды.",
    "glossary": [
      [
        "be stranded",
        "оказаться брошенным"
      ],
      [
        "hint that",
        "намекать, что"
      ],
      [
        "may not be",
        "может не быть"
      ],
      [
        "in exchange for",
        "в обмен на"
      ],
      [
        "be willing to",
        "быть готовым"
      ]
    ]
  },
  {
    "id": "g7-stockade",
    "grade": 7,
    "cefr": "B2",
    "country": "UK",
    "work": "Treasure Island",
    "author": "Robert Louis Stevenson",
    "title": "The Stockade",
    "minutes": 8,
    "text": "The loyal sailors defend a wooden stockade while the mutineers control much of the island. Both sides are short of supplies and uncertain about what will happen next. Silver tries negotiation as readily as he uses threats. The adults discuss strategy, but Jim becomes impatient with waiting and begins making plans of his own.",
    "translation": "Верные моряки защищают деревянное укрепление, пока мятежники контролируют большую часть острова. Обеим сторонам не хватает припасов, и никто не знает, что произойдёт дальше. Сильвер так же охотно прибегает к переговорам, как и к угрозам. Взрослые обсуждают стратегию, но Джиму надоедает ждать, и он начинает строить собственные планы.",
    "glossary": [
      [
        "be short of",
        "испытывать нехватку"
      ],
      [
        "what will happen next",
        "что произойдёт дальше"
      ],
      [
        "as readily as",
        "так же охотно, как"
      ],
      [
        "be impatient with",
        "терять терпение из-за"
      ],
      [
        "plans of his own",
        "собственные планы"
      ]
    ]
  },
  {
    "id": "g7-ship",
    "grade": 7,
    "cefr": "B2",
    "country": "UK",
    "work": "Treasure Island",
    "author": "Robert Louis Stevenson",
    "title": "Jim Takes the Ship",
    "minutes": 8,
    "text": "Jim slips away from the stockade, finds Ben Gunn’s small boat, and reaches the Hispaniola. His plan is reckless, yet it succeeds in separating the ship from the pirates on shore. On board he faces another dangerous sailor and is wounded during the struggle. By the end of the episode, Jim has gained control of the ship but has also learned the cost of acting alone.",
    "translation": "Джим тайком уходит из укрепления, находит маленькую лодку Бена Ганна и добирается до «Испаньолы». Его план безрассуден, но ему удаётся отделить корабль от пиратов на берегу. На борту он сталкивается с ещё одним опасным моряком и получает ранение в драке. К концу эпизода Джим контролирует корабль, но также понимает цену самостоятельных рискованных решений.",
    "glossary": [
      [
        "slip away",
        "тайком уйти"
      ],
      [
        "reckless",
        "безрассудный"
      ],
      [
        "succeed in",
        "суметь, добиться"
      ],
      [
        "during the struggle",
        "во время борьбы"
      ],
      [
        "gain control",
        "получить контроль"
      ]
    ]
  },
  {
    "id": "g7-empty-pit",
    "grade": 7,
    "cefr": "B2",
    "country": "UK",
    "work": "Treasure Island",
    "author": "Robert Louis Stevenson",
    "title": "The Empty Treasure Pit",
    "minutes": 8,
    "text": "When Silver and the pirates finally reach the place marked on the map, the treasure pit is empty. Panic and anger spread through the group. Silver immediately changes sides again because he understands that his position has become dangerous. Then Jim’s friends appear, and the mystery becomes clear: Ben Gunn moved the treasure long ago.",
    "translation": "Когда Сильвер и пираты наконец добираются до места, отмеченного на карте, яма с сокровищем оказывается пустой. По группе распространяются паника и злость. Сильвер мгновенно снова меняет сторону, понимая, что его положение стало опасным. Затем появляются друзья Джима, и тайна раскрывается: Бен Ганн давно перенёс сокровище.",
    "glossary": [
      [
        "marked on the map",
        "отмеченный на карте"
      ],
      [
        "spread through",
        "распространяться по"
      ],
      [
        "change sides",
        "перейти на другую сторону"
      ],
      [
        "become dangerous",
        "стать опасным"
      ],
      [
        "long ago",
        "давно"
      ]
    ]
  },
  {
    "id": "g7-return",
    "grade": 7,
    "cefr": "B2",
    "country": "UK",
    "work": "Treasure Island",
    "author": "Robert Louis Stevenson",
    "title": "The Voyage Home",
    "minutes": 8,
    "text": "The surviving members of the expedition load the treasure onto the ship and sail home. Silver escapes with a small share of the gold before they arrive. Jim receives wealth, but the adventure has changed his idea of treasure. Gold is real, yet so are fear, betrayal, courage, and the memories that continue long after the coins are spent.",
    "translation": "Выжившие участники экспедиции грузят сокровище на корабль и отправляются домой. До прибытия Сильвер сбегает с небольшой частью золота. Джим получает богатство, но приключение изменило его представление о сокровищах. Золото реально, но столь же реальны страх, предательство, храбрость и воспоминания, которые остаются надолго после того, как монеты потрачены.",
    "glossary": [
      [
        "surviving members",
        "выжившие участники"
      ],
      [
        "a share of",
        "доля"
      ],
      [
        "receive wealth",
        "получить богатство"
      ],
      [
        "betrayal",
        "предательство"
      ],
      [
        "long after",
        "долго после"
      ]
    ]
  },
  {
    "id": "g8-christmas",
    "grade": 8,
    "cefr": "B2",
    "country": "US",
    "work": "Little Women",
    "author": "Louisa May Alcott",
    "title": "A Christmas Without Presents",
    "minutes": 9,
    "text": "The four March sisters begin the story complaining that Christmas will not feel like Christmas without presents. Their family has little money because their father is away serving as a chaplain during the Civil War. Yet the girls decide to spend their small savings on gifts for their mother rather than themselves. The choice establishes a pattern that runs throughout the novel: growing up means learning how personal wishes exist beside responsibility to other people.",
    "translation": "История четырёх сестёр Марч начинается с жалоб на то, что Рождество без подарков не похоже на Рождество. Денег у семьи мало, потому что отец служит капелланом во время Гражданской войны. Но девушки решают потратить свои небольшие сбережения на подарки матери, а не себе. Этот выбор задаёт тему всего романа: взросление означает понимание того, что личные желания существуют рядом с ответственностью перед другими.",
    "glossary": [
      [
        "little money",
        "мало денег"
      ],
      [
        "small savings",
        "небольшие сбережения"
      ],
      [
        "rather than",
        "а не"
      ],
      [
        "throughout the novel",
        "на протяжении романа"
      ],
      [
        "grow up",
        "взрослеть"
      ]
    ]
  },
  {
    "id": "g8-hummels",
    "grade": 8,
    "cefr": "B2",
    "country": "US",
    "work": "Little Women",
    "author": "Louisa May Alcott",
    "title": "Breakfast for the Hummels",
    "minutes": 9,
    "text": "On Christmas morning the sisters are ready to enjoy a special breakfast when their mother tells them about a poor family nearby. The March girls carry their food to the Hummels, who are cold and hungry. Giving up their own meal is not presented as effortless virtue; they are hungry too. The scene matters because generosity becomes a choice made in the presence of real inconvenience.",
    "translation": "Утром на Рождество сёстры собираются насладиться праздничным завтраком, когда мать рассказывает им о бедной семье неподалёку. Девушки Марч относят еду семье Хаммел, которая мёрзнет и голодает. Отказ от собственного завтрака не изображён как лёгкая добродетель — девушки тоже голодны. Эта сцена важна потому, что щедрость становится осознанным выбором, сделанным несмотря на реальные неудобства.",
    "glossary": [
      [
        "nearby",
        "неподалёку"
      ],
      [
        "give up",
        "отказаться от"
      ],
      [
        "effortless virtue",
        "добродетель без усилий"
      ],
      [
        "in the presence of",
        "при наличии, несмотря на"
      ],
      [
        "inconvenience",
        "неудобство"
      ]
    ]
  },
  {
    "id": "g8-laurie",
    "grade": 8,
    "cefr": "B2",
    "country": "US",
    "work": "Little Women",
    "author": "Louisa May Alcott",
    "title": "Meeting Laurie",
    "minutes": 9,
    "text": "Jo meets Theodore Laurence, usually called Laurie, at a party where both feel somewhat out of place. Their conversation is easier than the formal social behavior around them. Laurie is wealthy but lonely; Jo’s family has less money but an active, affectionate home. Their friendship grows partly because each sees in the other a freedom that seems missing from his or her own life.",
    "translation": "Джо знакомится с Теодором Лоренсом, которого обычно называют Лори, на вечере, где оба чувствуют себя немного не в своей тарелке. Разговаривать им легче, чем участвовать в формальных светских церемониях вокруг. Лори богат, но одинок; у семьи Джо меньше денег, зато дом живой и тёплый. Их дружба растёт отчасти потому, что каждый видит в другом свободу, которой не хватает в собственной жизни.",
    "glossary": [
      [
        "out of place",
        "не в своей тарелке"
      ],
      [
        "formal social behavior",
        "формальное светское поведение"
      ],
      [
        "affectionate",
        "тёплый, любящий"
      ],
      [
        "partly because",
        "отчасти потому что"
      ],
      [
        "seem missing",
        "казаться отсутствующим"
      ]
    ]
  },
  {
    "id": "g8-amy-fire",
    "grade": 8,
    "cefr": "B2",
    "country": "US",
    "work": "Little Women",
    "author": "Louisa May Alcott",
    "title": "Jo’s Manuscript",
    "minutes": 9,
    "text": "After an argument, Amy burns the handwritten book Jo has been working on for years. For Jo, the loss feels almost impossible to forgive because the pages represented private effort and ambition. Her anger toward Amy becomes dangerous during a later skating accident. The episode examines a difficult idea: emotions may be understandable and still lead to choices we deeply regret.",
    "translation": "После ссоры Эми сжигает рукописную книгу, над которой Джо работала годами. Для Джо эту потерю почти невозможно простить, потому что страницы воплощали её личный труд и мечты. Позже её злость на Эми становится опасной во время происшествия на льду. Эпизод исследует непростую мысль: эмоции могут быть понятными и всё же приводить к решениям, о которых мы сильно жалеем.",
    "glossary": [
      [
        "handwritten",
        "рукописный"
      ],
      [
        "impossible to forgive",
        "невозможно простить"
      ],
      [
        "represent effort",
        "воплощать труд"
      ],
      [
        "lead to",
        "приводить к"
      ],
      [
        "deeply regret",
        "сильно сожалеть"
      ]
    ]
  },
  {
    "id": "g8-newspaper",
    "grade": 8,
    "cefr": "B2",
    "country": "US",
    "work": "Little Women",
    "author": "Louisa May Alcott",
    "title": "Jo Sells a Story",
    "minutes": 9,
    "text": "Jo secretly submits a story to a newspaper and waits anxiously for an answer. When it is accepted, the payment is modest, but the event matters enormously to her. Writing is no longer only a private game; someone outside the family has valued her work. The experience strengthens her determination to become an author, even though the path ahead remains uncertain.",
    "translation": "Джо тайно отправляет рассказ в газету и тревожно ждёт ответа. Когда текст принимают, гонорар оказывается скромным, но событие имеет для неё огромное значение. Писательство теперь уже не просто личная игра: кто-то вне семьи оценил её работу. Этот опыт укрепляет её решимость стать писательницей, хотя путь впереди остаётся неопределённым.",
    "glossary": [
      [
        "submit a story",
        "отправить рассказ на публикацию"
      ],
      [
        "wait anxiously",
        "тревожно ждать"
      ],
      [
        "modest payment",
        "скромный гонорар"
      ],
      [
        "value her work",
        "оценить её работу"
      ],
      [
        "path ahead",
        "путь впереди"
      ]
    ]
  },
  {
    "id": "g8-beth",
    "grade": 8,
    "cefr": "B2",
    "country": "US",
    "work": "Little Women",
    "author": "Louisa May Alcott",
    "title": "Beth’s Illness",
    "minutes": 9,
    "text": "Beth becomes seriously ill after helping the Hummel family. The household changes immediately as fear replaces ordinary routines. Jo, who is usually energetic and impatient, must wait without being able to solve the problem. Beth eventually improves, but the illness leaves lasting effects. The episode introduces the sisters to the fact that love does not provide control over everything that can happen.",
    "translation": "Бет тяжело заболевает после помощи семье Хаммел. Жизнь дома мгновенно меняется: обычные дела вытесняет страх. Джо, обычно энергичная и нетерпеливая, вынуждена ждать, не имея возможности решить проблему. Бет в конце концов становится лучше, но болезнь оставляет последствия. Этот эпизод показывает сёстрам, что любовь не даёт контроля над всем, что может случиться.",
    "glossary": [
      [
        "seriously ill",
        "тяжело больной"
      ],
      [
        "ordinary routines",
        "обычные дела"
      ],
      [
        "without being able to",
        "не имея возможности"
      ],
      [
        "lasting effects",
        "долгие последствия"
      ],
      [
        "provide control",
        "давать контроль"
      ]
    ]
  },
  {
    "id": "g8-meg",
    "grade": 8,
    "cefr": "B2",
    "country": "US",
    "work": "Little Women",
    "author": "Louisa May Alcott",
    "title": "Meg Chooses Her Life",
    "minutes": 9,
    "text": "Meg once imagines that wealth and elegant society might solve many of life’s difficulties. As she matures, she chooses a modest marriage with John Brooke instead. Their home is not glamorous, and money sometimes causes tension, yet Meg learns that building an ordinary life requires practical effort. Alcott treats domestic responsibility not as the opposite of ambition, but as one possible form of it.",
    "translation": "Когда-то Мег думает, что богатство и светское общество могут решить многие жизненные трудности. Повзрослев, она выбирает скромный брак с Джоном Бруком. Их дом не роскошен, а деньги иногда вызывают напряжение, но Мег узнаёт, что создание обычной семейной жизни требует практических усилий. Олкотт показывает домашнюю ответственность не как противоположность амбициям, а как одну из их возможных форм.",
    "glossary": [
      [
        "as she matures",
        "по мере взросления"
      ],
      [
        "modest marriage",
        "скромный брак"
      ],
      [
        "cause tension",
        "вызывать напряжение"
      ],
      [
        "practical effort",
        "практические усилия"
      ],
      [
        "one possible form",
        "одна из возможных форм"
      ]
    ]
  },
  {
    "id": "g8-europe",
    "grade": 8,
    "cefr": "B2",
    "country": "US",
    "work": "Little Women",
    "author": "Louisa May Alcott",
    "title": "Amy in Europe",
    "minutes": 9,
    "text": "Amy travels to Europe with relatives and gains access to art, culture, and social opportunities she has long wanted. She is ambitious, but her ambitions differ from Jo’s. Amy thinks carefully about money, marriage, artistic talent, and the limits society places on women. Her development shows that practicality can be both a compromise and a form of intelligence.",
    "translation": "Эми едет в Европу с родственниками и получает доступ к искусству, культуре и светским возможностям, о которых давно мечтала. Она амбициозна, но её амбиции отличаются от амбиций Джо. Эми серьёзно размышляет о деньгах, браке, художественном таланте и ограничениях, которые общество накладывает на женщин. Её развитие показывает, что практичность может быть одновременно компромиссом и формой ума.",
    "glossary": [
      [
        "gain access to",
        "получить доступ к"
      ],
      [
        "differ from",
        "отличаться от"
      ],
      [
        "think carefully about",
        "тщательно обдумывать"
      ],
      [
        "place limits on",
        "накладывать ограничения"
      ],
      [
        "form of intelligence",
        "форма ума"
      ]
    ]
  },
  {
    "id": "g8-jo-laurie",
    "grade": 8,
    "cefr": "B2",
    "country": "US",
    "work": "Little Women",
    "author": "Louisa May Alcott",
    "title": "Jo Says No",
    "minutes": 9,
    "text": "Laurie eventually asks Jo to marry him, believing that their long friendship naturally points toward marriage. Jo refuses, even though she cares deeply about him. She understands that affection and compatibility are not exactly the same thing. Her refusal is painful for both of them, but the novel allows Jo to make a decision that does not satisfy the expectations of the people around her.",
    "translation": "В конце концов Лори просит Джо выйти за него, считая, что их долгая дружба естественно ведёт к браку. Джо отказывает, хотя очень дорожит им. Она понимает, что привязанность и совместимость — не одно и то же. Отказ причиняет боль обоим, но роман позволяет Джо принять решение, не соответствующее ожиданиям окружающих.",
    "glossary": [
      [
        "ask her to marry him",
        "предложить ей выйти замуж"
      ],
      [
        "care deeply about",
        "очень дорожить"
      ],
      [
        "not exactly the same",
        "не совсем одно и то же"
      ],
      [
        "painful for both",
        "болезненный для обоих"
      ],
      [
        "satisfy expectations",
        "соответствовать ожиданиям"
      ]
    ]
  },
  {
    "id": "g8-writing-life",
    "grade": 8,
    "cefr": "B2–C1",
    "country": "US",
    "work": "Little Women",
    "author": "Louisa May Alcott",
    "title": "A Life Built, Not Found",
    "minutes": 9,
    "text": "By the later part of the novel, the sisters’ childhood dreams have collided with work, grief, love, money, and compromise. Jo’s idea of success changes as she continues writing and creates a life that combines intellectual ambition with care for others. The novel does not offer a single model of adulthood. Instead, each sister develops through different choices, losses, and responsibilities.",
    "translation": "К поздней части романа детские мечты сестёр сталкиваются с работой, горем, любовью, деньгами и компромиссами. Представление Джо об успехе меняется: она продолжает писать и создаёт жизнь, в которой интеллектуальные амбиции сочетаются с заботой о других. Роман не предлагает единственной модели взрослой жизни. Вместо этого каждая сестра развивается через собственные выборы, потери и обязанности.",
    "glossary": [
      [
        "collide with",
        "столкнуться с"
      ],
      [
        "idea of success",
        "представление об успехе"
      ],
      [
        "combine with",
        "сочетать с"
      ],
      [
        "a single model",
        "единственная модель"
      ],
      [
        "develop through",
        "развиваться через"
      ]
    ]
  },
  {
    "id": "g9-buck",
    "grade": 9,
    "cefr": "B2",
    "country": "US",
    "work": "The Call of the Wild",
    "author": "Jack London",
    "title": "Buck’s Comfortable World",
    "minutes": 10,
    "text": "Buck begins life as a powerful, well-fed dog on a comfortable California estate. He has never needed to question his place in the world. The Klondike gold rush changes everything because strong dogs suddenly have commercial value in the North. When a gardener secretly sells him, Buck is removed from the only environment he has ever known and thrown into a system ruled by force.",
    "translation": "В начале истории Бак — сильный, сытый пёс, живущий в комфорте калифорнийского поместья. Ему никогда не приходилось задумываться о своём месте в мире. Золотая лихорадка на Клондайке всё меняет, потому что сильные собаки внезапно становятся ценным товаром на Севере. Когда садовник тайно продаёт его, Бака вырывают из единственной знакомой среды и бросают в систему, где правит сила.",
    "glossary": [
      [
        "well-fed",
        "сытый"
      ],
      [
        "commercial value",
        "коммерческая ценность"
      ],
      [
        "secretly sell",
        "тайно продать"
      ],
      [
        "be removed from",
        "быть вырванным из"
      ],
      [
        "ruled by force",
        "управляемый силой"
      ]
    ]
  },
  {
    "id": "g9-club",
    "grade": 9,
    "cefr": "B2",
    "country": "US",
    "work": "The Call of the Wild",
    "author": "Jack London",
    "title": "The Law of Club",
    "minutes": 10,
    "text": "After resisting captivity, Buck meets a man who controls him with a club. The experience teaches a brutal lesson: physical strength alone does not guarantee victory. Buck does not become obedient in spirit, but he learns to observe power before challenging it. London presents this adaptation as the beginning of Buck’s transformation from a protected domestic animal into a survivor.",
    "translation": "Сопротивляясь плену, Бак сталкивается с человеком, который подчиняет его дубинкой. Этот опыт даёт жестокий урок: одной физической силы недостаточно для победы. Внутренне Бак не становится покорным, но учится оценивать чужую силу, прежде чем бросать ей вызов. Лондон показывает эту адаптацию как начало превращения домашнего пса в выжившего.",
    "glossary": [
      [
        "resist captivity",
        "сопротивляться плену"
      ],
      [
        "brutal lesson",
        "жестокий урок"
      ],
      [
        "guarantee victory",
        "гарантировать победу"
      ],
      [
        "in spirit",
        "внутренне"
      ],
      [
        "transformation",
        "превращение"
      ]
    ]
  },
  {
    "id": "g9-snow",
    "grade": 9,
    "cefr": "B2",
    "country": "US",
    "work": "The Call of the Wild",
    "author": "Jack London",
    "title": "Snow for the First Time",
    "minutes": 10,
    "text": "When Buck first sees snow, he is confused by the cold white substance beneath his feet. The northern world is filled with unfamiliar rules, from sleeping beneath the snow to protecting food from other dogs. He learns quickly because mistakes have immediate consequences. Intelligence, in this environment, means noticing patterns and changing behavior before the same danger happens twice.",
    "translation": "Когда Бак впервые видит снег, холодное белое вещество под лапами ставит его в тупик. Мир Севера полон незнакомых правил: от сна под снегом до необходимости защищать еду от других собак. Он учится быстро, потому что ошибки имеют немедленные последствия. В такой среде ум означает способность замечать закономерности и менять поведение до того, как опасность повторится.",
    "glossary": [
      [
        "for the first time",
        "впервые"
      ],
      [
        "be filled with",
        "быть наполненным"
      ],
      [
        "immediate consequences",
        "немедленные последствия"
      ],
      [
        "notice patterns",
        "замечать закономерности"
      ],
      [
        "happen twice",
        "случиться дважды"
      ]
    ]
  },
  {
    "id": "g9-team",
    "grade": 9,
    "cefr": "B2",
    "country": "US",
    "work": "The Call of the Wild",
    "author": "Jack London",
    "title": "Learning the Team",
    "minutes": 10,
    "text": "Buck becomes a sled dog and must learn not only to pull but to function inside a strict social order. Experienced dogs teach him through example, rivalry, and punishment. He discovers when cooperation is necessary and when competition cannot be avoided. His old habits disappear because the new environment rewards alertness, endurance, and the ability to read both animals and people.",
    "translation": "Бак становится ездовой собакой и должен научиться не только тянуть упряжку, но и действовать внутри строгой иерархии. Опытные собаки учат его примером, соперничеством и наказанием. Он понимает, когда сотрудничество необходимо, а когда конкуренции не избежать. Старые привычки исчезают, потому что новая среда вознаграждает внимательность, выносливость и умение понимать и животных, и людей.",
    "glossary": [
      [
        "function inside",
        "действовать внутри"
      ],
      [
        "strict social order",
        "строгая иерархия"
      ],
      [
        "cannot be avoided",
        "нельзя избежать"
      ],
      [
        "reward alertness",
        "вознаграждать внимательность"
      ],
      [
        "endurance",
        "выносливость"
      ]
    ]
  },
  {
    "id": "g9-spitz",
    "grade": 9,
    "cefr": "B2",
    "country": "US",
    "work": "The Call of the Wild",
    "author": "Jack London",
    "title": "Buck and Spitz",
    "minutes": 10,
    "text": "Spitz, the lead dog, sees Buck as a growing threat. Their rivalry develops gradually rather than through one sudden conflict. Buck gains influence among the team, while Spitz relies on his established authority. Eventually the struggle becomes direct and violent. When Buck wins, he claims the lead position, proving that he has learned the harsh rules of the world he entered.",
    "translation": "Шпиц, ведущая собака упряжки, видит в Баке растущую угрозу. Их соперничество развивается постепенно, а не вспыхивает в одном внезапном конфликте. Бак приобретает влияние в команде, тогда как Шпиц опирается на уже установленный авторитет. В конце концов борьба становится прямой и жестокой. Победив, Бак занимает место лидера и доказывает, что усвоил суровые правила нового мира.",
    "glossary": [
      [
        "growing threat",
        "растущая угроза"
      ],
      [
        "develop gradually",
        "развиваться постепенно"
      ],
      [
        "gain influence",
        "приобретать влияние"
      ],
      [
        "rely on",
        "опираться на"
      ],
      [
        "claim the lead position",
        "занять место лидера"
      ]
    ]
  },
  {
    "id": "g9-leader",
    "grade": 9,
    "cefr": "B2",
    "country": "US",
    "work": "The Call of the Wild",
    "author": "Jack London",
    "title": "A Better Lead Dog",
    "minutes": 10,
    "text": "As leader, Buck surprises the men by improving the entire team’s performance. He is demanding, but he understands the strengths of the dogs around him. Under his leadership the sled travels efficiently and the team works with greater unity. The episode complicates the idea of power: Buck leads successfully not merely because he is stronger, but because he reads the group well.",
    "translation": "Став лидером, Бак удивляет людей тем, что улучшает работу всей упряжки. Он требователен, но понимает сильные стороны окружающих собак. Под его руководством сани движутся эффективнее, а команда работает более слаженно. Этот эпизод усложняет представление о власти: Бак успешно ведёт остальных не только потому, что сильнее, но и потому, что хорошо понимает группу.",
    "glossary": [
      [
        "improve performance",
        "улучшить результат"
      ],
      [
        "under his leadership",
        "под его руководством"
      ],
      [
        "greater unity",
        "большее единство"
      ],
      [
        "complicate the idea",
        "усложнить представление"
      ],
      [
        "merely because",
        "только потому что"
      ]
    ]
  },
  {
    "id": "g9-bad-masters",
    "grade": 9,
    "cefr": "B2–C1",
    "country": "US",
    "work": "The Call of the Wild",
    "author": "Jack London",
    "title": "Bad Masters",
    "minutes": 10,
    "text": "Buck later falls into the hands of inexperienced owners who carry too much equipment and misunderstand the demands of northern travel. They treat planning as if optimism could replace knowledge. The dogs become exhausted and hungry while the people continue making poor decisions. Their failure contrasts sharply with earlier drivers who respected the environment and understood the limits of the team.",
    "translation": "Позже Бак попадает к неопытным хозяевам, которые везут слишком много вещей и не понимают требований северного путешествия. Они ведут себя так, будто оптимизм может заменить знания и планирование. Собаки истощаются и голодают, пока люди продолжают принимать плохие решения. Их неудача резко контрастирует с прежними погонщиками, которые уважали среду и знали пределы возможностей команды.",
    "glossary": [
      [
        "fall into the hands of",
        "попасть в руки"
      ],
      [
        "too much equipment",
        "слишком много снаряжения"
      ],
      [
        "replace knowledge",
        "заменить знания"
      ],
      [
        "become exhausted",
        "истощиться"
      ],
      [
        "contrast sharply with",
        "резко контрастировать с"
      ]
    ]
  },
  {
    "id": "g9-thornton",
    "grade": 9,
    "cefr": "B2–C1",
    "country": "US",
    "work": "The Call of the Wild",
    "author": "Jack London",
    "title": "John Thornton",
    "minutes": 10,
    "text": "John Thornton saves Buck when the exhausted dog is being forced to continue a dangerous journey. For the first time since leaving California, Buck develops a deep personal attachment to a human. He is still independent and increasingly drawn to the wilderness, yet his loyalty to Thornton is intense. The bond shows that Buck’s return to instinct does not simply erase his capacity for affection.",
    "translation": "Джон Торнтон спасает Бака, когда измученную собаку заставляют продолжать опасный путь. Впервые после Калифорнии у Бака возникает глубокая личная привязанность к человеку. Он остаётся независимым и всё сильнее тянется к дикой природе, но его преданность Торнтону огромна. Эта связь показывает, что возвращение к инстинктам не стирает способность Бака к привязанности.",
    "glossary": [
      [
        "be forced to continue",
        "быть вынужденным продолжать"
      ],
      [
        "deep attachment",
        "глубокая привязанность"
      ],
      [
        "be drawn to",
        "тянуться к"
      ],
      [
        "intense loyalty",
        "сильная преданность"
      ],
      [
        "erase his capacity",
        "стереть способность"
      ]
    ]
  },
  {
    "id": "g9-call",
    "grade": 9,
    "cefr": "B2–C1",
    "country": "US",
    "work": "The Call of the Wild",
    "author": "Jack London",
    "title": "The Call",
    "minutes": 10,
    "text": "As Buck grows stronger, he spends longer periods away from camp, following tracks and listening to sounds in the forest. The wilderness feels less like an unknown place and more like a forgotten home. He encounters a wolf and experiences a powerful desire to follow it. Only his attachment to Thornton repeatedly draws him back to human society.",
    "translation": "По мере того как Бак крепнет, он всё дольше отсутствует в лагере, идёт по следам и слушает звуки леса. Дикая природа всё меньше кажется неизвестным местом и всё больше — забытым домом. Он встречает волка и испытывает сильное желание последовать за ним. Лишь привязанность к Торнтону снова и снова возвращает его к людям.",
    "glossary": [
      [
        "spend longer periods",
        "проводить более долгие периоды"
      ],
      [
        "follow tracks",
        "идти по следам"
      ],
      [
        "forgotten home",
        "забытый дом"
      ],
      [
        "desire to follow",
        "желание последовать"
      ],
      [
        "draw him back",
        "возвращать, притягивать обратно"
      ]
    ]
  },
  {
    "id": "g9-wild",
    "grade": 9,
    "cefr": "B2–C1",
    "country": "US",
    "work": "The Call of the Wild",
    "author": "Jack London",
    "title": "Into the Wild",
    "minutes": 10,
    "text": "After Thornton is killed, Buck’s strongest tie to human life is gone. Grief first drives him toward violent revenge, but afterward there is nothing left to call him back. He joins wolves and becomes part of the wilderness that once frightened and confused him. The ending completes a reversal: the civilized dog has not merely survived the wild; he has become inseparable from it.",
    "translation": "После гибели Торнтона исчезает самая сильная связь Бака с человеческой жизнью. Сначала горе толкает его к жестокой мести, но затем уже ничто не зовёт его назад. Он присоединяется к волкам и становится частью дикой природы, которая когда-то пугала и озадачивала его. Финал завершает переворот: домашний пёс не просто выжил в дикой среде — он стал неотделим от неё.",
    "glossary": [
      [
        "tie to human life",
        "связь с человеческой жизнью"
      ],
      [
        "drive him toward",
        "толкнуть его к"
      ],
      [
        "call him back",
        "позвать его назад"
      ],
      [
        "become part of",
        "стать частью"
      ],
      [
        "inseparable from",
        "неотделимый от"
      ]
    ]
  },
  {
    "id": "g10-marshes",
    "grade": 10,
    "cefr": "B2–C1",
    "country": "UK",
    "work": "Great Expectations",
    "author": "Charles Dickens",
    "title": "A Stranger in the Marshes",
    "minutes": 11,
    "text": "Pip, an orphan raised by his sister and her kind husband Joe, encounters an escaped convict in the lonely marshes near his village. The man frightens Pip into bringing food and a file, yet Pip also notices his hunger, cold, and desperation. Fear therefore becomes mixed with pity. This early encounter establishes a moral problem that will return throughout the novel: social labels often hide the complexity of individual human beings.",
    "translation": "Пип, сирота, которого воспитывают сестра и её добрый муж Джо, встречает беглого каторжника на одиноких болотах возле деревни. Мужчина пугает Пипа и заставляет принести еду и напильник, но мальчик также замечает его голод, холод и отчаяние. Поэтому страх смешивается с жалостью. Эта ранняя встреча задаёт нравственную проблему всего романа: социальные ярлыки часто скрывают сложность конкретного человека.",
    "glossary": [
      [
        "escaped convict",
        "беглый каторжник"
      ],
      [
        "frighten into",
        "запугиванием заставить"
      ],
      [
        "be mixed with",
        "смешиваться с"
      ],
      [
        "establish a problem",
        "задать проблему"
      ],
      [
        "social labels",
        "социальные ярлыки"
      ]
    ]
  },
  {
    "id": "g10-satis",
    "grade": 10,
    "cefr": "B2–C1",
    "country": "UK",
    "work": "Great Expectations",
    "author": "Charles Dickens",
    "title": "Satis House",
    "minutes": 11,
    "text": "Pip is invited to Satis House, where the wealthy Miss Havisham lives surrounded by the remains of a wedding that never happened. There he meets Estella, who treats him with open contempt for his rough hands, thick boots, and lack of education. Pip leaves ashamed of things that had never troubled him before. His ambition begins not with a positive dream but with the painful desire to escape his own class.",
    "translation": "Пипа приглашают в дом Сатис, где богатая мисс Хэвишем живёт среди остатков свадьбы, которая так и не состоялась. Там он встречает Эстеллу, которая открыто презирает его грубые руки, тяжёлые ботинки и недостаток образования. Пип уходит, стыдясь того, что раньше его совершенно не беспокоило. Его амбиции начинаются не с позитивной мечты, а с болезненного желания вырваться из собственного класса.",
    "glossary": [
      [
        "surrounded by",
        "окружённый"
      ],
      [
        "open contempt",
        "открытое презрение"
      ],
      [
        "lack of education",
        "недостаток образования"
      ],
      [
        "had never troubled him",
        "раньше не беспокоило"
      ],
      [
        "escape his class",
        "вырваться из своего класса"
      ]
    ]
  },
  {
    "id": "g10-apprentice",
    "grade": 10,
    "cefr": "C1",
    "country": "UK",
    "work": "Great Expectations",
    "author": "Charles Dickens",
    "title": "Joe’s Apprentice",
    "minutes": 11,
    "text": "Pip becomes Joe’s apprentice at the forge, a future that once seemed natural and honorable. After meeting Estella, however, he experiences the work differently. Joe’s simplicity, which is actually connected to patience and moral strength, begins to embarrass him. Dickens makes the reader see a gap between Pip’s growing social judgment and the genuine worth of the people he is learning to look down on.",
    "translation": "Пип становится учеником Джо в кузнице — будущее, которое раньше казалось ему естественным и достойным. Но после встречи с Эстеллой он воспринимает эту работу иначе. Простота Джо, на самом деле связанная с терпением и нравственной силой, начинает смущать Пипа. Диккенс заставляет читателя увидеть разрыв между растущими социальными предрассудками Пипа и подлинной ценностью людей, на которых он учится смотреть свысока.",
    "glossary": [
      [
        "seem natural",
        "казаться естественным"
      ],
      [
        "experience differently",
        "воспринимать иначе"
      ],
      [
        "be connected to",
        "быть связанным с"
      ],
      [
        "genuine worth",
        "подлинная ценность"
      ],
      [
        "look down on",
        "смотреть свысока"
      ]
    ]
  },
  {
    "id": "g10-expectations",
    "grade": 10,
    "cefr": "C1",
    "country": "UK",
    "work": "Great Expectations",
    "author": "Charles Dickens",
    "title": "Great Expectations",
    "minutes": 11,
    "text": "A lawyer named Jaggers arrives with astonishing news: an unknown benefactor will provide Pip with money so that he can be educated as a gentleman in London. Pip immediately assumes that Miss Havisham is behind the plan and that Estella may somehow be part of his future. Nothing in the agreement actually confirms this belief. His expectations are therefore built as much on imagination and vanity as on fact.",
    "translation": "Адвокат Джеггерс приезжает с поразительной новостью: неизвестный благодетель будет давать Пипу деньги, чтобы тот получил образование джентльмена в Лондоне. Пип сразу предполагает, что за планом стоит мисс Хэвишем и что Эстелла каким-то образом станет частью его будущего. В соглашении это никак не подтверждается. Поэтому ожидания Пипа основаны на воображении и тщеславии не меньше, чем на фактах.",
    "glossary": [
      [
        "unknown benefactor",
        "неизвестный благодетель"
      ],
      [
        "provide with money",
        "обеспечивать деньгами"
      ],
      [
        "assume",
        "предполагать"
      ],
      [
        "confirm a belief",
        "подтвердить убеждение"
      ],
      [
        "as much on",
        "в такой же степени на"
      ]
    ]
  },
  {
    "id": "g10-london",
    "grade": 10,
    "cefr": "C1",
    "country": "UK",
    "work": "Great Expectations",
    "author": "Charles Dickens",
    "title": "Becoming a Gentleman",
    "minutes": 11,
    "text": "In London Pip acquires clothes, lessons, acquaintances, and expensive habits that appear to match his new status. Yet refinement proves easier to imitate than wisdom. He spends beyond his means and becomes increasingly uncomfortable around Joe. The more determined he is to distance himself from his origins, the more clearly the novel exposes the moral cost of that distance.",
    "translation": "В Лондоне Пип приобретает одежду, получает уроки, заводит знакомства и дорогие привычки, соответствующие его новому статусу. Но оказывается, что внешнюю утончённость легче изобразить, чем настоящую мудрость. Он живёт не по средствам и всё сильнее чувствует неловкость рядом с Джо. Чем упорнее Пип отдаляется от своего происхождения, тем яснее роман показывает нравственную цену этой дистанции.",
    "glossary": [
      [
        "acquire",
        "приобретать"
      ],
      [
        "match his status",
        "соответствовать статусу"
      ],
      [
        "beyond his means",
        "не по средствам"
      ],
      [
        "distance himself from",
        "отдалиться от"
      ],
      [
        "moral cost",
        "нравственная цена"
      ]
    ]
  },
  {
    "id": "g10-joe-visit",
    "grade": 10,
    "cefr": "C1",
    "country": "UK",
    "work": "Great Expectations",
    "author": "Charles Dickens",
    "title": "Joe Visits London",
    "minutes": 11,
    "text": "When Joe visits Pip in London, he feels uncomfortable in the unfamiliar setting and speaks awkwardly. Pip is embarrassed instead of grateful, even though Joe has shown him years of unquestioning kindness. After Joe leaves, Pip recognizes at least part of his own behavior. The scene is painful because the social improvement Pip wanted has made him temporarily worse at recognizing real dignity.",
    "translation": "Когда Джо приезжает к Пипу в Лондон, он чувствует себя неуютно в незнакомой обстановке и говорит неловко. Пип испытывает стыд вместо благодарности, хотя Джо годами относился к нему с безусловной добротой. После его ухода Пип хотя бы отчасти осознаёт собственное поведение. Сцена болезненна потому, что желанное социальное возвышение временно сделало Пипа хуже в распознавании настоящего достоинства.",
    "glossary": [
      [
        "unfamiliar setting",
        "незнакомая обстановка"
      ],
      [
        "instead of grateful",
        "вместо благодарности"
      ],
      [
        "unquestioning kindness",
        "безусловная доброта"
      ],
      [
        "recognize behavior",
        "осознать поведение"
      ],
      [
        "real dignity",
        "настоящее достоинство"
      ]
    ]
  },
  {
    "id": "g10-magwitch",
    "grade": 10,
    "cefr": "C1",
    "country": "UK",
    "work": "Great Expectations",
    "author": "Charles Dickens",
    "title": "The Real Benefactor",
    "minutes": 11,
    "text": "Pip’s entire understanding of his future collapses when the convict from the marshes, Magwitch, returns and reveals that he is the secret benefactor. The money Pip associated with Miss Havisham, refinement, and Estella actually came from a transported criminal who remembered a child’s act of kindness. Pip’s first response is horror. Gradually, however, he is forced to reconsider both Magwitch and the hierarchy of values he has accepted.",
    "translation": "Всё представление Пипа о собственном будущем рушится, когда каторжник с болот, Мэгвич, возвращается и признаётся, что именно он тайный благодетель. Деньги, которые Пип связывал с мисс Хэвишем, утончённостью и Эстеллой, на самом деле пришли от сосланного преступника, запомнившего детский поступок доброты. Первая реакция Пипа — ужас. Но постепенно он вынужден переосмыслить и Мэгвича, и принятую им систему ценностей.",
    "glossary": [
      [
        "collapse",
        "рухнуть"
      ],
      [
        "reveal",
        "раскрыть"
      ],
      [
        "associate with",
        "связывать с"
      ],
      [
        "first response",
        "первая реакция"
      ],
      [
        "reconsider",
        "переосмыслить"
      ]
    ]
  },
  {
    "id": "g10-help-magwitch",
    "grade": 10,
    "cefr": "C1",
    "country": "UK",
    "work": "Great Expectations",
    "author": "Charles Dickens",
    "title": "A Different Kind of Loyalty",
    "minutes": 11,
    "text": "Because Magwitch will be arrested if he is discovered in England, Pip and Herbert plan an escape for him. Pip’s relationship with the man has changed from disgust to loyalty and compassion. Helping Magwitch now brings no social advantage; in fact, it threatens Pip’s safety and fortune. That reversal gives the action moral weight: Pip finally acts for another person without imagining how the act will improve his own position.",
    "translation": "Поскольку Мэгвича арестуют, если обнаружат в Англии, Пип и Герберт планируют его побег. Отношение Пипа к нему меняется от отвращения к верности и состраданию. Помощь Мэгвичу теперь не даёт никакой социальной выгоды; наоборот, она угрожает безопасности и состоянию Пипа. Именно этот переворот придаёт поступку нравственный вес: Пип наконец действует ради другого человека, не думая о том, как это улучшит его собственное положение.",
    "glossary": [
      [
        "plan an escape",
        "планировать побег"
      ],
      [
        "change from ... to",
        "измениться от ... к"
      ],
      [
        "social advantage",
        "социальная выгода"
      ],
      [
        "in fact",
        "на самом деле"
      ],
      [
        "moral weight",
        "нравственный вес"
      ]
    ]
  },
  {
    "id": "g10-loss",
    "grade": 10,
    "cefr": "C1",
    "country": "UK",
    "work": "Great Expectations",
    "author": "Charles Dickens",
    "title": "Losing the Fortune",
    "minutes": 11,
    "text": "The attempt to save Magwitch fails, and the fortune connected to him is lost. Pip also becomes seriously ill and discovers that many of the relationships built around status cannot support him when his status disappears. Joe comes to care for him and quietly pays his debts. The contrast is unmistakable: the person Pip once felt ashamed of behaves with a generosity that money and education never guaranteed.",
    "translation": "Попытка спасти Мэгвича терпит неудачу, и связанное с ним состояние оказывается потеряно. Пип тяжело заболевает и обнаруживает, что многие отношения, построенные вокруг статуса, не способны поддержать его, когда статус исчезает. Джо приезжает ухаживать за ним и незаметно выплачивает его долги. Контраст очевиден: человек, которого Пип когда-то стыдился, проявляет щедрость, которую деньги и образование никогда не гарантировали.",
    "glossary": [
      [
        "attempt fails",
        "попытка проваливается"
      ],
      [
        "be seriously ill",
        "тяжело заболеть"
      ],
      [
        "built around status",
        "построенный вокруг статуса"
      ],
      [
        "pay his debts",
        "оплатить его долги"
      ],
      [
        "unmistakable",
        "очевидный, несомненный"
      ]
    ]
  },
  {
    "id": "g10-expectations-end",
    "grade": 10,
    "cefr": "C1",
    "country": "UK",
    "work": "Great Expectations",
    "author": "Charles Dickens",
    "title": "What Was Truly Valuable",
    "minutes": 11,
    "text": "By the end of Pip’s development, “great expectations” no longer mean wealth, fashionable manners, or a predetermined romantic future. His education has been costly because much of it came through shame, error, and loss. Yet he has learned to distinguish appearance from character more clearly. Dickens leaves us with a social lesson and a personal one: changing circumstances matter, but learning what deserves respect matters more.",
    "translation": "К завершению развития Пипа «большие надежды» уже не означают богатство, модные манеры или заранее определённое романтическое будущее. Его образование оказалось дорогим, потому что значительная часть уроков пришла через стыд, ошибки и потери. Но он научился яснее отличать внешность от характера. Диккенс оставляет и общественный, и личный урок: обстоятельства важны, но ещё важнее научиться понимать, что действительно заслуживает уважения.",
    "glossary": [
      [
        "by the end",
        "к концу"
      ],
      [
        "predetermined",
        "заранее определённый"
      ],
      [
        "come through",
        "прийти через"
      ],
      [
        "distinguish from",
        "отличать от"
      ],
      [
        "deserve respect",
        "заслуживать уважения"
      ]
    ]
  }
]

export function readingsForGrade(grade:number){return readingLibrary.filter(item=>item.grade===grade)}
