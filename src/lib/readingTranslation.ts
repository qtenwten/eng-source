const cacheKey='seng-reading-online-dictionary-v1'
const maxCacheEntries=3000
const endpoint='https://api.mymemory.translated.net/get'

type CacheRecord={translation:string;updatedAt:number}
type CacheShape=Record<string,CacheRecord>
type DictionaryShard=Record<string,string>

export type ReadingTranslationResult={
  translation:string
  source:'site'|'online'
  base:string
}

const memoryCache=new Map<string,string>()
const inflight=new Map<string,Promise<ReadingTranslationResult|null>>()
const shardCache=new Map<string,Promise<DictionaryShard|null>>()

export async function translateReadingWord(term:string,candidates:string[]=[]):Promise<ReadingTranslationResult|null>{
  const key=normalize(term)
  if(!key)return null

  // Main path: sENG's own dictionary files hosted on the same origin.
  const siteHit=await lookupSiteDictionary([key,...candidates,...defaultCandidates(key)])
  if(siteHit)return siteHit

  // Secondary path: a translation fetched previously and cached in this browser.
  const memoryHit=memoryCache.get(key)
  if(memoryHit)return{translation:memoryHit,source:'online',base:key}

  const stored=readStoredCache()
  const storedHit=stored[key]?.translation
  if(storedHit){
    memoryCache.set(key,storedHit)
    return{translation:storedHit,source:'online',base:key}
  }

  // Last resort only: external machine translation.
  const pending=inflight.get(key)
  if(pending)return pending

  const request=fetchTranslation(key)
    .then(translation=>{
      if(!translation)return null
      memoryCache.set(key,translation)
      writeStoredCache(key,translation)
      return{translation,source:'online' as const,base:key}
    })
    .finally(()=>inflight.delete(key))

  inflight.set(key,request)
  return request
}

async function lookupSiteDictionary(candidates:string[]):Promise<ReadingTranslationResult|null>{
  const normalized=[...new Set(candidates.map(normalize).filter(Boolean))]
  for(const candidate of normalized){
    const bucket=bucketFor(candidate)
    const shard=await loadShard(bucket)
    const translation=shard?.[candidate]
    if(translation)return{translation,source:'site',base:candidate}
  }
  return null
}


const irregularBases:Record<string,string>={
  am:'be',is:'be',are:'be',was:'be',were:'be',been:'be',
  has:'have',had:'have',does:'do',did:'do',done:'do',
  went:'go',gone:'go',came:'come',come:'come',saw:'see',seen:'see',
  took:'take',taken:'take',gave:'give',given:'give',got:'get',gotten:'get',
  made:'make',said:'say',told:'tell',thought:'think',knew:'know',known:'know',
  found:'find',felt:'feel',left:'leave',brought:'bring',bought:'buy',
  caught:'catch',heard:'hear',held:'hold',kept:'keep',lost:'lose',
  met:'meet',paid:'pay',ran:'run',run:'run',sat:'sit',stood:'stand',
  spoke:'speak',spoken:'speak',wrote:'write',written:'write',read:'read',
  became:'become',began:'begin',begun:'begin',broke:'break',broken:'break',
  chose:'choose',chosen:'choose',drew:'draw',drawn:'draw',drove:'drive',driven:'drive',
  fell:'fall',fallen:'fall',flew:'fly',flown:'fly',forgot:'forget',forgotten:'forget',
  grew:'grow',grown:'grow',rode:'ride',ridden:'ride',rose:'rise',risen:'rise',
  sent:'send',slept:'sleep',spent:'spend',swam:'swim',swum:'swim',
  wore:'wear',worn:'wear',won:'win',children:'child',men:'man',women:'woman',
  feet:'foot',teeth:'tooth',mice:'mouse',people:'person'
}

function defaultCandidates(word:string){
  const result:string[]=[]
  const irregular=irregularBases[word]
  if(irregular)result.push(irregular)

  if(word.endsWith('ies')&&word.length>4)result.push(word.slice(0,-3)+'y')
  if(word.endsWith('ves')&&word.length>4){
    result.push(word.slice(0,-3)+'f',word.slice(0,-3)+'fe')
  }
  if(word.endsWith('ing')&&word.length>5){
    const stem=word.slice(0,-3)
    result.push(stem,stem+'e')
    if(/([b-df-hj-np-tv-z])\1$/.test(stem))result.push(stem.slice(0,-1))
  }
  if(word.endsWith('ied')&&word.length>4)result.push(word.slice(0,-3)+'y')
  if(word.endsWith('ed')&&word.length>4){
    const stem=word.slice(0,-2)
    result.push(stem,word.slice(0,-1))
    if(/([b-df-hj-np-tv-z])\1$/.test(stem))result.push(stem.slice(0,-1))
  }
  if(word.endsWith('es')&&word.length>4)result.push(word.slice(0,-2),word.slice(0,-1))
  if(word.endsWith('s')&&word.length>3&&!word.endsWith('ss'))result.push(word.slice(0,-1))
  if(word.endsWith("'s")&&word.length>3)result.push(word.slice(0,-2))

  return [...new Set(result.filter(Boolean))]
}

