import { useRef, useState } from 'react'
import { site } from '../data/family'
import { asset } from '../asset'

/** ♫ bật/tắt nhạc nền. Không autoplay; thiếu file nhạc thì chỉ báo nhẹ. */
export function MusicToggle() {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [on, setOn] = useState(false)
  const [missing, setMissing] = useState(false)

  const flashMissing = () => {
    setMissing(true)
    setOn(false)
    window.setTimeout(() => setMissing(false), 2500)
  }

  const toggle = () => {
    if (audio.current?.error) return flashMissing()
    if (!audio.current) {
      const a = new Audio(asset(site.music))
      a.loop = true
      a.volume = 0.45
      a.addEventListener('error', flashMissing)
      audio.current = a
    }
    const a = audio.current
    if (on) {
      a.pause()
      setOn(false)
    } else {
      a.play().then(
        () => setOn(true),
        () => setOn(false),
      )
    }
  }

  const label = missing ? 'Chưa có nhạc nền' : on ? 'Tắt nhạc nền' : 'Bật nhạc nền'
  return (
    <button className={`music ${on ? 'is-on' : ''}`} onClick={toggle} aria-pressed={on} aria-label={label} title={label}>
      <span aria-hidden="true">♫</span>
      {missing && (
        <span className="music__note" role="status">
          Chưa có nhạc
        </span>
      )}
    </button>
  )
}
