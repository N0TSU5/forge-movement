import { Link, useParams } from 'react-router'
import { getCollection, intro, findSection, bookingHref } from '../lib/content'
import useTitle from '../lib/useTitle'
import Body, { Blocks } from '../components/Body'
import Photo from '../components/Photo'
import Button from '../components/Button'
import NotFound from './NotFound'

const classes = getCollection('classes')

export default function ClassDetail() {
  const { slug } = useParams()
  const c = classes.find((x) => x.slug === slug)
  useTitle(c?.meta.title)
  if (!c) return <NotFound />

  const m = c.meta
  const bring = findSection(c, 'What to bring')
  const others = classes.filter((x) => x.slug !== slug)

  return (
    <>
      <section className="band band--brown class-cover">
        <div className="container class-cover__grid">
          <div className="class-cover__text">
            <Link to="/classes" className="back-link">← All classes</Link>
            <h1 className="display">{m.title}</h1>
            <p className="class-cover__tagline">{m.tagline}</p>
            <ul className="chips">
              {m.type && <li>{m.type}</li>}
              {m.level && <li>{m.level}</li>}
              {m.capacity && <li>{m.capacity}</li>}
              {m.duration && <li>{m.duration}</li>}
            </ul>
            <Button to={bookingHref()}>Book this class</Button>
          </div>

          {bring && (
            <aside className="bring-card" aria-labelledby="bring-heading">
              <span className="eyebrow">First time?</span>
              <h2 id="bring-heading" className="bring-card__title">What to bring</h2>
              <Blocks blocks={bring.blocks} />
              <Link to="/first-timer" className="text-link">Read the first-timer guide →</Link>
            </aside>
          )}
        </div>
      </section>

      <section className="band band--cream">
        <div className="container class-body">
          <Photo src={m.image} alt={m.alt} ratio="4 / 5" className="class-body__photo" />
          <div className="prose prose--large"><Body sections={intro(c)} /></div>
        </div>
      </section>

      <section className="band band--white">
        <div className="container">
          <h2 className="display display--brown">Other <em>classes</em></h2>
          <div className="class-strip class-strip--light">
            {others.map((o) => (
              <Link key={o.slug} to={`/classes/${o.slug}`} className="class-card">
                <Photo src={o.meta.image} alt={o.meta.alt} ratio="3 / 4" />
                <span className="class-card__type">{o.meta.type}</span>
                <h3 className="class-card__title">{o.meta.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
