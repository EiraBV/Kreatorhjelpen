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

export function dagerSiden(iso) {
  const dager = Math.round((tilDato(iDag()) - tilDato(iso)) / 86_400_000)
  if (dager === 0) return 'i dag'
  if (dager === 1) return 'i går'
  return `${dager} dager siden`
}
