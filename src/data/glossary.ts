const glosses: Record<string,string> = {
  a:'неопределённый артикль', about:'о; насчёт', achieve:'достичь', advice:'совет', after:'после', already:'уже', an:'неопределённый артикль', awkward:'неловкий; неудобный',
  be:'быть', been:'был / бывал — форма be', before:'перед; до', booking:'бронирование', but:'но', by:'к; не позднее', café:'кафе', call:'позвонить', care:'забота; дело',
  causing:'вызывая; становясь причиной', changed:'изменился', closed:'закрыт; закрыто', decision:'решение', depends:'зависит', "don't":'не; не надо — do not', earlier:'раньше', easier:'легче; проще',
  else:'ещё; другой', english:'английский', eventually:'в конце концов; со временем', expected:'ожидали', figured:'разобрался; понял', finally:'наконец', finish:'заканчивать', friday:'пятница',
  gone:'ушёл / ушла; уехал / уехала — V3 go', him:'ему; его', home:'домой; дома', how:'как', i:'я', "i'll":'я буду / я… — I will', "i've":'я… — I have', in:'в', instead:'вместо этого',
  is:'есть; является', it:'это; оно', late:'поздно', make:'делать; в make a decision — принимать', making:'делая; принимая', more:'больше', most:'самый; наиболее', much:'намного; гораздо', need:'нужно; нуждаться',
  now:'сейчас', of:'из; от; о', on:'на; от; по', one:'один; один из', out:'наружу; часть фразовых глаголов', people:'люди', plan:'план', probably:'вероятно; скорее всего', problem:'проблема',
  question:'вопрос', reading:'чтение; читая', recently:'недавно; в последнее время', reliable:'надёжный', she:'она', "she's":'она… — she is / she has', silence:'тишина; молчание', so:'поэтому; так что',
  somewhere:'куда-то; где-то', sought:'искал / искали — V2/V3 seek', stay:'оставаться', supposed:'предполагалось; должен был', system:'система', take:'брать; в take care of — заняться / позаботиться',
  team:'команда', than:'чем', the:'определённый артикль', there:'там; в there was — было', they:'они', to:'к; чтобы; частица инфинитива', tonight:'сегодня вечером', turned:'повернулся; в turn out — оказалось',
  used:'использовал; в used to — раньше обычно', want:'хотеть', was:'был; была', we:'мы', went:'пошёл / пошла / поехал — V2 go', what:'что; какой', work:'работать; работа', works:'работает', worry:'переживать; беспокоиться', you:'ты; вы'
}

export function glossForToken(token:string){
  const key=token.toLocaleLowerCase('en-US').replace(/[’‘]/g,"'")
  return glosses[key]??'Перевод для этого слова пока не добавлен.'
}
