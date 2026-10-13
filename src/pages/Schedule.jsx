import { getEntry, site } from '../lib/content'
import useTitle from '../lib/useTitle'
import Rich from '../components/Rich'
import Body from '../components/Body'
import MomenceSchedule from '../components/MomenceSchedule'

const page = getEntry('schedule')

export default function Schedule() {
  useTitle('Class Schedule')
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
          <MomenceSchedule hostId={site.momence_host_id} />
        </div>
      </section>
    </>
  )
}
