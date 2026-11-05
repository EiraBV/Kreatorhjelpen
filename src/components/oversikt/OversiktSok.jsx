import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sokefelt from '../Sokefelt.jsx'
import { Initialer, Merke } from '../Merker.jsx'
import { useData } from '../../data/useData.js'

const MAKS_PER_GRUPPE = 5

function Gruppe({ tittel, children }) {
  return (
    <div className="py-2">
      <p className="px-4 pb-1 text-[11px] font-semibold tracking-wider text-bark-700 uppercase">
        {tittel}
      </p>
      <ul>{children}</ul>
    </div>
  )
}

const radStil =
  'flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-cream-100 focus-visible:bg-cream-100 focus-visible:outline-none'

function OversiktSok() {
  const { skapere, ideer } = useData()
  const [sok, setSok] = useState('')
  const [aapen, setAapen] = useState(false)

  const q = sok.trim().toLowerCase()
  const treffSkapere = q
    ? skapere
        .filter((s) => [s.navn, s.kallenavn, s.rolle].some((f) => f.toLowerCase().includes(q)))
        .slice(0, MAKS_PER_GRUPPE)
    : []
  const treffIdeer = q
    ? ideer
        .filter((i) => !i.skjult)
        .filter((i) => [i.tittel, i.beskrivelse].some((f) => f.toLowerCase().includes(q)))
        .slice(0, MAKS_PER_GRUPPE)
    : []

  function lukk() {
    setAapen(false)
    setSok('')
  }

  return (
    <div
      className="relative w-full sm:w-auto"
      onFocus={() => setAapen(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setAapen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setAapen(false)}
    >
      <Sokefelt verdi={sok} onEndre={setSok} placeholder="Søk etter skapere og ideer" />

      {aapen && q && (
        <div
          // Hindrer at feltet mister fokus (og listen lukkes) før klikket registreres.
          onMouseDown={(e) => e.preventDefault()}
          className="absolute right-0 z-30 mt-2 max-h-[70vh] w-full overflow-y-auto rounded-xl border border-cream-300 bg-cream-50 shadow-lg sm:w-96"
        >
          {treffSkapere.length === 0 && treffIdeer.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-bark-700">Ingen treff på «{sok.trim()}».</p>
          ) : (
            <div className="divide-y divide-cream-200">
              {treffSkapere.length > 0 && (
                <Gruppe tittel="Skapere">
                  {treffSkapere.map((s) => (
                    <li key={s.id}>
                      <Link to={`/skapere/${s.id}`} onClick={lukk} className={radStil}>
                        <Initialer navn={s.navn} className="size-8 text-xs" />
                        <span className="min-w-0">
                          <span className="block truncate font-medium">{s.navn}</span>
                          <span className="block truncate text-xs text-bark-700">
                            «{s.kallenavn}» · {s.rolle}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </Gruppe>
              )}
              {treffIdeer.length > 0 && (
                <Gruppe tittel="Ideer">
                  {treffIdeer.map((i) => (
                    <li key={i.id}>
                      <Link to="/idebank" onClick={lukk} className={radStil}>
                        <span className="min-w-0 flex-1 truncate font-medium">{i.tittel}</span>
                        <Merke>{i.kategori}</Merke>
                      </Link>
                    </li>
                  ))}
                </Gruppe>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default OversiktSok
