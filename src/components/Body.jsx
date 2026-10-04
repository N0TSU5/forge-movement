import Rich from './Rich'

// Renders parsed paragraphs and bullet lists.
export function Blocks({ blocks }) {
  return blocks.map((b, i) =>
    b.type === 'p' ? (
      <p key={i}><Rich text={b.text} /></p>
    ) : (
      <ul key={i}>
        {b.items.map((item, j) => <li key={j}><Rich text={item} /></li>)}
      </ul>
    ),
  )
}

export default function Body({ sections, headingLevel: H = 'h3' }) {
  return sections.map((s, i) => (
    <div key={i}>
      {s.heading && <H><Rich text={s.heading} /></H>}
      <Blocks blocks={s.blocks} />
    </div>
  ))
}
