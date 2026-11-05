import { Merke } from '../Merker.jsx'
import { primaerKnapp, smaaKort } from '../stil.js'

const utviklingStil = {
  Stigende: 'bg-hops-600/15 text-hops-600',
  Stabil: 'bg-bark-300/40 text-bark-700',
  Ny: 'bg-malt-500/20 text-malt-600',
}

function TrendKort({ trend, lagtTil, onGjorOmTilIde }) {
  return (
    <article className={`${smaaKort} flex flex-col`}>
      <h3 className="line-clamp-2 font-serif text-base leading-snug font-semibold">{trend.tittel}</h3>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Merke>{trend.kategori}</Merke>
        <Merke>{trend.plattform}</Merke>
      </div>
      <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed">{trend.beskrivelse}</p>
      <div className="mt-3 mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${utviklingStil[trend.utvikling]}`}
        >
          {trend.utvikling}
        </span>
        <span className="text-xs text-bark-700">Kilde: {trend.kilde}</span>
      </div>
      <button
        type="button"
        onClick={onGjorOmTilIde}
        disabled={lagtTil}
        className={`${primaerKnapp} mt-auto w-full disabled:cursor-default disabled:border disabled:border-hops-600/40 disabled:bg-hops-600/15 disabled:text-hops-600 disabled:opacity-100`}
      >
        {lagtTil ? 'Lagt i Idébanken ✓' : 'Gjør om til idé'}
      </button>
    </article>
  )
}

export default TrendKort
