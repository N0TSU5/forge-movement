// Reads the weekly timetable PDF (one column per day, one cell per class)
// and writes scripts/momence/timetable.json for review before anything is
// sent to Momence.
//
//   node scripts/momence/parse-timetable.mjs "path/to/timetable.pdf"

import { writeFileSync } from 'node:fs'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const CLASS_TYPES = ['Reformer', 'Mat', 'Yoga', 'Contrast', 'Barre', 'Reset']
const TIME = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i
const OUT = new URL('./timetable.json', import.meta.url)

const pdfPath = process.argv[2]
if (!pdfPath) {
  console.error('Usage: node scripts/momence/parse-timetable.mjs <timetable.pdf>')
  process.exit(1)
}

const doc = await getDocument(pdfPath).promise
const items = []
for (let p = 1; p <= doc.numPages; p++) {
  const { items: pageItems } = await (await doc.getPage(p)).getTextContent()
  for (const it of pageItems) {
    const str = it.str.trim()
    if (str) items.push({ str, x: it.transform[4], y: it.transform[5] })
  }
}

// Column edges come from the day headings; every other line belongs to the
// heading at or just left of it.
const headers = DAYS.map((day) => {
  const h = items.find((it) => it.str.toLowerCase() === day.toLowerCase())
  if (!h) throw new Error(`Couldn't find the "${day}" column heading in the PDF`)
  return { day, x: h.x, y: h.y }
}).sort((a, b) => a.x - b.x)

const columnOf = (it) => [...headers].reverse().find((h) => it.x >= h.x - 2)

const classes = []
for (const header of headers) {
  const lines = items
    .filter((it) => it.y < header.y && columnOf(it) === header)
    .sort((a, b) => b.y - a.y)
    .map((it) => it.str)

  // A cell starts at a time line and runs until the next one.
  let cell = null
  for (const line of lines) {
    if (TIME.test(line)) {
      if (cell) classes.push(toClass(header.day, cell))
      cell = { time: line, lines: [] }
    } else if (cell) {
      cell.lines.push(line)
    }
  }
  if (cell) classes.push(toClass(header.day, cell))
}

function toClass(day, { time, lines }) {
  const warnings = []
  // Cell text wraps mid-word inside narrow columns, e.g. "(Alternat" / "e/tbc)".
  const text = lines.join(' ').replace(/Alternat e/i, 'Alternate').replace(/\s+/g, ' ').trim()

  const notes = [...text.matchAll(/\(([^)]*)\)/g)].map((m) => m[1].trim().toLowerCase())
  const words = text.replace(/\([^)]*\)/g, ' ').split(/\s+/).filter(Boolean)

  const typeWord = words.shift() ?? ''
  const type = CLASS_TYPES.find((t) => t.toLowerCase() === typeWord.toLowerCase())
  if (!type) warnings.push(`unknown class type "${typeWord}"`)

  const instructor = words.join(' ') || null
  if (!instructor) warnings.push('no instructor')
  else if (CLASS_TYPES.some((t) => t.toLowerCase() === instructor.toLowerCase()))
    warnings.push(`instructor "${instructor}" looks like a class name`)

  const tbc = notes.some((n) => n.includes('tbc'))
  if (tbc) warnings.push('marked tbc')

  return {
    day,
    time: to24h(time),
    type: type ?? typeWord,
    instructor,
    womenOnly: notes.some((n) => n.includes('women only')),
    tbc,
    notes,
    warnings,
  }
}

function to24h(t) {
  const [, h, m = '00', ap] = t.match(TIME)
  const hour = (Number(h) % 12) + (ap.toLowerCase() === 'pm' ? 12 : 0)
  return `${String(hour).padStart(2, '0')}:${m}`
}

writeFileSync(OUT, JSON.stringify(classes, null, 2) + '\n')

console.log(`${classes.length} classes -> ${OUT.pathname}\n`)
for (const c of classes) {
  const flag = c.warnings.length ? `  ⚠ ${c.warnings.join('; ')}` : ''
  const women = c.womenOnly ? ' (women only)' : ''
  console.log(`${c.day.padEnd(9)} ${c.time}  ${(c.type + women).padEnd(22)} ${c.instructor ?? '-'}${flag}`)
}
