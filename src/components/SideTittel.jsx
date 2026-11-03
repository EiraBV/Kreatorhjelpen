function SideTittel({ tittel, undertittel }) {
  return (
    <header className="mb-8">
      <h1 className="font-serif text-3xl font-semibold text-bark-900 md:text-4xl">{tittel}</h1>
      {undertittel && <p className="mt-2 text-bark-700">{undertittel}</p>}
    </header>
  )
}

export default SideTittel
