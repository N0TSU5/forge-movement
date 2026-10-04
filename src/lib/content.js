// Loads every .txt file under /content at build time and parses it.
// Format is documented in content/README.txt.

const files = import.meta.glob('/content/**/*.txt', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseMeta(src) {
  const meta = {}
  for (const raw of src.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const i = line.indexOf(':')
    if (i === -1) continue
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  return meta
}

function parseBody(src) {
  const sections = [{ heading: null, blocks: [] }]
  const current = () => sections[sections.length - 1]
  let para = []
  let list = null

  const flush = () => {
    if (para.length) current().blocks.push({ type: 'p', text: para.join(' ') })
    if (list) current().blocks.push({ type: 'ul', items: list })
    para = []
    list = null
  }

  for (const raw of src.split('\n')) {
    const line = raw.trim()
    if (!line) {
      flush()
    } else if (line.startsWith('## ')) {
      flush()
      sections.push({ heading: line.slice(3).trim(), blocks: [] })
    } else if (line.startsWith('- ')) {
      if (para.length) flush()
      ;(list ||= []).push(line.slice(2).trim())
    } else {
      if (list) flush()
      para.push(line)
    }
  }
  flush()
  return sections.filter((s) => s.heading || s.blocks.length)
}

function parseBlock(src) {
  const sep = src.match(/^---\s*$/m)
  if (!sep) return { meta: parseMeta(src), sections: [] }
  return {
    meta: parseMeta(src.slice(0, sep.index)),
    sections: parseBody(src.slice(sep.index + sep[0].length)),
  }
}

export function parse(text) {
  return text
    .replace(/\r\n/g, '\n')
    .split(/^===\s*$/m)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(parseBlock)
}

function raw(path) {
  const text = files[`/content/${path}.txt`]
  if (text === undefined) throw new Error(`Missing content file: content/${path}.txt`)
  return text
}

/** All blocks in a file (for list files separated by ===). */
export function getBlocks(path) {
  return parse(raw(path))
}

/** The first (or only) block in a file. */
export function getEntry(path) {
  return getBlocks(path)[0] ?? { meta: {}, sections: [] }
}

/** Every file in a folder (ignoring files starting with _), sorted by `order:`. */
export function getCollection(dir) {
  const prefix = `/content/${dir}/`
  return Object.keys(files)
    .filter((k) => k.startsWith(prefix) && !k.slice(prefix.length).startsWith('_'))
    .map((k) => {
      const slug = k.slice(prefix.length, -4)
      return { slug, ...parse(files[k])[0] }
    })
    .sort((a, b) => Number(a.meta.order ?? 99) - Number(b.meta.order ?? 99))
}

/** Section lookup by heading text, ignoring *styling* and case. */
export function findSection(entry, heading) {
  const norm = (s) => s.replace(/\*/g, '').trim().toLowerCase()
  return entry.sections.find((s) => s.heading && norm(s.heading) === norm(heading))
}

/** Body sections that come before the first ## heading. */
export function intro(entry) {
  return entry.sections.filter((s) => !s.heading)
}

/** Splits "Title | description | link" bullet items. */
export function splitItem(item) {
  return item.split('|').map((s) => s.trim())
}

export const site = getEntry('site').meta

export function bookingHref() {
  return site.booking_url || '/schedule'
}
