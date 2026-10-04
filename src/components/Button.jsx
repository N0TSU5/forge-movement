import { Link } from 'react-router'

// Pill button. variant: "ember" (outline), "cream" (outline), "solid".
export default function Button({ to, children, variant = 'ember', className = '' }) {
  const cls = `btn btn--${variant} ${className}`
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    const external = to.startsWith('http')
    return (
      <a className={cls} href={to} {...(external && { target: '_blank', rel: 'noreferrer' })}>
        {children}
      </a>
    )
  }
  return <Link className={cls} to={to}>{children}</Link>
}
