import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { getCollection } from '../lib/content'
import { LogoMark } from './Logo'

const classes = getCollection('classes')

const NAV = [
  {
    label: 'Home', to: '/', end: true,
    children: [
      { label: 'Our Story', to: '/our-story' },
      { label: 'First Timer', to: '/first-timer' },
    ],
  },
  {
    label: 'Classes', to: '/classes',
    children: [
      { label: 'All classes', to: '/classes' },
      ...classes.map((c) => ({ label: c.meta.title, to: `/classes/${c.slug}` })),
    ],
  },
  { label: 'Instructor', to: '/instructors' },
  { label: 'Class Schedule', to: '/schedule' },
  { label: 'Contact', to: '/contact' },
]

function Chevron() {
  return (
    <svg className="nav__chevron" viewBox="0 0 12 8" aria-hidden="true">
      <path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    setExpanded(null)
  }, [location.pathname])

  return (
    <header className={`site-header ${open ? 'is-open' : ''}`}>
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo"><LogoMark /></Link>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">Menu</span>
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>

        <nav id="primary-nav" className="nav" aria-label="Primary">
          <ul className="nav__list">
            {NAV.map((item) => (
              <li
                key={item.label}
                className={`nav__item ${item.children ? 'has-children' : ''} ${expanded === item.label ? 'is-expanded' : ''}`}
              >
                <NavLink to={item.to} end={item.end} className="nav__link">
                  {item.label}
                </NavLink>
                {item.children && (
                  <>
                    <button
                      className="nav__expand"
                      aria-expanded={expanded === item.label}
                      aria-label={`${item.label} submenu`}
                      onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                    >
                      <Chevron />
                    </button>
                    <ul className="nav__sub">
                      {item.children.map((c) => (
                        <li key={c.to + c.label}>
                          <NavLink to={c.to} end className="nav__sublink">{c.label}</NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
