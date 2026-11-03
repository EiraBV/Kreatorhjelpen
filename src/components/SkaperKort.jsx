const statusStil = {
  Aktiv: 'bg-hops-600/15 text-hops-600',
  Prøveperiode: 'bg-malt-500/20 text-malt-600',
  Inaktiv: 'bg-bark-300/40 text-bark-700',
}

const datoFormat = new Intl.DateTimeFormat('nb-NO', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function SkaperKort({ skaper }) {
  const initialer = skaper.navn
    .split(' ')
    .map((d) => d[0])
    .join('')

  return (
    <article className="flex flex-col rounded-xl border border-cream-300 bg-cream-50 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-bark-800 font-serif text-cream-100">
          {initialer}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-serif text-lg font-semibold">{skaper.navn}</h2>
          <p className="truncate text-sm text-bark-700">
            «{skaper.kallenavn}» · {skaper.rolle}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStil[skaper.status]}`}
        >
          {skaper.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {skaper.kategorier.map((k) => (
          <span
            key={k}
            className="rounded-md border border-cream-300 bg-cream-100 px-2 py-0.5 text-xs text-bark-800"
          >
            {k}
          </span>
        ))}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-cream-200 pt-4 text-sm">
        <div>
          <dt className="text-xs text-bark-700">Siste kontakt</dt>
          <dd className="font-medium">{datoFormat.format(new Date(skaper.sisteKontakt))}</dd>
        </div>
        <div>
          <dt className="text-xs text-bark-700">Publisert</dt>
          <dd className="font-medium">{skaper.antallPublisert} innhold</dd>
        </div>
      </dl>
    </article>
  )
}

export default SkaperKort
