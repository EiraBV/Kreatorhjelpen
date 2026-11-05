import { KATEGORIER } from '../data/skapere.js'

function KategoriFilter({ valgt, onVelg }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer på kategori">
      {['Alle', ...KATEGORIER].map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => onVelg(k)}
          aria-pressed={valgt === k}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            valgt === k
              ? 'border-bark-900 bg-bark-900 text-cream-50'
              : 'border-cream-300 bg-cream-50 text-bark-800 hover:border-bark-300'
          }`}
        >
          {k}
        </button>
      ))}
    </div>
  )
}

export default KategoriFilter
