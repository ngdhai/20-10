import { useRef } from 'react'
import type { Memory } from '../data/family'
import { site } from '../data/family'
import { Photo } from './Photo'

/** Dải ảnh film/scrapbook: vuốt trên điện thoại, kéo chuột hoặc bấm mũi tên trên máy tính. */
export function Gallery({ memories }: { memories: Memory[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; left: number } | null>(null)

  const step = (dir: number) => {
    const el = ref.current!
    const card = el.querySelector<HTMLElement>('.film')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 240) + 16), behavior: 'smooth' })
  }

  // Cảm ứng đã có cuộn native; chỉ chuột mới cần tự xử lý kéo.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft }
    e.currentTarget.classList.add('is-dragging')
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current) e.currentTarget.scrollLeft = drag.current.left - (e.clientX - drag.current.x)
  }
  const endDrag = () => {
    drag.current = null
    ref.current?.classList.remove('is-dragging')
  }

  return (
    <>
      <div
        ref={ref}
        className="gallery"
        role="region"
        aria-label={site.scene.memoriesTitle}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {memories.map((m, i) => (
          <figure key={i} className={m.wide ? 'film is-wide' : 'film'} style={{ '--i': i } as React.CSSProperties}>
            <Photo src={m.src} alt={m.caption} />
            <figcaption>{m.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="gallery__nav">
        <p className="gallery__hint">{site.scene.swipeHint}</p>
        <button className="gallery__arrow" onClick={() => step(-1)} aria-label="Ảnh trước">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5 8 12l7 7" />
          </svg>
        </button>
        <button className="gallery__arrow" onClick={() => step(1)} aria-label="Ảnh sau">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  )
}
