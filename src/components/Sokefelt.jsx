import { SokIkon } from './Ikoner.jsx'

function Sokefelt({ verdi, onEndre, placeholder }) {
  return (
    <div className="relative w-full sm:w-72">
      <SokIkon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-bark-300" />
      <input
        type="search"
        value={verdi}
        onChange={(e) => onEndre(e.target.value)}
        placeholder={placeholder}
        aria-label="Søk"
        className="w-full rounded-lg border border-cream-300 bg-cream-50 py-2 pr-4 pl-9 text-sm placeholder:text-bark-300 focus:border-malt-500 focus:ring-2 focus:ring-malt-500/30 focus:outline-none"
      />
    </div>
  )
}

export default Sokefelt