function bucketFor(term:string){
  const first=term.charAt(0)
  return first>='a'&&first<='z'?first:'_'
}

function loadShard(bucket:string):Promise<DictionaryShard|null>{
  const cached=shardCache.get(bucket)
  if(cached)return cached

  const request=(async()=>{
    try{
      const base=import.meta.env.BASE_URL||'./'
      const url=new URL(`${base}dictionary/en-ru/${bucket}.json`,window.location.href)
      const response=await fetch(url.toString(),{cache:'force-cache'})
      if(!response.ok)return null
      const data=await response.json() as unknown
      if(!data||typeof data!=='object'||Array.isArray(data))return null
      return data as DictionaryShard
    }catch{
      return null
    }
  })()

  shardCache.set(bucket,request)
  return request
}

async function fetchTranslation(term:string):Promise<string|null>{
  const controller=new AbortController()
  const timeout=window.setTimeout(()=>controller.abort(),6500)
  try{
    const url=new URL(endpoint)
    url.searchParams.set('q',term)
    url.searchParams.set('langpair','en|ru')
    url.searchParams.set('mt','1')

    const response=await fetch(url.toString(),{
      method:'GET',
      headers:{Accept:'application/json'},
      signal:controller.signal
    })
    if(!response.ok)return null

    const data=await response.json() as {
      responseStatus?:number
      responseData?:{translatedText?:string;match?:number}
      matches?:Array<{translation?:string;quality?:string|number;match?:number}>
    }

    if(data.responseStatus&&data.responseStatus>=400)return null

    const candidates=[
      data.responseData?.translatedText,
      ...(data.matches??[])
        .sort((a,b)=>score(b)-score(a))
        .map(item=>item.translation)
    ]

    for(const candidate of candidates){
      const cleaned=cleanTranslation(candidate)
      if(cleaned&&normalize(cleaned)!==term&&!looksLikeApiWarning(cleaned))return cleaned
    }
    return null
  }catch{
    return null
  }finally{
    window.clearTimeout(timeout)
  }
}

function score(item:{quality?:string|number;match?:number}){
  const quality=typeof item.quality==='number'?item.quality:Number(item.quality??0)
  const match=typeof item.match==='number'?item.match:0
  return quality+match*100
}

function cleanTranslation(value?:string){
  if(!value)return''
  return decodeEntities(value)
    .replace(/^["“”]+|["“”]+$/g,'')
    .replace(/\s+/g,' ')
    .trim()
}

function decodeEntities(value:string){
  const element=document.createElement('textarea')
  element.innerHTML=value
  return element.value
}

function looksLikeApiWarning(value:string){
  const lower=value.toLowerCase()
  return lower.includes('mymemory warning')||
    lower.includes('query length limit')||
    lower.includes('daily request limit')||
    lower.includes('too many requests')
}

function normalize(value:string){
  return value.toLowerCase()
    .replace(/[’‘]/g,"'")
    .replace(/[‐‑]/g,'-')
    .replace(/[^a-z' -]/g,'')
    .replace(/\s+/g,' ')
    .trim()
}

function readStoredCache():CacheShape{
  try{
    const raw=localStorage.getItem(cacheKey)
    if(!raw)return{}
    const parsed=JSON.parse(raw) as CacheShape
    return parsed&&typeof parsed==='object'?parsed:{}
  }catch{
    return{}
  }
}

function writeStoredCache(term:string,translation:string){
  try{
    const cache=readStoredCache()
    cache[term]={translation,updatedAt:Date.now()}
    const entries=Object.entries(cache)
    if(entries.length>maxCacheEntries){
      entries
        .sort((a,b)=>a[1].updatedAt-b[1].updatedAt)
        .slice(0,entries.length-maxCacheEntries)
        .forEach(([key])=>delete cache[key])
    }
    localStorage.setItem(cacheKey,JSON.stringify(cache))
  }catch{
    // Private browsing or storage quota: memory cache still works for this session.
  }
}
