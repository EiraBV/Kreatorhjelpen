import { Merke } from '../Merker.jsx'
import { primaerKnapp, sekundaerKnapp } from '../stil.js'

export function Boble({ fra, children }) {
  const erBot = fra === 'bot'
  return (
    <div className={`flex ${erBot ? 'justify-start' : 'justify-end'}`}>
      <p
        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-line ${
          erBot
            ? 'rounded-bl-md border border-cream-200 bg-cream-100 text-bark-900'
            : 'rounded-br-md bg-bark-800 text-cream-50'
        }`}
      >
        {children}
      </p>
    </div>
  )
}

export function SkriverPrikker() {
  return (
    <div className="flex justify-start" aria-label="Idéhjelper skriver">
      <div className="flex gap-1 rounded-2xl rounded-bl-md border border-cream-200 bg-cream-100 px-3.5 py-3">
        {[0, 150, 300].map((forsinkelse) => (
          <span
            key={forsinkelse}
            style={{ animationDelay: `${forsinkelse}ms` }}
            className="size-1.5 animate-bounce rounded-full bg-bark-700"
          />
        ))}
      </div>
    </div>
  )
}

export function Hurtigsvar({ valg, onVelg }) {
  return (
    <div className="flex flex-wrap gap-2">
      {valg.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onVelg(v)}
          className="rounded-full border border-bark-300 bg-cream-50 px-3 py-1.5 text-sm font-medium text-bark-800 transition-colors hover:border-bark-900 hover:bg-bark-900 hover:text-cream-50"
        >
          {v}
        </button>
      ))}
    </div>
  )
}

export function OppsummeringKort({ ide, skaperNavn, visKnapper, onLagre, onStartPaaNytt }) {
  return (
    <div className="mr-6 rounded-xl border border-cream-300 bg-cream-50 p-4 shadow-sm">
      <p className="font-serif text-base leading-snug font-semibold">{ide.tittel}</p>
      <div className="mt-2">
        <Merke>{ide.kategori}</Merke>
      </div>
      <dl className="mt-3 space-y-1 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-bark-700">Format</dt>
          <dd className="font-medium">{ide.anbefaltFormat}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-bark-700">Skaper</dt>
          <dd className="font-medium">{skaperNavn ?? 'Usikker'}</dd>
        </div>
      </dl>
      <p className="mt-3 border-t border-cream-200 pt-3 text-sm leading-relaxed">{ide.beskrivelse}</p>
      {visKnapper && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={onLagre} className={primaerKnapp}>
            Lagre i Idébanken
          </button>
          <button type="button" onClick={onStartPaaNytt} className={sekundaerKnapp}>
            Start på nytt
          </button>
        </div>
      )}
    </div>
  )
}
