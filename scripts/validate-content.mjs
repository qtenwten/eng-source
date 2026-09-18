import fs from 'node:fs'
import path from 'node:path'

const root=process.cwd()
const lexicalObjectFiles=['coreLexicon.ts','extendedLexicon.ts']
const lexicalPackFiles=['lexiconA1.ts','lexiconA2.ts','lexiconB1.ts','lexiconB2.ts']
const dataDir=path.join(root,'src','data')

function read(name){return fs.readFileSync(path.join(dataDir,name),'utf8')}
function norm(value){return value.toLowerCase().replace(/[’‘]/g,"'").replace(/[.,!?]$/,'').trim().replace(/\s+/g,' ')}
function assert(condition,message){if(!condition)throw new Error(message)}

const lexical=[]
for(const name of lexicalObjectFiles){
  const text=read(name)
  const objects=[...text.matchAll(/\{id:"([^"]+)"[^\n]*?answer:"([^"]+)"[^\n]*?translation:"([^"]+)"[^\n]*?example:"([^"]+)"[^\n]*?exampleTranslation:"([^"]+)"/g)]
  assert(objects.length>0,`${name}: no learning objects parsed`)
  for(const match of objects){
    const[,id,answer,translation,example,exampleTranslation]=match
    lexical.push({source:name,id,answer,translation,example,exampleTranslation})
  }
}

for(const name of lexicalPackFiles){
  const lines=read(name).split(/\r?\n/).filter(line=>line.startsWith('["'))
  assert(lines.length>0,`${name}: no pack rows parsed`)
  lines.forEach((line,index)=>{
    const tokens=line.match(/"(?:\\.|[^"\\])*"/g)??[]
    assert(tokens.length>=4,`${name}:${index+1}: row must contain answer, translation and bilingual example`)
    const values=tokens.slice(0,4).map(token=>JSON.parse(token))
    const[answer,translation,example,exampleTranslation]=values
    lexical.push({source:name,id:`${name}:${index+1}`,answer,translation,example,exampleTranslation})
  })
}

const byAnswer=new Map()
for(const item of lexical){
  assert(item.answer.trim(),`${item.source}: empty answer`)
  assert(item.translation.trim(),`${item.source}: ${item.answer} has no Russian translation`)
  assert(item.example.trim(),`${item.source}: ${item.answer} has no English example`)
  assert(item.exampleTranslation.trim(),`${item.source}: ${item.answer} has no Russian example translation`)
  const key=norm(item.answer)
  const previous=byAnswer.get(key)
  assert(!previous,`Duplicate lexical answer "${item.answer}" in ${previous?.source} and ${item.source}`)
  byAnswer.set(key,item)
}

const verbsText=read('irregularVerbs.ts')
const verbRows=[...verbsText.matchAll(/\{base:"([^"]+)",past:"([^"]+)",participle:"([^"]+)",translation:"([^"]+)",level:"([^"]+)",example:"([^"]+)",exampleTranslation:"([^"]+)"\}/g)]
assert(verbRows.length>=80,`Irregular verb table unexpectedly small: ${verbRows.length}`)
const verbBases=new Set()
for(const match of verbRows){
  const[,base,past,participle,translation,level,example,exampleTranslation]=match
  assert(base&&past&&participle&&translation&&level&&example&&exampleTranslation,`Incomplete irregular verb row for ${base||'unknown'}`)
  const key=norm(base)
  assert(!verbBases.has(key),`Duplicate irregular verb base: ${base}`)
  verbBases.add(key)
}

const total=lexical.length+verbRows.length
assert(total>=1000,`Learning bank unexpectedly small: ${total}`)

console.log(`Content validation OK: ${lexical.length} lexical items + ${verbRows.length} irregular verbs = ${total} total learning items.`)
