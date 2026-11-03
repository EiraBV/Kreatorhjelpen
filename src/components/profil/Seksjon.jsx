function Seksjon({ tittel, undertittel, teller, handling, children }) {
  return (
    <section className="rounded-xl border border-cream-300 bg-cream-50 p-6 shadow-sm md:p-8">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-serif text-xl font-semibold">{tittel}</h2>
          {undertittel && <p className="mt-1 text-sm text-bark-700">{undertittel}</p>}
        </div>
        {teller !== undefined && (
          <span className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-cream-200 px-2 text-xs font-semibold text-bark-800">
            {teller}
          </span>
        )}
        {handling}
      </div>
      {children}
    </section>
  )
}

export default Seksjon
