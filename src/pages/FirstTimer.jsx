import { Link } from 'react-router'
import { getEntry, intro, findSection, splitItem, bookingHref } from '../lib/content'
import useTitle from '../lib/useTitle'
import Rich from '../components/Rich'
import Body from '../components/Body'
import Photo from '../components/Photo'
import Button from '../components/Button'

const page = getEntry('first-timer')
const formats = findSection(page, 'Choose your format')
const bring = findSection(page, 'What to bring')
const steps = findSection(page, 'Your first class')
const items = (section) => section?.blocks.find((b) => b.type === 'ul')?.items.map(splitItem) ?? []

export default function FirstTimer() {
  useTitle('First Timer')
  const m = page.meta
  return (
    <>
      <section className="band band--brown">
        <div className="container split split--media">
          <div>
            <h1 className="display"><Rich text={m.heading} /></h1>
            <div className="lede lede--left"><Body sections={intro(page)} /></div>
            <Button to={bookingHref()}>{m.button}</Button>
          </div>
          <Photo src={m.image} alt={m.alt} ratio="4 / 5" />
        </div>
      </section>

      {formats && (
        <section className="band band--cream">
          <div className="container">
            <h2 className="display display--brown"><Rich text={formats.heading} /></h2>
            <div className="columns-3 formats">
              {items(formats).map(([title, classes, text, link]) => (
                <article key={title} className="format-card">
                  <h3 className="caps-title">{title}</h3>
                  <p className="format-card__classes">{classes}</p>
                  <p>{text}</p>
                  {link && <Link className="text-link" to={link}>Learn more →</Link>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {bring && (
        <section className="band band--rust">
          <div className="container">
            <h2 className="display"><Rich text={bring.heading} /></h2>
            <ol className="bring-grid">
              {items(bring).map(([title, text]) => (
                <li key={title}>
                  <h3 className="caps-title">{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {steps && (
        <section className="band band--white">
          <div className="container">
            <h2 className="display display--brown"><Rich text={steps.heading} /></h2>
            <ol className="steps">
              {items(steps).map(([title, text]) => (
                <li key={title}>
                  <h3 className="caps-title">{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="band band--sand center">
        <div className="container container--narrow">
          <h2 className="display display--brown">Ready when <em>you</em> are</h2>
          <div className="button-row">
            <Button to={bookingHref()} variant="solid">{m.button}</Button>
            <Button to="/contact#faqs" variant="outline-brown">Read the FAQs</Button>
          </div>
        </div>
      </section>
    </>
  )
}
