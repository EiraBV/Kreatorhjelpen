import { useEffect, useRef, useState } from 'react'
import { ChevronNedIkon, GnistIkon, LukkIkon, SendIkon } from '../Ikoner.jsx'
import { Boble, Hurtigsvar, OppsummeringKort, SkriverPrikker } from './Meldinger.jsx'
import { KATEGORIER } from '../../data/skapere.js'
import { useData } from '../../data/useData.js'

// Prototype: ingen ekte AI. Samtalen følger en fast rekkefølge av steg,
// og alle svar er forhåndsskrevne.

const FORMATER = ['YouTube-video', 'Story/Reel', 'TikTok']
const USIKKER = 'Usikker'
const START_PAA_NYTT = 'Start på nytt'
const SKRIVETID = 1000

const startMelding = {
  id: 0,
  fra: 'bot',
  tekst: 'Hei! 👋 Har du en idé du vil finpusse? Beskriv den kort, så hjelper jeg deg å gjøre den konkret.',
}

function lagTittel(tekst) {
  const ord = tekst.trim().split(/\s+/)
  const tittel = ord.slice(0, 6).join(' ').replace(/[.,!?;:]+$/, '')
  const medStorBokstav = tittel.charAt(0).toUpperCase() + tittel.slice(1)
  return ord.length > 6 ? `${medStorBokstav} …` : medStorBokstav
}

