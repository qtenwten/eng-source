import type { ItemKind,LearningItem } from '../types'

export type LexiconRow = readonly [
  answer:string,
  translation:string,
  example:string,
  exampleTranslation:string,
  kind?:ItemKind,
  tags?:readonly string[],
]

function slug(value:string){
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/['’]/g,'')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'')
}

export function buildLexiconPack(packId:string,level:string,rows:readonly LexiconRow[]):LearningItem[]{
  return rows.map((row,index)=>{
    const[answer,translation,example,exampleTranslation,kind='word',extraTags=[]]=row
    return{
      id:`${kind}-${packId}-${String(index+1).padStart(3,'0')}-${slug(answer)}`,
      kind,
      prompt:translation,
      answer,
      translation,
      example,
      exampleTranslation,
      tags:[level,'curated',...extraTags],
    }
  })
}
