import { useState } from 'react'
import Seksjon from './Seksjon.jsx'
import { felt, primaerKnapp, sekundaerKnapp, smaaKort } from '../stil.js'
import { PLATTFORMER } from '../../data/innhold.js'
import { formaterDato, iDag } from '../../utils/dato.js'

const tomtSkjema = () => ({ tittel: '', plattform: PLATTFORMER[0], dato: iDag(), lenke: '' })

function InnholdSeksjon({ innhold, onLeggTil }) {
  const [visSkjema, setVisSkjema] = useState(false)
  const [skjema, setSkjema] = useState(tomtSkjema)

  const sett = (navn) => (e) => setSkjema((s) => ({ ...s, [navn]: e.target.value }))

  function lagre(e) {
    e.preventDefault()
    onLeggTil({ ...skjema, tittel: skjema.tittel.trim(), lenke: skjema.lenke.trim() })
    setSkjema(tomtSkjema())
    setVisSkjema(false)
  }

  return (
    <Seksjon
      tittel="Publisert innhold"
      undertittel={`${innhold.length} publisert – nyeste først`}
      handling={
        !visSkjema && (
          <button
            type="button"
            onClick={() => setVisSkjema(true)}
            className={`${sekundaerKnapp} shrink-0`}
          >
            + Legg til innhold
          </button>
        )
      }
    >
      {visSkjema && (
        <form onSubmit={lagre} className={`${smaaKort} mb-4 grid gap-3 sm:grid-cols-2`}>
          <label className="text-xs font-medium text-bark-700 sm:col-span-2">
            Tittel
            <input required value={skjema.tittel} onChange={sett('tittel')} className={`${felt} mt-1`} />
          </label>
          <label className="text-xs font-medium text-bark-700">
            Plattform
            <select value={skjema.plattform} onChange={sett('plattform')} className={`${felt} mt-1`}>
              {PLATTFORMER.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-medium text-bark-700">
            Dato
            <input required type="date" value={skjema.dato} onChange={sett('dato')} className={`${felt} mt-1`} />
          </label>
          <label className="text-xs font-medium text-bark-700 sm:col-span-2">
            Lenke
            <input
              required
              type="url"
              placeholder="https://"
              value={skjema.lenke}
              onChange={sett('lenke')}
              className={`${felt} mt-1`}
            />
          </label>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <button type="button" onClick={() => setVisSkjema(false)} className={sekundaerKnapp}>
              Avbryt
            </button>
            <button type="submit" className={primaerKnapp}>
              Lagre innhold
            </button>
          </div>
        </form>
      )}

      {innhold.length > 0 ? (
        <ul className="space-y-3">
          {innhold.map((i) => (
            <li key={i.id} className={smaaKort}>
              <p className="font-medium">{i.tittel}</p>
              <p className="mt-0.5 text-xs text-bark-700">
                {i.plattform} · {formaterDato(i.dato)}
              </p>
              <a
                href={i.lenke}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm font-medium text-malt-600 hover:underline"
              >
                Åpne innlegget ↗
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-bark-700">Ingen innhold registrert ennå.</p>
      )}
    </Seksjon>
  )
}

export default InnholdSeksjon
