import { getEntry, intro, findSection } from '../lib/content'
import useTitle from '../lib/useTitle'
import Rich from '../components/Rich'
import Body, { Blocks } from '../components/Body'
import Photo from '../components/Photo'
import Button from '../components/Button'

const story = getEntry('our-story')
const why = findSection(story, 'Why *Forge*?')

export default function OurStory() {
  useTitle('Our Story')
  const m = story.meta
  return (
    <>
      <section className="band band--cream">
        <div className="container">
          <h1 className="display display--ruled">{m.heading}</h1>
          <p className="story-tagline"><Rich text={m.tagline} /></p>
          {m.lede && <p className="lede lede--left">{m.lede}</p>}
          <div className="prose prose--columns"><Body sections={intro(story)} /></div>
          <div className="photo-row">
            {[1, 2, 3].map((n) => <Photo key={n} src={m[`image${n}`]} alt={m[`alt${n}`]} ratio="1.2 / 1" />)}
          </div>
        </div>
      </section>

      {why && (
        <section className="band band--white">
          <div className="container split">
            <h2 className="display display--brown"><Rich text={why.heading} /></h2>
            <div className="prose prose--large why-forge"><Blocks blocks={why.blocks} /></div>
          </div>
        </section>
      )}

      <section className="band band--brown center">
        <div className="container container--narrow">
          <h2 className="display">Meet the people <em className="accent">behind Forge</em></h2>
          <Button to="/instructors" variant="cream">Our instructors</Button>
        </div>
      </section>
    </>
  )
}
