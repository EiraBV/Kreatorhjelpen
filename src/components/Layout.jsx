import { NavLink, Outlet } from 'react-router-dom'
import Idehjelper from './idehjelper/Idehjelper.jsx'

const lenker = [
  { til: '/', tekst: 'Oversikt', end: true },
  { til: '/skapere', tekst: 'Skapere' },
  { til: '/idebank', tekst: 'Idébank' },
  { til: '/ukesrapport', tekst: 'Ukesrapport' },
]

function Layout() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="bg-bark-900 text-cream-100 md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0">
        <div className="px-6 pt-6 pb-4 md:pt-8 md:pb-8">
          <p className="font-serif text-2xl leading-tight font-semibold">Kreatørhjelpen</p>
          <p className="mt-1 text-[11px] font-semibold tracking-[0.2em] text-malt-500">
            ØLBRYGGING.NO
          </p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
          {lenker.map((l) => (
            <NavLink
              key={l.til}
              to={l.til}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-bark-700 text-cream-50'
                    : 'text-bark-300 hover:bg-bark-800 hover:text-cream-50'
                }`
              }
            >
              {l.tekst}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 px-4 py-8 md:px-10 md:py-10">
        <Outlet />
      </main>
      <Idehjelper />
    </div>
  )
}

export default Layout
