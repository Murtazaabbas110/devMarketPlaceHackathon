import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProject(){
  const [name,setName] = useState('')
  const [message,setMessage] = useState('')
  const router = useRouter()

  function create(){
    // basic validation
    if(!name.trim()){ alert('Please provide a project name'); return }
    if(message.trim().length < 20){ alert('Please provide a longer client message (min 20 chars)'); return }
    const id = 'p_'+Date.now()
    const p = {id,name,clientMessage:message,createdAt:new Date().toISOString(),readiness:10,complexity:'Low',status:'created'}
    const raw = localStorage.getItem('sf_projects')
    const arr = raw? JSON.parse(raw):[]
    arr.unshift(p)
    localStorage.setItem('sf_projects',JSON.stringify(arr))

    // Call server-side analysis API
    try{
      fetch('/api/analyze', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({id,clientMessage:message})})
        .then(r=>r.json())
        .then(res=>{
          if(res?.ok && res.analysis){
            // merge analysis into project and save
            const raw2 = localStorage.getItem('sf_projects')
            const arr2 = raw2? JSON.parse(raw2):[]
            const idx = arr2.findIndex(x=>x.id===id)
            if(idx>-1){
              arr2[idx] = {...arr2[idx],...{
                summary: res.analysis.summary,
                objectives: res.analysis.objectives,
               requirements: res.analysis.requirements,
               ambiguities: res.analysis.ambiguities,
               risks: res.analysis.risks,
               assumptions: res.analysis.assumptions,
               dependencies: res.analysis.dependencies,
               complexity: res.analysis.complexity,
               readiness: res.analysis.readiness
              }}
              localStorage.setItem('sf_projects',JSON.stringify(arr2))
            }
          } else {
            alert('Analysis failed: '+(res?.error||'Unknown error'))
          }
          router.push('/dashboard')
        })
        .catch(err=>{
          console.error('Analysis fetch error',err)
          alert('Analysis failed, saved project locally.')
          router.push('/dashboard')
        })
    }catch(err){
      console.error(err)
      router.push('/dashboard')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">New Project</h1>
      <p className="text-sm text-slate-600">Paste the client message to analyze.</p>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium">Project name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="mt-2 w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Client message</label>
          <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={6} className="mt-2 w-full px-3 py-2 border rounded" />
        </div>
      </div>

      <div className="mt-6">
        <button onClick={create} className="px-4 py-2 bg-indigo-600 text-white rounded">Analyze</button>
      </div>
    </div>
  )
}
