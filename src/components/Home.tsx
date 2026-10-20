import { forwardRef } from 'react'
import type { Recipient } from '../data/family'
import { site } from '../data/family'
import { Photo } from './Photo'

type Props = { person: Recipient; done: boolean; onOpen: () => void }

/** Tấm polaroid của người nhận — chạm để mở lại món quà. */
export const Home = forwardRef<HTMLButtonElement, Props>(function Home({ person: r, done, onOpen }, ref) {
  return (
    <section className="cover" aria-labelledby="cover-title" style={{ '--accent': r.accent } as React.CSSProperties}>
      <header className="cover__head">
        <p className="eyebrow">{site.home.eyebrow}</p>
        <h1 id="cover-title">
          {r.role} {r.name}
        </h1>
      </header>

      <button ref={ref} className="polaroid" onClick={onOpen}>
        <Photo src={r.cover} alt="" className="polaroid__photo" eager />
        <span className="polaroid__role">{r.role}</span>
        <span className="polaroid__name">{r.name}</span>
        <span className="polaroid__tag">{r.tagline}</span>
        {done && <span className="polaroid__stamp">{site.home.doneStamp}</span>}
      </button>
      <p className="lede">{site.home.reopen}</p>
    </section>
  )
})
