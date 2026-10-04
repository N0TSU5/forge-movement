import { Link } from 'react-router'
import { getEntry, getBlocks, getCollection, bookingHref } from '../lib/content'
import useTitle from '../lib/useTitle'
import Rich from '../components/Rich'
import Body from '../components/Body'
import Photo from '../components/Photo'
import Button from '../components/Button'
import { LogoLockup } from '../components/Logo'

const hero = getEntry('home/hero').meta
const intro = getEntry('home/intro')
const features = getBlocks('home/features')
const classesIntro = getEntry('home/classes')
const classes = getCollection('classes')
const [galleryIntro, ...gallery] = getBlocks('home/gallery')
const [exploreIntro, ...explore] = getBlocks('home/explore')
const [testimonialsIntro, ...testimonials] = getBlocks('home/testimonials')

export default function Home() {
  useTitle()
  return (
    <>
      <section className="hero band band--brown">
        <div className="container hero__inner">
          <h1 className="hero__title">
            <span className="hero__welcome">{hero.welcome}</span>
            <LogoLockup />
          </h1>
          <Button to={hero.button_link} className="hero__cta">{hero.button}</Button>
        </div>
      </section>

      <section className="band band--brown intro">
        <div className="container container--narrow center">
          <h2 className="display"><Rich text={intro.meta.heading} /></h2>
          <div className="lede"><Body sections={intro.sections} /></div>
        </div>
      </section>

      <section className="band band--brown band--tight-top">
        <div className="container features">
          {features.map((f) => (
            <article key={f.meta.title} className="feature">
              <Photo src={f.meta.image} alt={f.meta.alt} ratio="1 / 1.05" focus={f.meta.focus} />
              <h3 className="feature__title">{f.meta.title}</h3>
              <Body sections={f.sections} />
            </article>
          ))}
        </div>
      </section>

      <section className="band band--rust">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="display"><Rich text={classesIntro.meta.heading} /></h2>
            <div className="section-head__aside">
              <Body sections={classesIntro.sections} />
              <Button to="/classes" variant="cream">{classesIntro.meta.button}</Button>
            </div>
          </div>
          <div className="class-strip">
            {classes.map((c) => (
              <Link key={c.slug} to={`/classes/${c.slug}`} className="class-card">
                <Photo src={c.meta.image} alt={c.meta.alt} ratio="3 / 4" />
                <span className="class-card__type">{c.meta.type}</span>
                <h3 className="class-card__title">{c.meta.title}</h3>
                <p className="class-card__tagline">{c.meta.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--cream">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="display"><Rich text={galleryIntro.meta.heading} /></h2>
            <div className="section-head__aside"><Body sections={galleryIntro.sections} /></div>
          </div>
        </div>
        <div className="gallery" tabIndex={0} aria-label="Studio gallery, scroll horizontally">
          {gallery.map((g) => (
            <Photo key={g.meta.image} src={g.meta.image} alt={g.meta.alt} className="gallery__item" />
          ))}
        </div>
      </section>

      <section className="band band--brown">
        <div className="container center">
          <h2 className="display"><Rich text={exploreIntro.meta.heading} /></h2>
          <div className="explore">
            {explore.map((e) => (
              <div key={e.meta.link} className="explore__item">
                <Photo src={e.meta.image} alt={e.meta.alt} ratio="1 / 1" focus={e.meta.focus} />
                <Button to={e.meta.link} variant="cream">{e.meta.button}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--brown band--tight-top">
        <div className="container center">
          <h2 className="display">{testimonialsIntro.meta.heading}</h2>
          <div className="testimonials">
            {testimonials.map((t, i) => (
              <figure key={i} className="testimonial">
                <blockquote><Body sections={t.sections} /></blockquote>
                <figcaption>
                  <Photo src={t.meta.image} alt="" className="testimonial__avatar" />
                  <span>{t.meta.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <Button to={bookingHref()} variant="cream">{testimonialsIntro.meta.button}</Button>
        </div>
      </section>
    </>
  )
}
