import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Initialer } from '../Merker.jsx'
import Samtaleforslag from './Samtaleforslag.jsx'
import { useData } from '../../data/useData.js'
import { dagerSiden } from '../../utils/dato.js'

const KRITISK_DAGER = 40
const OVERGANG_MS = 300

function SidenKontakt({ skaper }) {
  if (skaper.dager === null) {
    return <span className="text-xs font-medium text-tomato-600">Ingen kontakt ennå</span>
  }
  const tekst = dagerSiden(skaper.sisteKontakt)
  return (
    <span
      className={`text-xs ${skaper.dager > KRITISK_DAGER ? 'font-medium text-tomato-600' : 'text-bark-700'}`}
    >
      {tekst.charAt(0).toUpperCase() + tekst.slice(1)}
    </span>
  )
}

function OppfolgingListe({ skapere }) {
  const { notater, sendinger, leggTilNotat } = useData()
  const [aapenId, setAapenId] = useState(null)
  const [forsvinner, setForsvinner] = useState([])
  const tidtakere = useRef([])

  useEffect(() => () => tidtakere.current.forEach(clearTimeout), [])

  // La raden folde seg sammen før skaperen flyttes nederst i listen.
  function tattKontakt(skaperId, notat) {
    setAapenId(null)
    setForsvinner((liste) => [...liste, skaperId])
    tidtakere.current.push(
      setTimeout(() => {
        leggTilNotat(skaperId, notat)
        setForsvinner((liste) => liste.filter((id) => id !== skaperId))
      }, OVERGANG_MS),
    )
  }

  return (
    <ul>
      {skapere.map((s) => {
        const aapen = aapenId === s.id
        const borte = forsvinner.includes(s.id)
        const sisteNotat = notater
          .filter((n) => n.skaperId === s.id)
          .sort((a, b) => b.dato.localeCompare(a.dato))[0]
        const sending = sendinger
          .filter((x) => x.skaperId === s.id && x.status === 'Sendt')
          .sort((a, b) => b.sendtDato.localeCompare(a.sendtDato))[0]

        return (
          <li
            key={s.id}
            className={`group grid transition-[grid-template-rows,opacity] ease-out ${
              borte ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
            }`}
            style={{ transitionDuration: `${OVERGANG_MS}ms` }}
          >
            <div className="overflow-hidden">
              <div className="border-b border-cream-200 py-3 group-first:pt-0 group-last:border-b-0 group-last:pb-0">
                <div className="flex items-center gap-3">
                  <Link
                    to={`/skapere/${s.id}`}
                    className="flex min-w-0 flex-1 items-center gap-3 rounded-md hover:text-bark-700"
                  >
                    <Initialer navn={s.navn} className="size-9 shrink-0 text-sm" />
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{s.navn}</span>
                      <SidenKontakt skaper={s} />
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setAapenId(aapen ? null : s.id)}
                    aria-expanded={aapen}
                    aria-controls={`forslag-${s.id}`}
                    className="shrink-0 text-sm font-medium text-malt-600 hover:underline"
                  >
                    Ta en prat
                  </button>
                </div>

                {aapen && (
                  <Samtaleforslag
                    id={`forslag-${s.id}`}
                    skaper={s}
                    dager={s.dager}
                    sisteNotat={sisteNotat}
                    sending={sending}
                    onLagre={(notat) => tattKontakt(s.id, notat)}
                  />
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default OppfolgingListe
