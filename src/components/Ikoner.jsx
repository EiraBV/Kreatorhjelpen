// Enkle strekikoner (24×24). Tommelikonene er basert på Lucide (ISC-lisens).

function Ikon({ className = 'size-4', children, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  )
}

export function SokIkon(props) {
  return (
    <Ikon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Ikon>
  )
}

export function GnistIkon(props) {
  return (
    <Ikon {...props} fill="currentColor" stroke="none">
      <path d="M10 2.5 11.9 8.1 17.5 10l-5.6 1.9L10 17.5l-1.9-5.6L2.5 10l5.6-1.9z" />
      <path d="M18.5 14 19.4 16.6 22 17.5l-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" />
    </Ikon>
  )
}

export function VarselIkon(props) {
  return (
    <Ikon {...props}>
      <path d="M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </Ikon>
  )
}

export function TommelOppIkon(props) {
  return (
    <Ikon {...props}>
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </Ikon>
  )
}

export function TommelNedIkon(props) {
  return (
    <Ikon {...props}>
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
    </Ikon>
  )
}

export function ChevronNedIkon(props) {
  return (
    <Ikon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Ikon>
  )
}

export function LukkIkon(props) {
  return (
    <Ikon {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </Ikon>
  )
}

export function SendIkon(props) {
  return (
    <Ikon {...props}>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </Ikon>
  )
}

export function BlyantIkon(props) {
  return (
    <Ikon {...props}>
      <path d="M21.17 6.81a1 1 0 0 0-3.99-3.98L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z" />
      <path d="m15 5 4 4" />
    </Ikon>
  )
}

export function Spinner({ className = 'size-4' }) {
  return (
    <Ikon className={`animate-spin ${className}`}>
      <circle cx="12" cy="12" r="9" className="opacity-25" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </Ikon>
  )
}

export function SjekkIkon(props) {
  return (
    <Ikon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Ikon>
  )
}

export function BrukerPlussIkon(props) {
  return (
    <Ikon {...props}>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21a7 7 0 0 1 14 0" />
      <path d="M19 8v6" />
      <path d="M16 11h6" />
    </Ikon>
  )
}

export function PauseIkon(props) {
  return (
    <Ikon {...props}>
      <path d="M9 5v14" />
      <path d="M15 5v14" />
    </Ikon>
  )
}

export function PilHoyreIkon(props) {
  return (
    <Ikon {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Ikon>
  )
}

export function KalenderIkon(props) {
  return (
    <Ikon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M3 10h18" />
    </Ikon>
  )
}

export function SlettIkon(props) {
  return (
    <Ikon {...props}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
    </Ikon>
  )
}

export function InstagramIkon(props) {
  return (
    <Ikon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </Ikon>
  )
}

export function AvspillIkon(props) {
  return (
    <Ikon {...props}>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" />
    </Ikon>
  )
}

export function NoteIkon(props) {
  return (
    <Ikon {...props}>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </Ikon>
  )
}

export function KloteIkon(props) {
  return (
    <Ikon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </Ikon>
  )
}

export function HashtagIkon(props) {
  return (
    <Ikon {...props}>
      <path d="M4 9h16" />
      <path d="M4 15h16" />
      <path d="M10 3 8 21" />
      <path d="M16 3l-2 18" />
    </Ikon>
  )
}
