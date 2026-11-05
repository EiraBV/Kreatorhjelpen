// Som profilsidens Seksjon, men handlingen brytes under overskriften på smale skjermer.
function Kort({ tittel, undertittel, handling, children }) {
  return (
    <section className="rounded-xl border border-cream-300 bg-cream-50 p-6 shadow-sm md:p-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h2 className="font-serif text-xl font-semibold">{tittel}</h2>
          {undertittel && <p className="mt-1 text-sm text-bark-700">{undertittel}</p>}
        </div>
        {handling && <div className="shrink-0">{handling}</div>}
      </div>
      {children}
    </section>
  )
}

export default Kort
