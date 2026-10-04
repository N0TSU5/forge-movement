import { Link } from 'react-router'
import { getEntry, getCollection } from '../lib/content'
import useTitle from '../lib/useTitle'
import Rich from '../components/Rich'
import Body from '../components/Body'
import Photo from '../components/Photo'
import Button from '../components/Button'

const page = getEntry('classes/_page')
const classes = getCollection('classes')

export default function Classes() {
  useTitle('Classes')
  return (
    <>
      <section className="band band--rust page-hero">
        <div className="container container--narrow">
          <h1 className="display"><Rich text={page.meta.heading} /></h1>
          <div className="lede"><Body sections={page.sections} /></div>
        </div>
      </section>

      <section className="band band--cream">
        <div className="container class-list">
          {classes.map((c, i) => (
            <article key={c.slug} className={`class-row ${i % 2 ? 'class-row--flip' : ''}`}>
              <Link to={`/classes/${c.slug}`} className="class-row__media" tabIndex={-1} aria-hidden="true">
                <Photo src={c.meta.image} alt={c.meta.alt} ratio="4 / 3" />
              </Link>
              <div className="class-row__text">
                <span className="eyebrow">{c.meta.type} · {c.meta.level}</span>
                <h2 className="class-row__title">
                  <Link to={`/classes/${c.slug}`}>{c.meta.title}</Link>
                </h2>
                <p className="class-row__tagline">{c.meta.tagline}</p>
                <p>{c.sections[0]?.blocks[0]?.text}</p>
                <Button to={`/classes/${c.slug}`} variant="solid">Explore {c.meta.title}</Button>
              </div>
            </article>
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
