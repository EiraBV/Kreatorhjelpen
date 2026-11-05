import { useEffect, useRef, useState } from 'react'
import { felt, primaerKnapp, sekundaerKnapp } from '../stil.js'
import { NOTAT_KANALER } from '../../data/notater.js'
import { formaterDato } from '../../utils/dato.js'
import { lagForslag, utdrag } from '../../utils/samtaleforslag.js'

function Overskrift({ children }) {
  return (
    <h3 className="mb-2 text-xs font-semibold tracking-wider text-bark-700 uppercase">{children}</h3>
  )
}

function Samtaleforslag({ id, skaper, dager, sisteNotat, sending, onLagre }) {
  const [variant, setVariant] = useState(0)
  const [tekst, setTekst] = useState(() => lagForslag({ skaper, sisteNotat, sending }, 0))
  const [kopiert, setKopiert] = useState(false)
  const [visKontakt, setVisKontakt] = useState(false)
  const [kanal, setKanal] = useState(NOTAT_KANALER[0])
  const [notat, setNotat] = useState('')
  const tidtaker = useRef(null)

  useEffect(() => () => clearTimeout(tidtaker.current), [])

  function nyttForslag() {
    const neste = variant + 1
    setVariant(neste)
    setTekst(lagForslag({ skaper, sisteNotat, sending }, neste))
  }

  async function kopier() {
    try {
      await navigator.clipboard.writeText(tekst)
      setKopiert(true)
      clearTimeout(tidtaker.current)
      tidtaker.current = setTimeout(() => setKopiert(false), 2000)
    } catch {
      // Utklippstavlen er ikke tilgjengelig (f.eks. uten https); teksten kan kopieres manuelt.
    }
  }

  function lagre(e) {
    e.preventDefault()
    onLagre({ kanal, tekst: notat.trim() || 'Tok kontakt for å følge opp.' })
  }

  return (
    <div id={id} className="mt-3 space-y-5 rounded-lg border border-cream-200 bg-cream-100 p-4">
      <section>
        <Overskrift>Hvorfor nå</Overskrift>
        <ul className="list-disc space-y-1 pl-5 text-sm marker:text-bark-300">
          <li>{dager === null ? 'Ingen kontakt ennå' : `${dager} dager siden siste kontakt`}</li>
          {sisteNotat && (
            <li>
              Siste notat {formaterDato(sisteNotat.dato)}: «{utdrag(sisteNotat.tekst, 70)}»
            </li>
          )}
          {sending && (
            <li>
              Fikk {sending.produkt} {formaterDato(sending.sendtDato)}, har ikke publisert ennå
            </li>
          )}
        </ul>
      </section>

      <section>
        <Overskrift>Forslag til hva du kan si</Overskrift>
        <textarea
          value={tekst}
          onChange={(e) => setTekst(e.target.value)}
          aria-label="Forslag til melding"
          rows={4}
          className={`${felt} resize-y leading-relaxed`}
        />
        {!visKontakt && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={kopier} className={sekundaerKnapp}>
              {kopiert ? 'Kopiert!' : 'Kopier'}
            </button>
            <button type="button" onClick={nyttForslag} className={sekundaerKnapp}>
              Nytt forslag
            </button>
            <button type="button" onClick={() => setVisKontakt(true)} className={primaerKnapp}>
              Jeg har tatt kontakt
            </button>
          </div>
        )}
      </section>

      {visKontakt && (
        <form onSubmit={lagre} className="space-y-3 border-t border-cream-200 pt-4">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Kanal">
            {NOTAT_KANALER.map((k) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={kanal === k}
                onClick={() => setKanal(k)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  kanal === k
                    ? 'border-bark-900 bg-bark-900 text-cream-50'
                    : 'border-cream-300 bg-cream-50 text-bark-800 hover:border-bark-300'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
          <label className="block text-sm font-medium text-bark-800">
            Hva snakket dere om? <span className="font-normal text-bark-700">(valgfritt)</span>
            <textarea
              value={notat}
              onChange={(e) => setNotat(e.target.value)}
              rows={2}
              className={`${felt} mt-1.5 resize-y`}
            />
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setVisKontakt(false)} className={sekundaerKnapp}>
              Avbryt
            </button>
            <button type="submit" className={primaerKnapp}>
              Lagre
            </button>
          </div>
        </form>
      )}

      <p className="text-xs text-bark-700">
        Forslaget bygger på notatene dine. Du tar alltid kontakten selv – ingenting sendes
        automatisk.
      </p>
    </div>
  )
}

export default Samtaleforslag
