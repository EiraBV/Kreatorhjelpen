import { Link } from 'react-router-dom'
import { Initialer, Merke, StatusMerke } from './Merker.jsx'
import { formaterDato } from '../utils/dato.js'

function SkaperKort({ skaper }) {
  return (
    <Link
      to={`/skapere/${skaper.id}`}
      className="flex flex-col rounded-xl border border-cream-300 bg-cream-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-bark-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-malt-500 focus-visible:outline-none"
    >
      <div className="flex items-start gap-3">
        <Initialer navn={skaper.navn} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-serif text-lg font-semibold">{skaper.navn}</h2>
          <p className="truncate text-sm text-bark-700">
            «{skaper.kallenavn}» · {skaper.rolle}
          </p>
        </div>
        <StatusMerke status={skaper.status} />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {skaper.kategorier.map((k) => (
          <Merke key={k}>{k}</Merke>
        ))}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-cream-200 pt-4 text-sm">
        <div>
          <dt className="text-xs text-bark-700">Siste kontakt</dt>
          <dd className="font-medium">{formaterDato(skaper.sisteKontakt)}</dd>
        </div>
        <div>
          <dt className="text-xs text-bark-700">Publisert</dt>
          <dd className="font-medium">{skaper.antallPublisert} innhold</dd>
        </div>
      </dl>
    </Link>
  )
}

export default SkaperKort
