import { useState } from 'react'
import { ChevronNedIkon, GnistIkon, TommelNedIkon, TommelOppIkon } from './Ikoner.jsx'
import { Merke } from './Merker.jsx'
import { felt, primaerKnapp, sekundaerKnapp } from './stil.js'

const nedtrekk =
  'h-9 w-full appearance-none truncate rounded-lg border border-cream-300 bg-cream-50 pr-9 pl-3 text-sm focus:border-malt-500 focus:ring-2 focus:ring-malt-500/30 focus:outline-none'

const rundKnapp =
  'flex size-9 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-malt-500 focus-visible:outline-none'

function IdeKort({ ide, skapere, onOppdater, onSkjul }) {
  const [visSkjul, setVisSkjul] = useState(false)
  const [grunn, setGrunn] = useState('')

  function lukkSkjul() {
    setVisSkjul(false)
    setGrunn('')
  }

  return (
    <article
      onClick={() => ide.ny && onOppdater({ ny: false })}
      className="flex flex-col rounded-xl border border-cream-300 bg-cream-50 p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="line-clamp-2 font-serif text-base leading-snug font-semibold">{ide.tittel}</h2>
        {ide.ny && (
          <span className="shrink-0 rounded-full bg-hops-600 px-2.5 py-0.5 text-xs font-semibold text-cream-50">
            Ny
          </span>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <Merke>{ide.kategori}</Merke>
        {ide.kilde === 'AI' && (
          <span className="inline-flex items-center gap-1 rounded-md bg-bark-900 px-2 py-0.5 text-xs font-medium text-cream-50">
            <GnistIkon className="size-3 text-malt-500" />
            AI
          </span>
        )}
      </div>

      <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed">{ide.beskrivelse}</p>
      <p className="mt-1.5 mb-4 text-sm font-medium text-bark-700">Anbefalt format: {ide.anbefaltFormat}</p>

      <div
        inert={!visSkjul}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          visSkjul ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-3 space-y-2.5">
            <label htmlFor={`grunn-${ide.id}`} className="block text-sm font-medium text-bark-800">
              Hvorfor passer ikke denne? (valgfritt)
            </label>
            <textarea
              id={`grunn-${ide.id}`}
              value={grunn}
              onChange={(e) => setGrunn(e.target.value)}
              rows={2}
              className={`${felt} resize-y`}
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={lukkSkjul} className={sekundaerKnapp}>
                Avbryt
              </button>
              <button type="button" onClick={() => onSkjul(grunn.trim())} className={primaerKnapp}>
                Skjul idé
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-cream-200 pt-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onOppdater({ lagret: !ide.lagret })}
            aria-pressed={ide.lagret}
            aria-label={ide.lagret ? 'Fjern fra lagrede' : 'Lagre idé'}
            className={`${rundKnapp} ${
              ide.lagret
                ? 'border-hops-600 bg-hops-600 text-cream-50'
                : 'border-cream-300 bg-cream-50 text-bark-700 hover:border-hops-600 hover:text-hops-600'
            }`}
          >
            <TommelOppIkon />
          </button>
          <button
            type="button"
            onClick={() => (visSkjul ? lukkSkjul() : setVisSkjul(true))}
            aria-pressed={visSkjul}
            aria-label="Passer ikke"
            className={`${rundKnapp} ${
              visSkjul
                ? 'border-bark-900 bg-bark-900 text-cream-50'
                : 'border-cream-300 bg-cream-50 text-bark-700 hover:border-bark-700 hover:text-bark-900'
            }`}
          >
            <TommelNedIkon />
          </button>
        </div>
        <div className="relative w-44 min-w-0">
          <select
            value={ide.tildeltSkaperId ?? ''}
            onChange={(e) =>
              onOppdater({ tildeltSkaperId: e.target.value ? Number(e.target.value) : null })
            }
            aria-label="Tildel skaper"
            className={nedtrekk}
          >
            <option value="">Tildel skaper</option>
            {skapere.map((s) => (
              <option key={s.id} value={s.id}>
                {s.navn}
              </option>
            ))}
          </select>
          <ChevronNedIkon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-bark-700" />
        </div>
      </div>
    </article>
  )
}

export default IdeKort
