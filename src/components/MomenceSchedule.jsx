import { useEffect, useRef } from 'react'

const PLUGIN_SRC = 'https://momence.com/plugin/host-schedule/host-schedule.js'

// Embeds the Momence host-schedule plugin.
// The plugin finds its config via `script[host_id][src$="host-schedule.js"]`, so the src must
// stay exactly as Momence publishes it. It's a self-contained bundle, so it's loaded as a
// classic script (not type="module"): classic scripts re-run on every insertion, which lets
// the instructor filter re-render the schedule.
export default function MomenceSchedule({ hostId, teacherIds = [] }) {
  const ref = useRef(null)
  const teachers = JSON.stringify(teacherIds.map(Number))

  useEffect(() => {
    const el = ref.current
    if (!hostId || !el) return
    // Deferred one tick so React StrictMode's throwaway first mount never runs the plugin.
    const timer = setTimeout(() => {
      el.innerHTML = ''
      const script = document.createElement('script')
      script.async = true
      script.setAttribute('host_id', hostId)
      script.setAttribute('teacher_ids', teachers)
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
  }, [hostId, teachers])

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
