const statusStil = {
  Aktiv: 'bg-hops-600/15 text-hops-600',
  Prøveperiode: 'bg-malt-500/20 text-malt-600',
  Inaktiv: 'bg-bark-300/40 text-bark-700',
  Sendt: 'bg-malt-500/20 text-malt-600',
}

export function StatusMerke({ status }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStil[status]}`}
    >
      {status}
    </span>
  )
}

export function Merke({ children }) {
  return (
    <span className="rounded-md border border-cream-300 bg-cream-100 px-2 py-0.5 text-xs text-bark-800">
      {children}
    </span>
  )
}

const kategoriStil = {
  Brygging: 'bg-malt-500/20 text-malt-600',
  Pizza: 'bg-tomato-600/15 text-tomato-600',
  BBQ: 'bg-bark-800/10 text-bark-800',
}

export function KategoriMerke({ kategori }) {
  return (
    <span className={`rounded-full px-3 py-1 text-sm font-medium ${kategoriStil[kategori]}`}>
      {kategori}
    </span>
  )
}

export function Initialer({ navn, className = 'size-11' }) {
  const initialer = navn
    .split(' ')
    .map((d) => d[0])
    .join('')

  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-bark-800 font-serif text-cream-100 ${className}`}
    >
      {initialer}
    </div>
  )
}
