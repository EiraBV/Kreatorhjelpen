import { Link } from 'react-router-dom'
import { BrukerPlussIkon, PauseIkon, SjekkIkon } from '../components/Ikoner.jsx'
import OppfolgingListe from '../components/oversikt/OppfolgingListe.jsx'
import OversiktSok from '../components/oversikt/OversiktSok.jsx'
import Seksjon from '../components/profil/Seksjon.jsx'
import { useData } from '../data/useData.js'
import { antallDagerSiden, formaterDato, formaterLangDato, iDag } from '../utils/dato.js'

const MAKS_RADER = 5

const statusKort = [
  { status: 'Aktiv', tittel: 'Aktive', Ikon: SjekkIkon, farge: 'bg-hops-600/15 text-hops-600' },
  { status: 'Prøveperiode', tittel: 'Nye', Ikon: BrukerPlussIkon, farge: 'bg-malt-500/20 text-malt-600' },
  { status: 'Inaktiv', tittel: 'Inaktive', Ikon: PauseIkon, farge: 'bg-bark-300/40 text-bark-700' },
]

function Oversikt() {
  const { skapere, innhold } = useData()

  // Lengst siden siste kontakt øverst; skapere uten kontakt (dager = null) aller øverst.
  const trengerOppfolging = skapere
    .map((s) => ({ ...s, dager: s.sisteKontakt ? antallDagerSiden(s.sisteKontakt) : null }))
    .sort((a, b) => (b.dager ?? Infinity) - (a.dager ?? Infinity))

  const sisteInnhold = [...innhold]
    .sort((a, b) => b.dato.localeCompare(a.dato))
    .slice(0, MAKS_RADER)
  const skaperNavn = (id) => skapere.find((s) => s.id === id)?.navn

  return (
    <>
      <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.15em] text-malt-600 uppercase">
            {formaterLangDato(iDag())}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-bark-900 md:text-4xl">
            Oversikt
          </h1>
          <p className="mt-2 max-w-2xl text-bark-700">
            Slik går det med skaperne dine akkurat nå – hvem som har fått hva, og hvem som trenger
            en melding.
          </p>
        </div>
        <OversiktSok />
      </header>

      <div className="mb-6 grid gap-6 sm:grid-cols-3">
        {statusKort.map(({ status, tittel, Ikon, farge }) => (
          <Link
            key={status}
            to={`/skapere?status=${encodeURIComponent(status)}`}
            className="flex items-start justify-between gap-3 rounded-xl border border-cream-300 bg-cream-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-bark-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-malt-500 focus-visible:outline-none"
          >
            <div>
              <p className="text-sm font-medium text-bark-700">{tittel}</p>
              <p className="mt-2 font-serif text-4xl font-semibold">
                {skapere.filter((s) => s.status === status).length}
              </p>
            </div>
            <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${farge}`}>
              <Ikon className="size-5" />
            </span>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Seksjon
          tittel="Trenger oppfølging"
          undertittel="Sortert etter hvor lenge siden du sist snakket med dem"
          handling={
            <Link
              to="/skapere"
              className="shrink-0 text-sm font-medium text-malt-600 hover:underline"
            >
              Alle skapere
            </Link>
          }
        >
          <div className="-mr-2 max-h-[26rem] overflow-y-auto pr-2">
            <OppfolgingListe skapere={trengerOppfolging} />
          </div>
        </Seksjon>

        <Seksjon
          tittel="Siste innhold"
          undertittel="Det skaperne har publisert i det siste. Nyeste først."
        >
          <ul className="divide-y divide-cream-200">
            {sisteInnhold.map((i) => (
              <li
                key={i.id}
                className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="font-medium">{i.tittel}</p>
                  <p className="text-xs text-bark-700">
                    {skaperNavn(i.skaperId)} · {i.plattform} · {formaterDato(i.dato)}
                  </p>
                </div>
                <a
                  href={i.lenke}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-sm font-medium text-malt-600 hover:underline"
                >
                  Åpne innlegget ↗
                </a>
              </li>
            ))}
          </ul>
        </Seksjon>
      </div>
    </>
  )
}

export default Oversikt
