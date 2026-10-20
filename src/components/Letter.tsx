import { useRef, useState } from 'react'
import type { Recipient } from '../data/family'
import { site } from '../data/family'
import { later } from '../motion'

type Props = { recipient: Recipient; initiallyOpen: boolean; onOpened: () => void }

/** Phong thư đóng → nắp lật → lá thư trượt lên → thư mở ra để đọc. */
export function Letter({ recipient, initiallyOpen, onOpened }: Props) {
  const [state, setState] = useState<'closed' | 'opening' | 'open'>(initiallyOpen ? 'open' : 'closed')
  const paper = useRef<HTMLElement>(null)

  const open = () => {
    setState('opening')
    later(() => {
      setState('open')
      onOpened()
      requestAnimationFrame(() => {
        paper.current?.focus({ preventScroll: true })
        paper.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }, 1500)
  }

  if (state === 'open')
    return (
      <article ref={paper} className="letter" tabIndex={-1} aria-label={recipient.letterTitle}>
        {recipient.letter.map((p, i) => (
          <p key={i} style={{ '--i': i } as React.CSSProperties}>
            {p}
          </p>
        ))}
        <p className="letter__sign" style={{ '--i': recipient.letter.length } as React.CSSProperties}>
          {recipient.signature}
        </p>
      </article>
    )

  return (
    <div className={`envelope-wrap is-${state}`}>
      <p className="envelope__note">{recipient.envelopeNote}</p>
      <div className="envelope" aria-hidden="true">
        <div className="envelope__back" />
        <div className="envelope__paper">
          <span />
          <span />
          <span />
        </div>
        <div className="envelope__front" />
        <div className="envelope__flap" />
        <div className="envelope__seal" />
      </div>
      <button className="btn btn--primary" onClick={open} disabled={state === 'opening'}>
        {site.scene.openLetter}
      </button>
    </div>
  )
}
