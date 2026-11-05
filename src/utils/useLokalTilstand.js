import { useEffect, useState } from 'react'

// useState som også lagres i localStorage. Faller tilbake til startverdien
// hvis lagringen er utilgjengelig eller inneholder ugyldig data.
export function useLokalTilstand(nokkel, startverdi) {
  const [verdi, setVerdi] = useState(() => {
    try {
      const lagret = localStorage.getItem(nokkel)
      if (lagret !== null) return JSON.parse(lagret)
    } catch {
      // ignorer
    }
    return typeof startverdi === 'function' ? startverdi() : startverdi
  })

  useEffect(() => {
    try {
      localStorage.setItem(nokkel, JSON.stringify(verdi))
    } catch {
      // ignorer
    }
  }, [nokkel, verdi])

  return [verdi, setVerdi]
}
