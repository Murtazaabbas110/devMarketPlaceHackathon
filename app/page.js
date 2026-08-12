export default function Home() {
  return (
    <section className="py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-extrabold">ScopeFlow — Project intelligence, simplified</h1>
          <p className="mt-4 text-lg text-slate-600">Convert unstructured client messages into structured project intelligence and execution plans. Fast, deterministic, and demo-ready.</p>
          <div className="mt-8 flex gap-4">
            <a href="/dashboard" className="px-5 py-3 bg-indigo-600 text-white rounded shadow">Try the demo</a>
            <a href="#how" className="px-5 py-3 border rounded text-slate-700">How it works</a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <h4 className="font-semibold">Analyze</h4>
              <p className="text-sm text-slate-500">Paste a client message and generate intelligence.</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h4 className="font-semibold">Plan</h4>
              <p className="text-sm text-slate-500">Auto-generate epics and work items.</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h4 className="font-semibold">Execute</h4>
              <p className="text-sm text-slate-500">Kanban or Agile boards to track progress.</p>
            </div>
          </div>
        </div>
        <div>
          <div className="p-8 bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Visual Pipeline</h3>
            <ol className="mt-4 space-y-3">
              <li className="flex items-start gap-3"><span className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">1</span> <div><strong>Client Message</strong><div className="text-sm opacity-80">Paste unstructured project text</div></div></li>
              <li className="flex items-start gap-3"><span className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">2</span> <div><strong>AI Analysis</strong><div className="text-sm opacity-80">Extract objectives, requirements</div></div></li>
              <li className="flex items-start gap-3"><span className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">3</span> <div><strong>Execution</strong><div className="text-sm opacity-80">Generate work items & boards</div></div></li>
            </ol>
          </div>
        </div>
      </div>

      <section id="how" className="mt-20">
        <h2 className="text-2xl font-bold">How it works</h2>
        <div className="mt-4 text-slate-600">Quick pipeline: paste message → analyze → review intelligence → generate plan → execute.</div>
      </section>
    </section>
  )
}
