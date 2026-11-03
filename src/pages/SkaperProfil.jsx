import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Initialer } from '../components/Merker.jsx'
import { primaerKnapp, sekundaerKnapp } from '../components/stil.js'
import NotaterSeksjon from '../components/profil/NotaterSeksjon.jsx'
import InnholdSeksjon from '../components/profil/InnholdSeksjon.jsx'
import SendingerSeksjon from '../components/profil/SendingerSeksjon.jsx'
import InfoKolonne from '../components/profil/InfoKolonne.jsx'
import { useData } from '../data/useData.js'

function TilbakeLenke() {
  return (
    <Link to="/skapere" className="text-sm font-medium text-bark-700 hover:text-bark-900">
      ← Alle skapere
    </Link>
  )
}

function SkaperProfil() {
  const { id } = useParams()
  const data = useData()
  const notatFelt = useRef(null)

  const skaper = data.skapere.find((s) => s.id === Number(id))

  if (!skaper) {
    return (
      <>
        <TilbakeLenke />
        <p className="mt-6 text-bark-700">Fant ingen skaper med denne lenken.</p>
      </>
    )
  }

  const notater = data.notater
    .filter((n) => n.skaperId === skaper.id)
    .sort((a, b) => b.dato.localeCompare(a.dato))
  const innhold = data.innhold.filter((i) => i.skaperId === skaper.id)
  const sendinger = data.sendinger.filter((s) => s.skaperId === skaper.id)

  function fokuserNotat() {
    notatFelt.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    notatFelt.current?.focus({ preventScroll: true })
  }

  return (
    <>
      <TilbakeLenke />

      <header className="mt-4 mb-6 flex flex-col gap-5 rounded-xl border border-cream-300 bg-cream-50 p-6 shadow-sm sm:flex-row sm:items-center md:p-8">
        <Initialer navn={skaper.navn} className="size-24 text-3xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="font-serif text-3xl font-semibold md:text-4xl">{skaper.navn}</h1>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => data.registrerKontakt(skaper.id)}
                className={primaerKnapp}
              >
                Registrer kontakt
              </button>
              <button type="button" onClick={fokuserNotat} className={sekundaerKnapp}>
                Nytt notat
              </button>
            </div>
          </div>
          <p className="mt-1 text-bark-700">
            «{skaper.kallenavn}» · {skaper.rolle}
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <NotaterSeksjon
            notater={notater}
            feltRef={notatFelt}
            onLagre={(notat) => data.leggTilNotat(skaper.id, notat)}
          />
          <InnholdSeksjon
            innhold={innhold}
            onLeggTil={(nytt) => data.leggTilInnhold(skaper.id, nytt)}
          />
          <SendingerSeksjon sendinger={sendinger} />
        </div>
        <InfoKolonne skaper={skaper} />
      </div>
    </>
  )
}

export default SkaperProfil
