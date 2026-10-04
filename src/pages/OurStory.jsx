import { getEntry, intro, findSection, splitItem } from '../lib/content'
import useTitle from '../lib/useTitle'
import Rich from '../components/Rich'
import Body from '../components/Body'
import Photo from '../components/Photo'
import Button from '../components/Button'

const story = getEntry('our-story')
const values = findSection(story, 'Stay *motivated* together')

export default function OurStory() {
  useTitle('Our Story')
  const m = story.meta
  return (
    <>
      <section className="band band--cream">
        <div className="container">
          <h1 className="display display--ruled">{m.heading}</h1>
          <div className="prose prose--columns"><Body sections={intro(story)} /></div>
          <div className="photo-row">
            {[1, 2, 3].map((n) => <Photo key={n} src={m[`image${n}`]} alt={m[`alt${n}`]} ratio="1.2 / 1" />)}
          </div>
        </div>
      </section>

      {values && (
        <section className="band band--white">
          <div className="container">
            <h2 className="display display--brown"><Rich text={values.heading} /></h2>
            <div className="columns-3">
              {values.blocks[0]?.items.map((item) => {
                const [title, text] = splitItem(item)
                return (
                  <div key={title}>
                    <h3 className="caps-title">{title}</h3>
                    <p><Rich text={text} /></p>
                  </div>
                )
              })}
            </div>
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
