import { useEffect } from 'react'
import { site } from './content'

export default function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name}: ${site.tagline}`
  }, [title])
}
