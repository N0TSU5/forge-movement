import { useState } from 'react'

// The "F" mark from the nav bar (public/images/logo-mark.png), with an SVG fallback.
export function LogoMark({ className = '' }) {
  const [failed, setFailed] = useState(false)
  if (!failed) {
    return (
      <img className={`logo-mark ${className}`} src="/images/logo-mark.png" alt="Forge Movement"
        onError={() => setFailed(true)} />
    )
  }
  return (
    <svg className={`logo-mark ${className}`} viewBox="0 0 48 40" role="img" aria-label="Forge Movement">
      <path d="M6 4h40l-4 7H10z M10 15h26l-3 6H13z M10 15h7l-3 21H7z" fill="currentColor" />
    </svg>
  )
}

// FORGE / — MOVEMENT — lockup. Uses public/images/logo-lockup.png if present.
export function LogoLockup({ className = '' }) {
  const [failed, setFailed] = useState(false)
  if (!failed) {
    return (
      <img className={`lockup lockup--img ${className}`} src="/images/logo-lockup.png"
        alt="Forge Movement" onError={() => setFailed(true)} />
    )
  }
  return (
    <span className={`lockup ${className}`} role="img" aria-label="Forge Movement">
      <span className="lockup__forge" aria-hidden="true">FORG<span className="lockup__e">E</span></span>
      <span className="lockup__movement" aria-hidden="true">Movement</span>
    </span>
  )
}
