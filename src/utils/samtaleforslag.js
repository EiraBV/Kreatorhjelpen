// Samtaleforslag fra faste maler – ingen ekte AI. Malene fylles bare med
// det som faktisk står i dataen (fornavn, produkt, dato, utdrag av notat),
// så forslaget aldri inneholder oppdiktede personlige detaljer.

import { formaterLangDato } from './dato.js'

export const ANTALL_VARIANTER = 3

// Første setning av notatet, kuttet ved et helt ord hvis den er lang.
export function utdrag(tekst, maks = 90) {
  const setning = tekst.trim().split(/(?<=[.!?])\s/)[0]
  if (setning.length <= maks) return setning
  return `${setning.slice(0, maks).replace(/\s+\S*$/, '')} …`
}

const maler = {
  sending: [
    ({ fornavn, produkt }) =>
      `Hei ${fornavn}! Lenge siden sist. Hvordan har det gått med ${produkt}? Si gjerne fra om du trenger noe mer fra oss.`,
    ({ fornavn, produkt, dato }) =>
      `Hei ${fornavn}, ville bare høre hvordan det gikk med ${produkt} som vi sendte ${dato}. Har du rukket å teste det ennå?`,
    ({ produkt }) =>
      `Hei! Tenkte på deg i dag – hvordan går det med ${produkt}? Gi en lyd hvis det er noe vi kan hjelpe med.`,
  ],
  notat: [
    ({ fornavn, dato, sitat }) =>
      `Hei ${fornavn}! Lenge siden sist. Sist vi snakket (${dato}) handlet det om dette: «${sitat}» Hvordan går det med det nå?`,
    ({ fornavn, dato, sitat }) =>
      `Hei ${fornavn}, jeg tenkte på praten vår ${dato}: «${sitat}» Har det skjedd noe nytt siden sist?`,
    ({ dato, sitat }) =>
      `Hei! Ville bare følge opp fra sist (${dato}): «${sitat}» Si gjerne fra hvordan det går, og om vi kan hjelpe med noe.`,
  ],
  sjekkInn: [
    ({ fornavn }) =>
      `Hei ${fornavn}! Lenge siden sist – hvordan går det? Si gjerne fra om det er noe vi kan hjelpe deg med.`,
    ({ fornavn }) =>
      `Hei ${fornavn}, ville bare sjekke inn og høre hvordan det står til. Har du noe på gang som vi kan bidra med?`,
    () => `Hei! Tenkte det var på tide med en liten prat. Hvordan går det med deg for tiden?`,
  ],
}

export function lagForslag({ skaper, sisteNotat, sending }, variant) {
  const fornavn = skaper.navn.split(' ')[0]
  const indeks = variant % ANTALL_VARIANTER

  if (sending) {
    return maler.sending[indeks]({
      fornavn,
      produkt: sending.produkt,
      dato: formaterLangDato(sending.sendtDato),
    })
  }
  if (sisteNotat) {
    return maler.notat[indeks]({
      fornavn,
      dato: formaterLangDato(sisteNotat.dato),
      sitat: utdrag(sisteNotat.tekst),
    })
  }
  return maler.sjekkInn[indeks]({ fornavn })
}
