// Datoer lagres som 'ÅÅÅÅ-MM-DD' og tolkes i lokal tid.

const datoFormat = new Intl.DateTimeFormat('nb-NO', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function tilDato(iso) {
  const [aar, mnd, dag] = iso.split('-').map(Number)
  return new Date(aar, mnd - 1, dag)
}

export function formaterDato(iso) {
  return datoFormat.format(tilDato(iso))
}

export function iDag() {
  const d = new Date()
  const mnd = String(d.getMonth() + 1).padStart(2, '0')
  const dag = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mnd}-${dag}`
}

const langDatoFormat = new Intl.DateTimeFormat('nb-NO', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function formaterLangDato(iso) {
  return langDatoFormat.format(tilDato(iso))
}

export function antallDagerSiden(iso) {
  return Math.round((tilDato(iDag()) - tilDato(iso)) / 86_400_000)
}

export function dagerSiden(iso) {
  const dager = antallDagerSiden(iso)
  if (dager === 0) return 'i dag'
  if (dager === 1) return 'i går'
  return `${dager} dager siden`
}

const maanedFormat = new Intl.DateTimeFormat('nb-NO', { month: 'long' })

// «2.–8. november», eller «27. oktober–2. november» når uken går over to måneder.
export function formaterUkeSpenn(startIso, sluttIso) {
  const start = tilDato(startIso)
  const slutt = tilDato(sluttIso)
  const mnd = (d) => maanedFormat.format(d)
  return start.getMonth() === slutt.getMonth()
    ? `${start.getDate()}.–${slutt.getDate()}. ${mnd(slutt)}`
    : `${start.getDate()}. ${mnd(start)}–${slutt.getDate()}. ${mnd(slutt)}`
}
