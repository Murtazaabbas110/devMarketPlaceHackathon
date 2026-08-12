import { useEffect, useState } from 'react'

function EmptyState(){
  return (
    <div className="p-12 bg-white rounded shadow text-center">
      <h3 className="text-xl font-semibold">No projects yet</h3>
      <p className="mt-2 text-slate-500">Create your first project by analyzing a client message.</p>
      <a href="/dashboard/new" className="mt-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded">Create Project</a>
    </div>
  )
}

function ProjectCard({p}){
  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">{p.name}</h4>
          <div className="text-sm text-slate-500">{p.summary || 'No summary yet'}</div>
        </div>
        <div className="text-sm text-slate-600">{new Date(p.createdAt).toLocaleDateString()}</div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="text-xs bg-slate-100 px-2 py-1 rounded">Readiness: {p.readiness || 0}%</div>
        <div className="text-xs bg-slate-100 px-2 py-1 rounded">Complexity: {p.complexity || 'Low'}</div>
      </div>
    </div>
  )
}

export default function Dashboard(){
  const [projects,setProjects] = useState([])
  useEffect(()=>{
    // load demo projects from localStorage for this phase
    const raw = localStorage.getItem('sf_projects')
    if(raw){
      setProjects(JSON.parse(raw))
    }
  },[])

  const stats = {
    total: projects.length,
    active: projects.length,
    avgReadiness: projects.length? Math.round(projects.reduce((s,p)=>s+(p.readiness||0),0)/projects.length):0
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-slate-600">Your projects and high-level stats</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/dashboard/new" className="px-4 py-2 bg-indigo-600 text-white rounded">New Project</a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-slate-500">Total Projects</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-slate-500">Active Projects</div>
          <div className="text-2xl font-bold">{stats.active}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-slate-500">Avg Readiness</div>
          <div className="text-2xl font-bold">{stats.avgReadiness}%</div>
        </div>
      </div>

      {projects.length===0? <EmptyState/> : (
        <div className="grid md:grid-cols-3 gap-4">
          {projects.map(p=> <ProjectCard key={p.id} p={p}/>)}
        </div>
      )}
    </div>
  )
}
