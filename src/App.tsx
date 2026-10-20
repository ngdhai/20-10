import { useEffect, useRef, useState } from 'react'
import type { Recipient } from './data/family'
import { recipients, site } from './data/family'
import { later } from './motion'
import { Intro } from './components/Intro'
import { Home } from './components/Home'
import { Scene } from './components/Scene'
import { Finale } from './components/Finale'
import { MusicToggle } from './components/MusicToggle'

export type Pick = { wish: string; flower: number }

const KEY = 'gift-2010-progress'

// Giữ bông hoa đã hái nếu Messenger/Zalo reload trang giữa chừng.
function loadPicks(): Record<string, Pick> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

/** /<code> → người nhận. Trang gốc hoặc mã sai → trang chào trung tính. */
export default function App() {
  const code = location.pathname.split('/').filter(Boolean)[0]
  const person = code ? recipients.find((r) => r.code === code) : undefined
  if (!person) return <Welcome notFound={!!code} />
  return <Gift person={person} />
}

function Welcome({ notFound }: { notFound: boolean }) {
  return (
    <main className="welcome">
      <p className="intro__date">{site.intro.date}</p>
      <span className="intro__rule" aria-hidden="true" />
      <p className="intro__line">{notFound ? site.welcome.notFound : site.welcome.line}</p>
    </main>
  )
}

function Gift({ person }: { person: Recipient }) {
  const [stage, setStage] = useState<'intro' | 'opening' | 'home'>('intro')
  const [open, setOpen] = useState(false)
  const [picks, setPicks] = useState(loadPicks)
  const pick = picks[person.id]
  const card = useRef<HTMLButtonElement>(null)
  const main = useRef<HTMLElement>(null)
  const finale = useRef<HTMLElement>(null)
  const toFinale = useRef(false)

  useEffect(() => {
    document.title = `20.10 — Gửi ${person.role} ${person.name}`
  }, [person])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(picks))
    } catch {
      /* private mode: bỏ qua */
    }
  }, [picks])

  // Nút back của Android/in-app browser: đóng scene thay vì rời trang.
  useEffect(() => {
    if (history.state?.scene) history.replaceState(null, '')
    const onPop = () => setOpen(!!history.state?.scene)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (main.current) main.current.inert = stage === 'intro'
  }, [stage])

  // Chạy sau khi scene đã unmount (body hết khóa cuộn) — không đua với history.back().
  useEffect(() => {
    if (open || stage !== 'home') return
    if (toFinale.current) {
      toFinale.current = false
      // chờ một nhịp để trình duyệt khôi phục focus của <dialog> xong rồi mới cuộn
      window.setTimeout(() => {
        finale.current?.querySelector('button')?.focus({ preventScroll: true })
        finale.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    } else card.current?.focus({ preventScroll: true })
  }, [open, stage])

  const openScene = () => {
    history.pushState({ scene: person.id }, '')
    setOpen(true)
  }

  // Mở quà → cánh thiệp mở → vào thẳng món quà của người này.
  const openGift = () => {
    setStage('opening')
    later(() => {
      setStage('home')
      openScene()
    }, 1700)
  }

  const closeScene = (goFinale?: boolean) => {
    toFinale.current = !!goFinale
    if (history.state?.scene) history.back()
    else setOpen(false)
  }

  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <MusicToggle />

      <main ref={main} className={`home ${stage !== 'intro' ? 'is-in' : ''}`}>
        <Home ref={card} person={person} done={!!pick} onOpen={openScene} />
        <Finale ref={finale} person={person} unlocked={!!pick} />
      </main>

      {stage !== 'home' && <Intro person={person} opening={stage === 'opening'} onOpen={openGift} />}

      {open && (
        <Scene
          recipient={person}
          pick={pick}
          onPick={(p) => setPicks((d) => ({ ...d, [person.id]: p }))}
          onClose={closeScene}
        />
      )}
    </>
  )
}
