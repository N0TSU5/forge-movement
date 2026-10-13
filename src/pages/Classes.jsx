import { Link } from 'react-router'
import { getEntry, getApproach } from '../lib/content'
import useTitle from '../lib/useTitle'
import Rich from '../components/Rich'
import Body from '../components/Body'
import Photo from '../components/Photo'
import Button from '../components/Button'

const page = getEntry('classes/_page')
const { pillars } = getApproach()

export default function Classes() {
  useTitle('Classes')
  let row = 0 // alternates photo side across all groups
  return (
    <>
      <section className="band band--rust page-hero">
        <div className="container container--narrow">
          <h1 className="display"><Rich text={page.meta.heading} /></h1>
          <div className="lede"><Body sections={page.sections} /></div>
          <nav className="pillar-jump" aria-label="Class groups">
            {pillars.map((p) => (
              <a key={p.meta.id} href={`#${p.meta.id}`}>{p.meta.title}</a>
            ))}
          </nav>
        </div>
      </section>

      <section className="band band--cream">
        <div className="container class-list">
          {pillars.map((p) => (
            <div key={p.meta.id} id={p.meta.id} className="pillar-group">
              <header className="pillar-group__head">
                <span className="eyebrow">{p.meta.title}</span>
                <h2 className="display display--brown">{p.meta.tagline}</h2>
                <div className="prose prose--large"><Body sections={p.sections} /></div>
              </header>

              {p.classes.map((c) => (
                <article key={c.slug} className={`class-row ${row++ % 2 ? 'class-row--flip' : ''}`}>
                  <Link to={`/classes/${c.slug}`} className="class-row__media" tabIndex={-1} aria-hidden="true">
                    <Photo src={c.meta.image} alt={c.meta.alt} ratio="4 / 3" />
                  </Link>
                  <div className="class-row__text">
                    <span className="eyebrow">{c.meta.type} · {c.meta.level}</span>
                    <h3 className="class-row__title">
                      <Link to={`/classes/${c.slug}`}>{c.meta.title}</Link>
                    </h3>
                    <p className="class-row__tagline">{c.meta.tagline}</p>
                    <p>{c.sections[0]?.blocks[0]?.text}</p>
                    <Button to={`/classes/${c.slug}`} variant="solid">Explore {c.meta.title}</Button>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="band band--brown center">
        <div className="container container--narrow">
          <h2 className="display">First time at <em className="accent">Forge</em>?</h2>
          <p className="lede">Everything you need to know before your first class: what to bring, when to arrive and which class to choose.</p>
          <Button to="/first-timer">First timer guide</Button>
        </div>
      </section>
    </>
  )
}
