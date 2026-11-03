import { useState } from 'react'
import { DataContext } from './useData.js'
import { skapere as startSkapere } from './skapere.js'
import { LAGT_TIL_AV, notater as startNotater } from './notater.js'
import { innhold as startInnhold } from './innhold.js'
import { sendinger } from './sendinger.js'
import { ideer as startIdeer } from './ideer.js'
import { iDag } from '../utils/dato.js'
import { useLokalTilstand } from '../utils/useLokalTilstand.js'

const startIdebank = () =>
  startIdeer.map((i) => ({ ...i, lagret: false, skjult: false, ny: false }))

// Falsk database: tilstanden lever i minnet og nullstilles ved omlasting,
// bortsett fra Idébanken, som lagres i localStorage.
function DataProvider({ children }) {
  const [skapere, setSkapere] = useState(startSkapere)
  const [notater, setNotater] = useState(startNotater)
  const [innhold, setInnhold] = useState(startInnhold)
  const [ideer, setIdeer] = useLokalTilstand('kreatorhjelpen.idebank.v1', startIdebank)

  function oppdaterSkaper(id, endring) {
    setSkapere((liste) => liste.map((s) => (s.id === id ? { ...s, ...endring(s) } : s)))
  }

  function registrerKontakt(skaperId) {
    oppdaterSkaper(skaperId, () => ({ sisteKontakt: iDag() }))
  }

  function leggTilNotat(skaperId, { tekst, kanal }) {
    setNotater((liste) => [
      { id: Date.now(), skaperId, dato: iDag(), kanal, tekst, lagtTilAv: LAGT_TIL_AV },
      ...liste,
    ])
    registrerKontakt(skaperId)
  }

  function leggTilInnhold(skaperId, nytt) {
    setInnhold((liste) => [{ id: Date.now(), skaperId, ...nytt }, ...liste])
    oppdaterSkaper(skaperId, (s) => ({ antallPublisert: s.antallPublisert + 1 }))
  }

  function leggTilIde(ide) {
    setIdeer((liste) => [ide, ...liste])
  }

  const verdi = {
    skapere,
    notater,
    innhold,
    sendinger,
    ideer,
    setIdeer,
    leggTilIde,
    registrerKontakt,
    leggTilNotat,
    leggTilInnhold,
  }

  return <DataContext.Provider value={verdi}>{children}</DataContext.Provider>
}

export default DataProvider
