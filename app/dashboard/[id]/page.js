import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProjectPage({ params }){
  const { id } = params
  const [project,setProject] = useState(null)
  const router = useRouter()

  useEffect(()=>{
    const raw = localStorage.getItem('sf_projects')
    if(!raw) return
    const arr = JSON.parse(raw)
    const p = arr.find(x=>x.id===id)
    if(!p){
      // not found, go back
      router.push('/dashboard')
      return
    }
    setProject(p)
  },[id])

  if(!project) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-sm text-slate-600">Client message and generated intelligence</p>
        </div>
        <div>
          <a href="/dashboard" className="text-sm text-indigo-600">Back to Dashboard</a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">Client Message</h3>
            <p className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">{project.clientMessage}</p>
          </div>

          <div className="mt-6 p-4 bg-white rounded shadow">
            <h3 className="font-semibold">Summary</h3>
            <p className="mt-2 text-sm text-slate-700">{project.summary || 'No summary generated yet.'}</p>
          </div>
        </div>

        <div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-slate-500">Readiness</div>
            <div className="text-2xl font-bold">{project.readiness || 0}%</div>
            <div className="mt-2 text-sm text-slate-600">Complexity: {project.complexity || 'Low'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
