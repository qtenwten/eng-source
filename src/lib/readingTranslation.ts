const cacheKey='seng-reading-online-dictionary-v1'
const maxCacheEntries=3000
const endpoint='https://api.mymemory.translated.net/get'

type CacheRecord={translation:string;updatedAt:number}
type CacheShape=Record<string,CacheRecord>

const memoryCache=new Map<string,string>()
const inflight=new Map<string,Promise<string|null>>()

export async function translateReadingWord(term:string):Promise<string|null>{
  const key=normalize(term)
  if(!key)return null

  const memoryHit=memoryCache.get(key)
  if(memoryHit)return memoryHit

  const stored=readStoredCache()
  const storedHit=stored[key]?.translation
  if(storedHit){
    memoryCache.set(key,storedHit)
    return storedHit
  }

  const pending=inflight.get(key)
  if(pending)return pending

  const request=fetchTranslation(key)
    .then(translation=>{
      if(translation){
        memoryCache.set(key,translation)
        writeStoredCache(key,translation)
      }
      return translation
    })
    .finally(()=>inflight.delete(key))

  inflight.set(key,request)
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
  return value.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z' -]/g,'').replace(/\s+/g,' ').trim()
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
