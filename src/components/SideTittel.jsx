function SideTittel({ tittel, undertittel, handling }) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-serif text-3xl font-semibold text-bark-900 md:text-4xl">{tittel}</h1>
        {undertittel && <p className="mt-2 max-w-2xl text-bark-700">{undertittel}</p>}
      </div>
      {handling && <div className="shrink-0">{handling}</div>}
    </header>
  )
}

export default SideTittel
