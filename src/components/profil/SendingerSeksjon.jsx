import Seksjon from './Seksjon.jsx'
import { StatusMerke } from '../Merker.jsx'
import { smaaKort } from '../stil.js'
import { formaterDato } from '../../utils/dato.js'

function SendingerSeksjon({ sendinger }) {
  return (
    <Seksjon tittel="Pågående sendinger" undertittel="Produkter sendt, men ikke publisert ennå">
      {sendinger.length > 0 ? (
        <ul className="space-y-3">
          {sendinger.map((s) => (
            <li key={s.id} className={`${smaaKort} flex items-center justify-between gap-4`}>
              <div className="min-w-0">
                <p className="font-medium">{s.produkt}</p>
                <p className="mt-0.5 text-xs text-bark-700">
                  Sendt {formaterDato(s.sendtDato)} · venter på innhold
                </p>
              </div>
              <StatusMerke status={s.status} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-bark-700">Ingen pågående sendinger.</p>
      )}
    </Seksjon>
  )
}

export default SendingerSeksjon
