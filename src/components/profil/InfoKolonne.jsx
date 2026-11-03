import Seksjon from './Seksjon.jsx'
import { KategoriMerke, StatusMerke } from '../Merker.jsx'
import { dagerSiden, formaterDato } from '../../utils/dato.js'

function Rad({ etikett, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
      <dt className="shrink-0 text-sm text-bark-700">{etikett}</dt>
      <dd className="min-w-0 text-right text-sm font-medium break-words">{children}</dd>
    </div>
  )
}

function Underoverskrift({ children }) {
  return (
    <h3 className="mb-2 text-xs font-semibold tracking-wider text-bark-700 uppercase">
      {children}
    </h3>
  )
}

const lenkeStil = 'text-malt-600 hover:underline'

function InfoKolonne({ skaper }) {
  return (
    <div className="space-y-6">
      <Seksjon tittel="Kontakt">
        <dl className="divide-y divide-cream-200">
          <Rad etikett="Status">
            <StatusMerke status={skaper.status} />
          </Rad>
          <Rad etikett="Siste kontakt">
            {formaterDato(skaper.sisteKontakt)}
            <span className="font-normal text-bark-700"> · {dagerSiden(skaper.sisteKontakt)}</span>
          </Rad>
          <Rad etikett="E-post">
            <a href={`mailto:${skaper.epost}`} className={lenkeStil}>
              {skaper.epost}
            </a>
          </Rad>
          <Rad etikett="Telefon">
            <a href={`tel:${skaper.telefon.replaceAll(' ', '')}`} className={lenkeStil}>
              {skaper.telefon}
            </a>
          </Rad>
        </dl>
        <div className="mt-4 border-t border-cream-200 pt-4">
          <Underoverskrift>Kanaler</Underoverskrift>
          <ul className="space-y-1.5 text-sm font-medium">
            {skaper.kanaler.map((k) => (
              <li key={k.lenke}>
                <a href={k.lenke} target="_blank" rel="noreferrer" className={lenkeStil}>
                  {k.plattform} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Seksjon>

      <Seksjon tittel="Interesser">
        <div className="flex flex-wrap gap-2">
          {skaper.kategorier.map((k) => (
            <KategoriMerke key={k} kategori={k} />
          ))}
        </div>
      </Seksjon>

      <Seksjon tittel="Avtale og belønninger">
        <dl className="divide-y divide-cream-200">
          <Rad etikett="Avtale">
            <span className="font-normal">{skaper.avtale}</span>
          </Rad>
          <Rad etikett="Neste evaluering">{formaterDato(skaper.nesteEvaluering)}</Rad>
        </dl>
        <div className="mt-4 border-t border-cream-200 pt-4">
          <Underoverskrift>Produkter mottatt</Underoverskrift>
          <ul className="space-y-2 text-sm">
            {skaper.produkterMottatt.map((p) => (
              <li key={p.navn} className="flex justify-between gap-3">
                <span className="font-medium">{p.navn}</span>
                <span className="shrink-0 text-bark-700">{formaterDato(p.dato)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Seksjon>
    </div>
  )
}

export default InfoKolonne
