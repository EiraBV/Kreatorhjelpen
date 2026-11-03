import { useState } from 'react'
import Seksjon from './Seksjon.jsx'
import { Merke } from '../Merker.jsx'
import { felt, primaerKnapp } from '../stil.js'
import { NOTAT_KANALER } from '../../data/notater.js'
import { formaterDato } from '../../utils/dato.js'

function NotaterSeksjon({ notater, onLagre, feltRef }) {
  const [tekst, setTekst] = useState('')
  const [kanal, setKanal] = useState(NOTAT_KANALER[0])

  function lagre(e) {
    e.preventDefault()
    if (!tekst.trim()) return
    onLagre({ tekst: tekst.trim(), kanal })
    setTekst('')
  }

  return (
    <Seksjon
      tittel="Notater fra samtaler"
      undertittel="Hva dere har snakket om, nyest først"
      teller={notater.length}
    >
      <form onSubmit={lagre} className="border-t border-cream-200 pt-5">
        <label htmlFor="notat" className="mb-2 block text-sm font-medium text-bark-800">
          Skriv et notat fra samtalen
        </label>
        <textarea
          id="notat"
          ref={feltRef}
          value={tekst}
          onChange={(e) => setTekst(e.target.value)}
          rows={3}
          className={`${felt} resize-y`}
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Kanal">
            {NOTAT_KANALER.map((k) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={kanal === k}
                onClick={() => setKanal(k)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  kanal === k
                    ? 'border-bark-900 bg-bark-900 text-cream-50'
                    : 'border-cream-300 bg-cream-100 text-bark-800 hover:border-bark-300'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
          <button type="submit" disabled={!tekst.trim()} className={primaerKnapp}>
            Lagre notat
          </button>
        </div>
      </form>

      {notater.length > 0 ? (
        <ol className="relative mt-8 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-cream-300">
          {notater.map((n, i) => (
            <li key={n.id} className="relative pl-7">
              <span
                aria-hidden="true"
                className={`absolute top-1 left-0 size-[11px] rounded-full ring-4 ring-cream-50 ${
                  i === 0 ? 'bg-bark-900' : 'bg-bark-300'
                }`}
              />
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold text-bark-900">{formaterDato(n.dato)}</span>
                <Merke>{n.kanal}</Merke>
                {i === 0 && (
                  <span className="rounded-md bg-bark-900 px-2 py-0.5 text-[10px] font-bold tracking-widest text-cream-50">
                    NYESTE
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed">{n.tekst}</p>
              <p className="mt-1.5 text-xs text-bark-700">Lagt til av {n.lagtTilAv}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-8 text-sm text-bark-700">Ingen notater ennå.</p>
      )}
    </Seksjon>
  )
}

export default NotaterSeksjon
