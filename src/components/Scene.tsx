import { useEffect, useRef, useState } from 'react'
import type { Pick } from '../App'
import type { Recipient } from '../data/family'
import { site } from '../data/family'
import { later } from '../motion'
import { Gallery } from './Gallery'
import { Letter } from './Letter'
import { Bouquet } from './Bouquet'
import { Progress } from './Progress'

type Props = {
  recipient: Recipient
  pick?: Pick
  onPick: (p: Pick) => void
  onClose: (toFinale?: boolean) => void
}

/** Không gian riêng của từng người: ký ức → thư → hoa. Dùng <dialog> native để có focus trap + Esc. */
export function Scene({ recipient: r, pick, onPick, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [closing, setClosing] = useState(false)
  const [letterOpen, setLetterOpen] = useState(!!pick)

  useEffect(() => {
    const d = ref.current!
    if (!d.open) d.showModal()
    d.scrollTop = 0
    document.body.classList.add('is-locked')
    return () => {
      document.body.classList.remove('is-locked')
      if (d.open) d.close()
    }
  }, [])

  const close = (toFinale?: boolean) => {
    if (closing) return
    setClosing(true)
    later(() => onClose(toFinale), 380)
  }

  return (
    <dialog
      ref={ref}
      className={`scene ${closing ? 'is-closing' : ''}`}
      style={{ '--accent': r.accent } as React.CSSProperties}
      aria-labelledby="scene-title"
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
    >
      <div className="scene__bar">
        <button className="btn-back" onClick={() => close()}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5 8 12l7 7" />
          </svg>
          {site.scene.back}
        </button>
        {/* ● ○ ○ — ký ức · thư · hoa */}
        <Progress count={1 + Number(letterOpen) + Number(!!pick)} total={3} label="Bước" />
      </div>

      <div className="scene__inner">
        <header className="scene__head">
          <p className="eyebrow">{r.role}</p>
          <h2 id="scene-title">{r.name}</h2>
          <p className="scene__tag">{r.tagline}</p>
        </header>

        <section className="layer" aria-labelledby="layer-1">
          <h3 className="layer__title" id="layer-1">
            <span>01</span> {site.scene.memoriesTitle}
          </h3>
          <Gallery memories={r.memories} />
        </section>

        <section className="layer" aria-labelledby="layer-2">
          <h3 className="layer__title" id="layer-2">
            <span>02</span> {r.letterTitle}
          </h3>
          <Letter recipient={r} initiallyOpen={!!pick} onOpened={() => setLetterOpen(true)} />
        </section>

        {letterOpen && (
          <section className="layer layer--reveal" aria-labelledby="layer-3">
            <h3 className="layer__title" id="layer-3">
              <span>03</span> {site.scene.flowerTitle}
            </h3>
            <Bouquet pick={pick} wishes={r.wishes} onPick={onPick} />
            {pick && (
              <div className="scene__end">
                <button className="btn btn--primary" onClick={() => close(true)}>
                  {site.scene.toFinale}
                </button>
                <button className="btn btn--ghost" onClick={() => close()}>
                  {site.scene.back}
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </dialog>
  )
}
