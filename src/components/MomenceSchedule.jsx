import { useEffect, useRef } from 'react'

const PLUGIN_SRC = 'https://momence.com/plugin/host-schedule/host-schedule.js'

// Embeds the Momence host-schedule plugin (visitors filter by instructor with its own dropdown).
// The plugin finds its config via `script[host_id][src$="host-schedule.js"]`, so the src must
// stay exactly as Momence publishes it. It's a self-contained bundle, so it's loaded as a
// classic script (not type="module"): classic scripts re-run on every insertion, so the
// schedule renders again when visitors navigate back to the page.
export default function MomenceSchedule({ hostId }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!hostId || !el) return
    // Deferred one tick so React StrictMode's throwaway first mount never runs the plugin.
    const timer = setTimeout(() => {
      el.innerHTML = ''
      const script = document.createElement('script')
      script.async = true
      script.setAttribute('host_id', hostId)
      script.setAttribute('teacher_ids', '[]')
      script.setAttribute('location_ids', '[]')
      script.setAttribute('tag_ids', '[]')
      script.setAttribute('default_filter', 'show-all')
      script.setAttribute('locale', 'en')
      script.src = PLUGIN_SRC
      // The plugin renders into a container it inserts right after this script tag.
      el.appendChild(script)
    })
    return () => {
      clearTimeout(timer)
      el.innerHTML = ''
    }
  }, [hostId])

  if (!hostId) {
    return (
      <div className="schedule-placeholder">
        <p><strong>The live timetable appears here.</strong></p>
        <p>Add the studio's Momence host ID to <code>content/site.txt</code> (<code>momence_host_id:</code>) to connect it.</p>
      </div>
    )
  }
  return <div ref={ref} className="momence" />
}
