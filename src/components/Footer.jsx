import { Link } from 'react-router'
import { site } from '../lib/content'
import { LogoLockup } from './Logo'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <LogoLockup className="lockup--small" />
          <p>{site.tagline}</p>
        </div>

        <div>
          <h2 className="site-footer__heading">Visit</h2>
          <address>
            {site.address_line1}<br />
            {site.address_line2}<br />
            {site.address_line3}
          </address>
        </div>

        <div>
          <h2 className="site-footer__heading">Contact</h2>
          <ul className="site-footer__list">
            {site.phone && <li><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>}
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a href={`https://www.instagram.com/${site.instagram}/`} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href={`https://www.tiktok.com/@${site.tiktok}`} target="_blank" rel="noreferrer">TikTok</a></li>
          </ul>
        </div>

        <div>
          <h2 className="site-footer__heading">Explore</h2>
          <ul className="site-footer__list">
            <li><Link to="/classes">Classes</Link></li>
            <li><Link to="/schedule">Class Schedule</Link></li>
            <li><Link to="/first-timer">First Timer</Link></li>
            <li><Link to="/contact#careers">Careers</Link></li>
            <li><Link to="/contact#faqs">FAQs</Link></li>
          </ul>
        </div>
      </div>
      <div className="container site-footer__legal">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  )
}
