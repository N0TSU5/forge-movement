import { useState } from 'react'
import { asset } from '../lib/content'

// An image that falls back to a labelled placeholder until the real file is added.
// `focus` sets which part of the photo stays visible when it is cropped (CSS object-position).
export default function Photo({ src, alt = '', className = '', ratio, focus }) {
  const [failed, setFailed] = useState(!src)
  const style = { ...(ratio && { aspectRatio: ratio }), ...(focus && { objectPosition: focus }) }

  if (failed) {
    return (
      <div className={`photo photo--placeholder ${className}`} style={style} role="img" aria-label={alt}>
        <span className="photo__label">
          {alt || 'Photo'}
          {src && <small>{src}</small>}
        </span>
      </div>
    )
  }
  return (
    <img
      className={`photo ${className}`}
      style={style}
      src={asset(src)}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
