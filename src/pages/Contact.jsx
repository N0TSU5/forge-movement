import { getEntry, getBlocks, site } from '../lib/content'
import useTitle from '../lib/useTitle'
import Rich from '../components/Rich'
import Body from '../components/Body'
import Photo from '../components/Photo'
import Button from '../components/Button'

const contact = getEntry('contact')
const careers = getEntry('careers')
const [faqIntro, ...faqs] = getBlocks('faqs')

const faqGroups = faqs.reduce((groups, f) => {
  const key = f.meta.category || 'General'
  ;(groups[key] ||= []).push(f)
  return groups
}, {})

export default function Contact() {
  useTitle('Contact')
  const m = contact.meta
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.map_query)}&output=embed`
  const applyHref = `mailto:${site.email}?subject=${encodeURIComponent(careers.meta.email_subject || 'Application')}`

  return (
    <>
      <section className="contact-hero">
        <Photo src={m.image} alt={m.alt} className="contact-hero__bg" />
        <div className="container contact-hero__inner">
          <h1 className="contact-hero__title"><Rich text={m.heading} /></h1>
          <dl className="contact-hero__details">
            {site.phone && (
              <div><dt>Phone</dt><dd><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></dd></div>
            )}
            <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
            <div>
              <dt>Address</dt>
              <dd>{site.address_line1}<br />{site.address_line2}<br />{site.address_line3}</dd>
            </div>
            <div>
              <dt>Social</dt>
              <dd>
                <a href={`https://www.instagram.com/${site.instagram}/`} target="_blank" rel="noreferrer">Instagram</a>
                {' · '}
                <a href={`https://www.tiktok.com/@${site.tiktok}`} target="_blank" rel="noreferrer">TikTok</a>
                <br />@{site.instagram}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="band band--cream">
        <div className="container map-block">
          <div>
            <h2 className="display display--brown"><Rich text={m.map_heading} /></h2>
            <div className="prose"><Body sections={contact.sections} /></div>
          </div>
          <iframe
            className="map-block__map"
            title={`Map showing ${site.name}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section id="careers" className="band band--sand">
        <div className="container split">
          <h2 className="display display--brown"><Rich text={careers.meta.heading} /></h2>
          <div className="prose prose--large">
            <Body sections={careers.sections} />
            <Button to={applyHref} variant="solid">{careers.meta.button}</Button>
          </div>
        </div>
      </section>

      <section id="faqs" className="band band--white">
        <div className="container">
          <h2 className="display display--brown"><Rich text={faqIntro.meta.heading} /></h2>
          <div className="faq-groups">
            {Object.entries(faqGroups).map(([category, items]) => (
              <div key={category} className="faq-group">
                <h3 className="caps-title">{category}</h3>
                {items.map((f) => (
                  <details key={f.meta.q} className="faq">
                    <summary>{f.meta.q}</summary>
                    <div className="faq__answer"><Body sections={f.sections} /></div>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
