import './globals.css'

export const metadata = {
  title: 'ScopeFlow',
  description: 'AI project intelligence and execution',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <header className="border-b bg-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="text-2xl font-bold">ScopeFlow</div>
              <nav className="flex items-center gap-4">
                <a className="text-sm text-slate-600" href="/">Home</a>
                <a className="text-sm text-slate-600" href="/dashboard">Dashboard</a>
                <a className="text-sm text-white bg-indigo-600 px-3 py-2 rounded" href="/dashboard">Open App</a>
              </nav>
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
        </div>
      </body>
    </html>
  )
}