function Idehjelper() {
  const { skapere, leggTilIde } = useData()
  const [aapen, setAapen] = useState(false)
  const [meldinger, setMeldinger] = useState([startMelding])
  const [steg, setSteg] = useState('ide')
  const [utkast, setUtkast] = useState({})
  const [skriver, setSkriver] = useState(false)
  const [tekst, setTekst] = useState('')

  const nesteId = useRef(1)
  const tidtaker = useRef(null)
  const listeRef = useRef(null)
  const feltRef = useRef(null)

  useEffect(() => () => clearTimeout(tidtaker.current), [])

  useEffect(() => {
    const liste = listeRef.current
    if (liste) liste.scrollTop = liste.scrollHeight
  }, [meldinger, skriver, steg, aapen])

  useEffect(() => {
    if (!aapen) return
    if (steg === 'ide') feltRef.current?.focus()
    const lukkMedEsc = (e) => e.key === 'Escape' && setAapen(false)
    window.addEventListener('keydown', lukkMedEsc)
    return () => window.removeEventListener('keydown', lukkMedEsc)
  }, [aapen, steg])

  function melding(fra, innhold) {
    return { id: nesteId.current++, fra, ...innhold }
  }

  function botSier(nye, nesteSteg) {
    setSkriver(true)
    tidtaker.current = setTimeout(() => {
      setSkriver(false)
      setMeldinger((liste) => [...liste, ...nye.map((n) => melding('bot', n))])
      setSteg(nesteSteg)
    }, SKRIVETID)
  }

  function brukerSier(svar) {
    setMeldinger((liste) => [...liste, melding('bruker', { tekst: svar })])
  }

  function sendIde(e) {
    e.preventDefault()
    const beskrivelse = tekst.trim()
    if (!beskrivelse || skriver) return
    brukerSier(beskrivelse)
    setTekst('')
    setUtkast({ beskrivelse })
    botSier([{ tekst: 'Spennende! Hvilken kategori passer den best i?' }], 'kategori')
  }

  function velg(svar) {
    brukerSier(svar)

    if (steg === 'kategori') {
      setUtkast((u) => ({ ...u, kategori: svar }))
      botSier([{ tekst: 'Hvilket format ser du for deg?' }], 'format')
    } else if (steg === 'format') {
      setUtkast((u) => ({ ...u, format: svar }))
      botSier([{ tekst: 'Hvilken skaper passer best?' }], 'skaper')
    } else if (steg === 'skaper') {
      const skaper = skapere.find((s) => s.navn === svar)
      const ide = {
        tittel: lagTittel(utkast.beskrivelse),
        kategori: utkast.kategori,
        beskrivelse: utkast.beskrivelse,
        anbefaltFormat: utkast.format,
        kilde: 'Egen',
        tildeltSkaperId: skaper?.id ?? null,
      }
      setUtkast((u) => ({ ...u, ide }))
      botSier([{ tekst: 'Her er ideen samlet. Ser den riktig ut?' }, { oppsummering: ide }], 'oppsummering')
    } else if (svar === START_PAA_NYTT) {
      startPaaNytt()
    }
  }

  function lagre() {
    leggTilIde({ ...utkast.ide, id: Date.now(), lagret: true, skjult: false, ny: true })
    brukerSier('Lagre i Idébanken')
    botSier([{ tekst: 'Lagret! Du finner den under Lagrede i Idébanken.' }], 'lagret')
  }

  function startPaaNytt() {
    clearTimeout(tidtaker.current)
    setSkriver(false)
    setMeldinger([startMelding])
    setUtkast({})
    setTekst('')
    setSteg('ide')
  }

  let hurtigsvar = []
  if (steg === 'kategori') hurtigsvar = KATEGORIER
  if (steg === 'format') hurtigsvar = FORMATER
  if (steg === 'skaper') hurtigsvar = [...skapere.map((s) => s.navn), USIKKER]
  if (steg === 'lagret') hurtigsvar = [START_PAA_NYTT]

  const skaperNavn = (id) => skapere.find((s) => s.id === id)?.navn
  const kanSkrive = steg === 'ide' && !skriver

  return (
    <>
      {aapen && (
        <div
          role="dialog"
          aria-label="Idéhjelper"
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-cream-50 sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[560px] sm:max-h-[calc(100dvh-8rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-cream-300 sm:shadow-2xl"
        >
          <header className="flex items-center gap-3 bg-bark-900 px-4 py-3.5 text-cream-50">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bark-700">
              <GnistIkon className="size-5 text-malt-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-lg leading-tight font-semibold">Idéhjelper</p>
              <p className="text-xs text-bark-300">Finpuss en idé sammen med meg</p>
            </div>
            <button
              type="button"
              onClick={() => setAapen(false)}
              aria-label="Lukk"
              className="flex size-8 items-center justify-center rounded-full text-bark-300 transition-colors hover:bg-bark-800 hover:text-cream-50"
            >
              <LukkIkon className="size-5" />
            </button>
          </header>

          <div ref={listeRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {meldinger.map((m) =>
              m.oppsummering ? (
                <OppsummeringKort
                  key={m.id}
                  ide={m.oppsummering}
                  skaperNavn={skaperNavn(m.oppsummering.tildeltSkaperId)}
                  visKnapper={steg === 'oppsummering' && !skriver}
                  onLagre={lagre}
                  onStartPaaNytt={startPaaNytt}
                />
              ) : (
                <Boble key={m.id} fra={m.fra}>
                  {m.tekst}
                </Boble>
              ),
            )}
            {skriver && <SkriverPrikker />}
            {!skriver && hurtigsvar.length > 0 && <Hurtigsvar valg={hurtigsvar} onVelg={velg} />}
          </div>

          <form onSubmit={sendIde} className="flex items-center gap-2 border-t border-cream-200 p-3">
            <input
              ref={feltRef}
              value={tekst}
              onChange={(e) => setTekst(e.target.value)}
              disabled={!kanSkrive}
              placeholder="Beskriv ideen din …"
              aria-label="Melding"
              className="h-10 min-w-0 flex-1 rounded-full border border-cream-300 bg-cream-100 px-4 text-sm placeholder:text-bark-300 focus:border-malt-500 focus:ring-2 focus:ring-malt-500/30 focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!kanSkrive || !tekst.trim()}
              aria-label="Send"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bark-900 text-cream-50 transition-colors hover:bg-bark-700 disabled:opacity-40"
            >
              <SendIkon className="size-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setAapen((a) => !a)}
        aria-expanded={aapen}
        aria-label={aapen ? 'Lukk Idéhjelper' : 'Åpne Idéhjelper'}
        className="fixed right-6 bottom-6 z-40 flex size-14 items-center justify-center rounded-full bg-bark-900 text-cream-50 shadow-lg transition hover:scale-105 hover:bg-bark-700 focus-visible:ring-2 focus-visible:ring-malt-500 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {aapen ? (
          <ChevronNedIkon className="size-6" />
        ) : (
          <GnistIkon className="size-6 text-malt-500" />
        )}
      </button>
    </>
  )
}

export default Idehjelper
