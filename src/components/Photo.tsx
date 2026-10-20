import { useEffect, useRef, useState } from 'react'
import { asset } from '../asset'

type Props = { src: string; alt: string; className?: string; eager?: boolean }

/** Ảnh lazy-load, có trạng thái đang tải và fallback khi ảnh lỗi/thiếu. */
export function Photo({ src, alt, className = '', eager }: Props) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading')
  const img = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setState('loading')
    const el = img.current
    if (el?.complete) setState(el.naturalWidth ? 'ok' : 'error')
  }, [src])

  return (
    <span className={`photo is-${state} ${className}`}>
      {state === 'error' ? (
        <span className="photo__fallback" role="img" aria-label={alt || undefined}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 18 9 12l3.5 4 2.5-3 5 5H4Z" />
            <circle cx="16" cy="8" r="2" />
          </svg>
        </span>
      ) : (
        <img
          ref={img}
          src={asset(src)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
        />
      )}
    </span>
  )
}
