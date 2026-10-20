type Props = { count: number; total: number; label: string }

/** ● ● ○ — tiến trình nhỏ, không gamification. */
export function Progress({ count, total, label }: Props) {
  return (
    <p className="progress" role="img" aria-label={`${label} ${count}/${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={i < count ? 'is-done' : undefined} />
      ))}
    </p>
  )
}
