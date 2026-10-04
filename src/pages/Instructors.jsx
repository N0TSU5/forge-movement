import { getEntry, getCollection, intro, findSection } from '../lib/content'
import useTitle from '../lib/useTitle'
import Rich from '../components/Rich'
import Body, { Blocks } from '../components/Body'
import Photo from '../components/Photo'
import Button from '../components/Button'

const page = getEntry('instructors/_page')
const instructors = getCollection('instructors')

export default function Instructors() {
  useTitle('Instructors')
  return (
    <>
      <section className="band band--white page-hero page-hero--light">
        <div className="container container--narrow">
          <h1 className="display display--brown"><Rich text={page.meta.heading} /></h1>
          <div className="lede"><Body sections={page.sections} /></div>
        </div>
      </section>

      <section className="band band--white band--tight-top">
        <div className="container instructor-list">
          {instructors.map((p, i) => {
            const experience = findSection(p, 'Experience')
            return (
              <article key={p.slug} id={p.slug} className={`instructor ${i % 2 ? 'instructor--flip' : ''}`}>
                <Photo src={p.meta.image} alt={`Portrait of ${p.meta.name}`} ratio="3 / 4" className="instructor__photo" />
                <div className="instructor__text">
                  <h2 className="caps-title caps-title--large">{p.meta.name}</h2>
                  <p className="instructor__role">{p.meta.role}</p>
                  <h3 className="eyebrow">Introduction</h3>
                  <div className="prose"><Body sections={intro(p)} /></div>
                  {experience && (
                    <>
                      <h3 className="eyebrow">Experience</h3>
                      <div className="prose"><Blocks blocks={experience.blocks} /></div>
                    </>
                  )}
                  <Button to={`/schedule?instructor=${p.slug}`} variant="solid">
                    See {p.meta.name}'s classes
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
