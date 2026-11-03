import { useState } from 'react'
import SideTittel from '../components/SideTittel.jsx'
import SkaperKort from '../components/SkaperKort.jsx'
import { KATEGORIER, skapere } from '../data/skapere.js'

function Skapere() {
  const [sok, setSok] = useState('')
  const [kategori, setKategori] = useState('Alle')

  const q = sok.trim().toLowerCase()
  const filtrert = skapere.filter((s) => {
    const treffKategori = kategori === 'Alle' || s.kategorier.includes(kategori)
    const treffSok =
      !q || [s.navn, s.kallenavn, s.rolle].some((felt) => felt.toLowerCase().includes(q))
    return treffKategori && treffSok
  })

  return (
    <>
      <SideTittel tittel="Skapere" undertittel={`${skapere.length} skapere i nettverket`} />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer på kategori">
          {['Alle', ...KATEGORIER].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKategori(k)}
              aria-pressed={kategori === k}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                kategori === k
                  ? 'border-bark-900 bg-bark-900 text-cream-50'
                  : 'border-cream-300 bg-cream-50 text-bark-800 hover:border-bark-300'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={sok}
          onChange={(e) => setSok(e.target.value)}
          placeholder="Søk etter navn, kallenavn eller rolle"
          aria-label="Søk"
          className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-2 text-sm placeholder:text-bark-300 focus:border-malt-500 focus:ring-2 focus:ring-malt-500/30 focus:outline-none sm:w-72"
        />
      </div>

      {filtrert.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtrert.map((s) => (
            <SkaperKort key={s.id} skaper={s} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-cream-300 p-10 text-center text-bark-700">
          Ingen skapere matcher søket.
        </p>
      )}
    </>
  )
}

export default Skapere
