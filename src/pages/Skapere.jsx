import { useState } from 'react'
import KategoriFilter from '../components/KategoriFilter.jsx'
import SideTittel from '../components/SideTittel.jsx'
import SkaperKort from '../components/SkaperKort.jsx'
import Sokefelt from '../components/Sokefelt.jsx'
import { useData } from '../data/useData.js'

function Skapere() {
  const { skapere } = useData()
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
        <KategoriFilter valgt={kategori} onVelg={setKategori} />
        <Sokefelt
          verdi={sok}
          onEndre={setSok}
          placeholder="Søk etter navn, kallenavn eller rolle"
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
