import { useEffect, useState } from 'react'
import Photo from './Photo'

const INTERVAL = 5000

// Photos stacked in one frame that crossfade automatically.
// Stays on the first photo for visitors who prefer reduced motion.
export default function PhotoSlider({ slides, ratio }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="photo-slider">
      {slides.map((s, i) => (
        <div key={s.src} className={`photo-slider__slide ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
          <Photo src={s.src} alt={s.alt} ratio={ratio} focus={s.focus} />
        </div>
      ))}
    </div>
  )
}
