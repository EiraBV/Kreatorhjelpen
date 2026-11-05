import { useEffect, useRef, useState } from 'react'
import IdeKort from '../components/IdeKort.jsx'
import { GnistIkon, Spinner } from '../components/Ikoner.jsx'
import KategoriFilter from '../components/KategoriFilter.jsx'
import SideTittel from '../components/SideTittel.jsx'
import Sokefelt from '../components/Sokefelt.jsx'
import { primaerKnapp } from '../components/stil.js'
import { ekstraIdeer } from '../data/ekstraIdeer.js'
import { useData } from '../data/useData.js'

const ANTALL_NYE = 4

function Idebank() {
  const { skapere, ideer, setIdeer } = useData()
  const [kategori, setKategori] = useState('Alle')
  const [sok, setSok] = useState('')
  const [fane, setFane] = useState('alle')
  const [genererer, setGenererer] = useState(false)
  const tidtaker = useRef(null)

  useEffect(() => () => clearTimeout(tidtaker.current), [])

  const brukteIder = new Set(ideer.map((i) => i.id))
  const tilgjengelige = ekstraIdeer.filter(
    (i) => !brukteIder.has(i.id) && (kategori === 'Alle' || i.kategori === kategori),
  )

  function oppdater(id, endring) {
    setIdeer((liste) => liste.map((i) => (i.id === id ? { ...i, ...endring } : i)))
  }

  function generer() {
    setGenererer(true)
    tidtaker.current = setTimeout(() => {
      const nye = tilgjengelige
        .slice(0, ANTALL_NYE)
        .map((i) => ({ ...i, lagret: false, skjult: false, ny: true }))
      setIdeer((liste) => [...nye, ...liste])
      setGenererer(false)
    }, 1500)
  }

  const synlige = ideer.filter((i) => !i.skjult)
  const antallLagret = synlige.filter((i) => i.lagret).length

  const q = sok.trim().toLowerCase()
  const filtrert = synlige.filter(
    (i) =>
      (fane === 'alle' || i.lagret) &&
      (kategori === 'Alle' || i.kategori === kategori) &&
      (!q || [i.tittel, i.beskrivelse].some((felt) => felt.toLowerCase().includes(q))),
  )

  const faner = [
    { id: 'alle', tekst: 'Alle ideer' },
    { id: 'lagrede', tekst: `Lagrede (${antallLagret})` },
  ]

  let tomTekst = 'Ingen ideer matcher søket.'
  if (fane === 'lagrede' && antallLagret === 0) {
    tomTekst = 'Ingen lagrede ideer ennå. Trykk tommel opp på en idé for å lagre den.'
  }

  return (
    <>
      <SideTittel
        tittel="Idébank"
        undertittel="Alle ideer, både de AI-lager og de du skriver selv. Lagre de gode og skjul de som ikke passer."
        handling={
          <button
            type="button"
            onClick={generer}
            disabled={genererer || tilgjengelige.length === 0}
            title={tilgjengelige.length === 0 ? 'Ingen flere ideer å hente i denne kategorien' : undefined}
            className={`${primaerKnapp} inline-flex items-center gap-2`}
          >
            {genererer ? <Spinner /> : <GnistIkon className="size-4 text-malt-500" />}
            {genererer ? 'Genererer …' : 'Generer flere ideer'}
          </button>
        }
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <KategoriFilter valgt={kategori} onVelg={setKategori} />
        <Sokefelt verdi={sok} onEndre={setSok} placeholder="Søk i tittel og beskrivelse" />
      </div>

      <div role="tablist" aria-label="Visning" className="mb-6 flex gap-6 border-b border-cream-300">
        {faner.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={fane === f.id}
            onClick={() => setFane(f.id)}
            className={`-mb-px border-b-2 pb-2.5 text-sm font-medium transition-colors ${
              fane === f.id
                ? 'border-bark-900 text-bark-900'
                : 'border-transparent text-bark-700 hover:text-bark-900'
            }`}
          >
            {f.tekst}
          </button>
        ))}
      </div>

      {filtrert.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtrert.map((i) => (
            <IdeKort
              key={i.id}
              ide={i}
              skapere={skapere}
              onOppdater={(endring) => oppdater(i.id, endring)}
              onSkjul={(grunn) => oppdater(i.id, { skjult: true, skjultGrunn: grunn, ny: false })}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-cream-300 p-10 text-center text-bark-700">
          {tomTekst}
        </p>
      )}
    </>
  )
}

export default Idebank
