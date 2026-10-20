import { forwardRef, useRef, useState } from 'react'
import type { Recipient } from '../data/family'
import { site } from '../data/family'
import { later } from '../motion'
import { Photo } from './Photo'

type Props = { person: Recipient; unlocked: boolean }

/** Hộp ký ức gia đình — chỉ mở khi đã trao đủ mọi món quà. */
export const Finale = forwardRef<HTMLElement, Props>(function Finale({ person, unlocked }, ref) {
  const [open, setOpen] = useState(false)
  const content = useRef<HTMLDivElement>(null)
  const f = { ...site.finale, ...person.box }

  const openBox = () => {
    setOpen(true)
    later(() => content.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 900)
  }

  return (
    <section ref={ref} className="finale" aria-labelledby="finale-title">
      <h2 id="finale-title" className="eyebrow">
        {f.title}
      </h2>

      <div className={`box ${unlocked ? 'is-unlocked' : ''} ${open ? 'is-open' : ''}`} aria-hidden="true">
        <div className="box__lid" />
        <div className="box__body" />
        <div className="box__ribbon" />
      </div>

      {!open &&
        (unlocked ? (
          <button className="btn btn--primary" onClick={openBox}>
            {f.openButton}
          </button>
        ) : (
          <div className="finale__locked">
            <p>{f.lockedHint}</p>
          </div>
        ))}

      {open && (
        <div ref={content} className="finale__content">
          <div className="collage">
            {f.collage.map((m, i) => (
              <figure key={i} className={m.wide ? 'is-wide' : undefined} style={{ '--i': i } as React.CSSProperties}>
                <Photo src={m.src} alt={m.caption} />
                <figcaption>{m.caption}</figcaption>
              </figure>
            ))}
          </div>
          <h3 className="finale__heading">{f.heading}</h3>
          {f.text.map((t, i) => (
            <p key={i} className="finale__text">
              {t}
            </p>
          ))}
          <p className="finale__closing">
            {f.closing} <span className="heart" aria-hidden="true">♥</span>
          </p>
        </div>
      )}
    </section>
  )
})
