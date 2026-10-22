import { getBlocks, intro, bookingHref } from '../lib/content'
import useTitle from '../lib/useTitle'
import Rich from '../components/Rich'
import Body, { Blocks } from '../components/Body'
import Button from '../components/Button'

const [page, ...cards] = getBlocks('pricing')
const terms = page.sections.find((s) => s.heading)
const groups = [...new Set(cards.map((c) => c.meta.group))].map((name) => ({
  name,
  cards: cards.filter((c) => c.meta.group === name),
}))

export default function Pricing() {
  useTitle('Pricing')
  const m = page.meta
  return (
    <>
      <section className="band band--brown center">
        <div className="container container--narrow">
          <h1 className="display"><Rich text={m.heading} /></h1>
          <div className="lede"><Body sections={intro(page)} /></div>
          <Button to={bookingHref()}>{m.button}</Button>
        </div>
      </section>

      {groups.map((g, i) => (
        <section key={g.name} className={`band ${i % 2 ? 'band--white' : 'band--cream'}`}>
          <div className="container">
            <h2 className="display display--brown">{g.name}</h2>
            <div className="price-grid">
              {g.cards.map((c) => (
                <article
                  key={c.meta.label + c.meta.name}
                  className={`price-card ${c.meta.featured === 'yes' ? 'price-card--featured' : ''}`}
                >
                  {c.meta.label && <p className="price-card__label">{c.meta.label}</p>}
                  <h3 className="caps-title">{c.meta.name}</h3>
                  <p className="price-card__price">
                    {c.meta.price}
                    {c.meta.per && <span> {c.meta.per}</span>}
                  </p>
                  <div className="price-card__body">
                    {c.sections.map((s, j) => <Blocks key={j} blocks={s.blocks} />)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {terms && (
        <section className="band band--sand">
          <div className="container container--narrow">
            <h2 className="display display--brown"><Rich text={terms.heading} /></h2>
            <ol className="price-terms">
              {terms.blocks.flatMap((b) => b.items ?? []).map((t, i) => <li key={i}><Rich text={t} /></li>)}
            </ol>
          </div>
        </section>
      )}
    </>
  )
}
