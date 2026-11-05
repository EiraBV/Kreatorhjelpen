import { useState } from 'react'
import {
  AvspillIkon,
  HashtagIkon,
  InstagramIkon,
  KloteIkon,
  NoteIkon,
  SlettIkon,
} from '../Ikoner.jsx'
import { Merke } from '../Merker.jsx'
import Kort from './Kort.jsx'
import { felt, primaerKnapp, sekundaerKnapp, smaaKort } from '../stil.js'
import { KILDETYPER } from '../../data/kilder.js'
import { KATEGORIER } from '../../data/skapere.js'

const typeIkon = {
  'Instagram-konto': InstagramIkon,
  'YouTube-kanal': AvspillIkon,
  TikTok: NoteIkon,
  Nettside: KloteIkon,
  Hashtag: HashtagIkon,
}

const tomtSkjema = { navn: '', type: KILDETYPER[0], adresse: '', kategori: KATEGORIER[0] }

const visAdresse = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

function Inspirasjonskilder({ kilder, onLeggTil, onSlett }) {
  const [visSkjema, setVisSkjema] = useState(false)
  const [skjema, setSkjema] = useState(tomtSkjema)

  const sett = (navn) => (e) => setSkjema((s) => ({ ...s, [navn]: e.target.value }))

  function lukk() {
    setVisSkjema(false)
    setSkjema(tomtSkjema)
  }

  function lagre(e) {
    e.preventDefault()
    onLeggTil({ ...skjema, navn: skjema.navn.trim(), adresse: skjema.adresse.trim() })
    lukk()
  }

  return (
    <Kort
      tittel="Inspirasjonskilder"
      undertittel="Kontoer og sider trendene hentes fra"
      handling={
        !visSkjema && (
          <button type="button" onClick={() => setVisSkjema(true)} className={sekundaerKnapp}>
            + Legg til kilde
          </button>
        )
      }
    >
      {visSkjema && (
        <form onSubmit={lagre} className={`${smaaKort} mb-4 grid gap-3 sm:grid-cols-2`}>
          <label className="text-xs font-medium text-bark-700">
            Navn
            <input required value={skjema.navn} onChange={sett('navn')} className={`${felt} mt-1`} />
          </label>
          <label className="text-xs font-medium text-bark-700">
            Type
            <select value={skjema.type} onChange={sett('type')} className={`${felt} mt-1`}>
              {KILDETYPER.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-medium text-bark-700">
            Adresse
            <input
              required
              type="url"
              placeholder="https://"
              value={skjema.adresse}
              onChange={sett('adresse')}
              className={`${felt} mt-1`}
            />
          </label>
          <label className="text-xs font-medium text-bark-700">
            Kategori
            <select value={skjema.kategori} onChange={sett('kategori')} className={`${felt} mt-1`}>
              {KATEGORIER.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </label>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <button type="button" onClick={lukk} className={sekundaerKnapp}>
              Avbryt
            </button>
            <button type="submit" className={primaerKnapp}>
              Lagre
            </button>
          </div>
        </form>
      )}

      {kilder.length > 0 ? (
        <ul className="divide-y divide-cream-200">
          {kilder.map((k) => {
            const Ikon = typeIkon[k.type] ?? KloteIkon
            return (
              <li key={k.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cream-200 text-bark-800">
                  <Ikon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-medium">{k.navn}</span>
                    <Merke>{k.type}</Merke>
                    <span className="text-xs text-bark-700">{k.kategori}</span>
                  </div>
                  <a
                    href={k.adresse}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 block truncate text-sm text-malt-600 hover:underline"
                  >
                    {visAdresse(k.adresse)} ↗
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => onSlett(k.id)}
                  aria-label={`Slett ${k.navn}`}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-bark-700 transition-colors hover:bg-tomato-600/10 hover:text-tomato-600"
                >
                  <SlettIkon className="size-4" />
                </button>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-sm text-bark-700">Ingen kilder å vise.</p>
      )}

    </Kort>
  )
}

export default Inspirasjonskilder
