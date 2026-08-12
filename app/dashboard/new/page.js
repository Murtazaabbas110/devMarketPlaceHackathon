import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProject(){
  const [name,setName] = useState('')
  const [message,setMessage] = useState('')
  const router = useRouter()

  function create(){
    const id = 'p_'+Date.now()
    const p = {id,name,clientMessage:message,createdAt:new Date().toISOString(),readiness:10,complexity:'Low'}
    const raw = localStorage.getItem('sf_projects')
    const arr = raw? JSON.parse(raw):[]
    arr.unshift(p)
    localStorage.setItem('sf_projects',JSON.stringify(arr))
    router.push('/dashboard')
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
