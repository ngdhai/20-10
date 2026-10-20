import type { Pick } from '../App'
import { site } from '../data/family'

// Vị trí (% của khung) và màu từng bông. Hình vẽ, không phải nội dung — nên để ở đây.
const FLOWERS = [
  { x: 50, y: 13, c: '#c98a8a', p: 6 },
  { x: 27, y: 22, c: '#ead1c4', p: 5 },
  { x: 73, y: 22, c: '#f1e7d3', p: 8 },
  { x: 13, y: 41, c: '#d6a39b', p: 5 },
  { x: 87, y: 41, c: '#e7cf9d', p: 6 },
  { x: 37, y: 41, c: '#f4eee4', p: 8 },
  { x: 63, y: 41, c: '#b98d95', p: 5 },
  { x: 50, y: 30, c: '#dcb2a6', p: 6 },
]
const TIE = { x: 50, y: 78 }

type Props = { pick?: Pick; wishes: string[]; onPick: (p: Pick) => void }

function Flower({ c, p }: { c: string; p: number }) {
  const petals = Array.from({ length: p }, (_, i) => (360 / p) * i)
  return (
    <svg viewBox="-50 -50 100 100" aria-hidden="true">
      <g className="flower__outer">
        {petals.map((a) => (
          <ellipse key={a} cx="0" cy="-23" rx="14" ry="23" fill={c} transform={`rotate(${a})`} />
        ))}
      </g>
      <g className="flower__inner">
        {petals.map((a) => (
          <ellipse key={a} cx="0" cy="-13" rx="8" ry="14" fill="#fff" opacity=".28" transform={`rotate(${a + 180 / p})`} />
        ))}
      </g>
      <circle r="9" fill="#e4bf7f" />
      <circle r="9" fill="none" stroke="#c99a55" strokeWidth="1.5" strokeDasharray="1.5 3" />
    </svg>
  )
}

/** Bó hoa vẽ bằng SVG. Hái một bông duy nhất → bông nở + hiện lời chúc. */
export function Bouquet({ pick, wishes, onPick }: Props) {
  const choose = (i: number) => {
    if (pick) return
    onPick({ flower: i, wish: wishes[Math.floor(Math.random() * wishes.length)] })
  }

  return (
    <div className={`bouquet-wrap ${pick ? 'is-picked' : ''}`}>
      <p className="bouquet__prompt">{site.scene.flowerPrompt}</p>
      <div className="bouquet">
        <svg className="bouquet__stems" viewBox="0 0 100 105" aria-hidden="true">
          {FLOWERS.map((f, i) => (
            <path
              key={i}
              d={`M${f.x} ${f.y} Q${(f.x + TIE.x) / 2 + (f.x < 50 ? 4 : -4)} ${(f.y + TIE.y) / 2} ${TIE.x} ${TIE.y}`}
            />
          ))}
          <path d={`M${TIE.x} ${TIE.y} L${TIE.x - 3} 100 M${TIE.x} ${TIE.y} L${TIE.x + 3} 100`} />
          <ellipse className="leaf" cx="35" cy="58" rx="7" ry="2.6" transform="rotate(-35 35 58)" />
          <ellipse className="leaf" cx="66" cy="57" rx="7" ry="2.6" transform="rotate(38 66 57)" />
          <ellipse className="leaf" cx="47" cy="62" rx="5" ry="2" transform="rotate(-70 47 62)" />
          <path className="wrap" d="M28 66 L72 66 L58 103 L42 103 Z" />
          <path className="wrap wrap--fold" d="M28 66 L50 72 L72 66 L64 86 L36 86 Z" />
          <path className="ribbon" d="M43 80 Q50 84 57 80 M50 82 L45 92 M50 82 L55 93" />
        </svg>
        {FLOWERS.map((f, i) => (
          <button
            key={i}
            className={`flower ${pick?.flower === i ? 'is-chosen' : ''}`}
            style={{ left: `${f.x}%`, top: `${(f.y / 105) * 100}%`, '--d': `${i * -0.7}s` } as React.CSSProperties}
            onClick={() => choose(i)}
            disabled={!!pick}
            aria-label={`Bông hoa thứ ${i + 1}`}
            aria-pressed={pick?.flower === i}
          >
            <Flower c={f.c} p={f.p} />
          </button>
        ))}
      </div>
      {pick && (
        <div className="wish" role="status">
          <p className="wish__label">{site.scene.wishLabel}</p>
          <p className="wish__text">{pick.wish}</p>
        </div>
      )}
    </div>
  )
}
