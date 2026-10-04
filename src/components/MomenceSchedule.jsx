import { useEffect, useRef } from 'react'

// Embeds the Momence host-schedule plugin.
// Re-mounts with a fresh script URL when the teacher filter changes, because
// module scripts only execute once per URL.
export default function MomenceSchedule({ hostId, teacherIds = [] }) {
  const ref = useRef(null)
  const teachers = JSON.stringify(teacherIds.map(Number))

  useEffect(() => {
    const el = ref.current
    if (!hostId || !el) return
    el.innerHTML = '<div id="ribbon-schedule"></div>'
    const script = document.createElement('script')
    script.type = 'module'
    script.async = true
    script.setAttribute('host_id', hostId)
    script.setAttribute('teacher_ids', teachers)
    script.setAttribute('location_ids', '[]')
    script.setAttribute('tag_ids', '[]')
    script.setAttribute('default_filter', 'show-all')
    script.setAttribute('locale', 'en')
    script.src = `https://momence.com/plugin/host-schedule/host-schedule.js?t=${Date.now()}`
    el.appendChild(script)
    return () => { el.innerHTML = '' }
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
