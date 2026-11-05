import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronNedIkon } from '../components/Ikoner.jsx'
import KategoriFilter from '../components/KategoriFilter.jsx'
import Sokefelt from '../components/Sokefelt.jsx'
import Inspirasjonskilder from '../components/ukesrapport/Inspirasjonskilder.jsx'
import Kort from '../components/ukesrapport/Kort.jsx'
import TrendKort from '../components/ukesrapport/TrendKort.jsx'
import { kilder as startKilder } from '../data/kilder.js'
import { uker } from '../data/ukesrapport.js'
import { useData } from '../data/useData.js'
import { formaterUkeSpenn } from '../utils/dato.js'
import { useLokalTilstand } from '../utils/useLokalTilstand.js'

const tall = [
  { nokkel: 'kontakter', tittel: 'Kontakter registrert' },
  { nokkel: 'innhold', tittel: 'Innhold publisert' },
  { nokkel: 'nyeIdeer', tittel: 'Nye ideer' },
  { nokkel: 'lagredeIdeer', tittel: 'Lagrede ideer' },
]

const formatFraPlattform = {
  YouTube: 'YouTube-video',
  Instagram: 'Story/Reel',
  TikTok: 'TikTok',
}

function ideFraTrend(trend) {
  return {
    id: Date.now(),
    trendId: trend.id,
    tittel: trend.tittel,
    kategori: trend.kategori,
    beskrivelse: trend.beskrivelse,
    anbefaltFormat: formatFraPlattform[trend.plattform],
    kilde: 'Trend',
    tildeltSkaperId: null,
    lagret: false,
    skjult: false,
    ny: true,
  }
}

const pilKnapp =
  'flex size-7 items-center justify-center rounded-full border border-cream-300 bg-cream-50 text-bark-800 transition-colors hover:border-bark-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-cream-300'

function EndringPille({ endring }) {
  if (endring === null) {
    return (
      <span className="rounded-full bg-bark-300/40 px-2.5 py-0.5 text-xs font-semibold text-bark-700">
        Ingen uke å sammenligne med
      </span>
    )
  }
  if (endring === 0) {
    return (
      <span className="rounded-full bg-bark-300/40 px-2.5 py-0.5 text-xs font-semibold text-bark-700">
        Som forrige uke
      </span>
    )
  }
  const opp = endring > 0
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        opp ? 'bg-hops-600/15 text-hops-600' : 'bg-tomato-600/15 text-tomato-600'
      }`}
    >
      {opp ? '↑' : '↓'} {Math.abs(endring)} fra forrige uke
    </span>
  )
}

function Ukesrapport() {
  const { ideer, leggTilIde } = useData()
  const [kilder, setKilder] = useLokalTilstand('kreatorhjelpen.kilder.v1', startKilder)
  const [sok, setSok] = useState('')
  const [kategori, setKategori] = useState('Alle')
  const [sokeParametre, setSokeParametre] = useSearchParams()

  // Valgt uke ligger i URL-en (?uke=43). Uten gyldig verdi vises den nyeste uken.
  const sisteIndeks = uker.length - 1
  const funnet = uker.findIndex((u) => String(u.uke) === sokeParametre.get('uke'))
  const indeks = funnet === -1 ? sisteIndeks : funnet
  const valgt = uker[indeks]
  const forrige = uker[indeks - 1]
  const erDenneUken = indeks === sisteIndeks

  function gaTilUke(nyIndeks) {
    setSokeParametre(nyIndeks === sisteIndeks ? {} : { uke: String(uker[nyIndeks].uke) })
  }

  const q = sok.trim().toLowerCase()
  const treff = (...felter) => !q || felter.some((f) => f.toLowerCase().includes(q))

  const synligeTrender = valgt.trender.filter(
    (t) =>
      (kategori === 'Alle' || t.kategori === kategori) &&
      treff(t.tittel, t.beskrivelse, t.kilde, t.plattform),
  )
  const synligeKilder = kilder.filter((k) => treff(k.navn, k.adresse, k.type, k.kategori))

  const trendIderLagtTil = new Set(ideer.map((i) => i.trendId).filter(Boolean))

  return (
    <>
      <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="text-xs font-semibold tracking-[0.15em] text-malt-600 uppercase">
              Uke {valgt.uke} · {formaterUkeSpenn(valgt.start, valgt.slutt)}
            </p>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => gaTilUke(indeks - 1)}
                disabled={indeks === 0}
                aria-label="Forrige uke"
                className={pilKnapp}
              >
                <ChevronNedIkon className="size-3.5 rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => gaTilUke(indeks + 1)}
                disabled={erDenneUken}
                aria-label="Neste uke"
                className={pilKnapp}
              >
                <ChevronNedIkon className="size-3.5 -rotate-90" />
              </button>
            </div>
            {!erDenneUken && (
              <Link to="/ukesrapport" className="text-xs font-medium text-malt-600 hover:underline">
                Tilbake til denne uken
              </Link>
            )}
          </div>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-bark-900 md:text-4xl">
            Ukesrapport
          </h1>
          <p className="mt-2 max-w-2xl text-bark-700">
            {erDenneUken
              ? 'Hva som har skjedd denne uken, og hva som trender akkurat nå.'
              : `Slik så uke ${valgt.uke} ut.`}
          </p>
        </div>
        <Sokefelt verdi={sok} onEndre={setSok} placeholder="Søk i trender og kilder" />
      </header>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tall.map(({ nokkel, tittel }) => (
          <div
            key={nokkel}
            className="rounded-xl border border-cream-300 bg-cream-50 px-5 py-4 shadow-sm"
          >
            <p className="text-sm font-medium text-bark-700">{tittel}</p>
            <p className="mt-1 font-serif text-3xl font-semibold">{valgt.tall[nokkel]}</p>
            <div className="mt-2">
              <EndringPille
                endring={forrige ? valgt.tall[nokkel] - forrige.tall[nokkel] : null}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <Kort
          tittel="Hva som trender"
          undertittel="Plukket opp fra inspirasjonskildene dine"
          handling={<KategoriFilter valgt={kategori} onVelg={setKategori} />}
        >
          {synligeTrender.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {synligeTrender.map((t) => (
                <TrendKort
                  key={t.id}
                  trend={t}
                  lagtTil={trendIderLagtTil.has(t.id)}
                  onGjorOmTilIde={() => leggTilIde(ideFraTrend(t))}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-bark-700">Ingen trender matcher søket.</p>
          )}
        </Kort>

        <Inspirasjonskilder
          kilder={synligeKilder}
          onLeggTil={(ny) => setKilder((liste) => [...liste, { id: Date.now(), ...ny }])}
          onSlett={(id) => setKilder((liste) => liste.filter((k) => k.id !== id))}
        />
      </div>
    </>
  )
}

export default Ukesrapport
