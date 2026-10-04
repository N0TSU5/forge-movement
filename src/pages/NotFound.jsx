import useTitle from '../lib/useTitle'
import Button from '../components/Button'

export default function NotFound() {
  useTitle('Page not found')
  return (
    <section className="band band--brown center page-hero">
      <div className="container container--narrow">
        <h1 className="display">Lost your <em className="accent">flow</em>?</h1>
        <p className="lede">We couldn't find that page.</p>
        <Button to="/">Back to home</Button>
      </div>
    </section>
  )
}
