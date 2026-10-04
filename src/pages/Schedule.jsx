import { useSearchParams } from 'react-router'
import { getEntry, getCollection, site } from '../lib/content'
import useTitle from '../lib/useTitle'
import Rich from '../components/Rich'
import Body from '../components/Body'
import MomenceSchedule from '../components/MomenceSchedule'

const page = getEntry('schedule')
const instructors = getCollection('instructors')

export default function Schedule() {
  useTitle('Class Schedule')
  const [params, setParams] = useSearchParams()
  const selected = instructors.find((p) => p.slug === params.get('instructor'))
  const teacherIds = selected?.meta.momence_teacher_id ? [selected.meta.momence_teacher_id] : []

  const select = (slug) => setParams(slug ? { instructor: slug } : {}, { replace: true })

  return (
    <>
      <section className="band band--brown page-hero">
        <div className="container container--narrow">
          <h1 className="display"><Rich text={page.meta.heading} /></h1>
          <div className="lede"><Body sections={page.sections} /></div>
        </div>
      </section>

      <section className="band band--cream">
        <div className="container">
          <div className="filter" role="group" aria-label="Filter by instructor">
            <button className="filter__btn" aria-pressed={!selected} onClick={() => select(null)}>All instructors</button>
            {instructors.map((p) => (
              <button key={p.slug} className="filter__btn" aria-pressed={selected?.slug === p.slug}
                onClick={() => select(p.slug)}>
                {p.meta.name}
              </button>
            ))}
          </div>
          {selected && !selected.meta.momence_teacher_id && (
            <p className="note">
              Filtering by {selected.meta.name} needs their Momence teacher ID in{' '}
              <code>content/instructors/{selected.slug}.txt</code>. Showing all classes for now.
            </p>
          )}
          <MomenceSchedule hostId={site.momence_host_id} teacherIds={teacherIds} />
        </div>
      </section>
    </>
  )
}
