import type { Recipient } from '../data/family'
import { site } from '../data/family'

type Props = { person: Recipient; opening: boolean; onOpen: () => void }

/** Màn mở đầu: hai cánh thiệp khép lại, bấm để mở ra như mở cửa. */
export function Intro({ person, opening, onOpen }: Props) {
  return (
    <section className={`intro ${opening ? 'is-opening' : ''}`} aria-label="Mở đầu">
      <div className="intro__door intro__door--l" aria-hidden="true" />
      <div className="intro__door intro__door--r" aria-hidden="true" />
      <div className="petals" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>
      <div className="intro__content">
        <p className="intro__date">{site.intro.date}</p>
        <span className="intro__rule" aria-hidden="true" />
        <p className="intro__line">{site.intro.line}</p>
        <p className="intro__name">
          {person.role} {person.name}
        </p>
        <button className="btn btn--primary" onClick={onOpen} disabled={opening} autoFocus>
          {site.intro.button}
        </button>
      </div>
    </section>
  )
}
