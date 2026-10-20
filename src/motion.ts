// Mọi bước của câu chuyện chuyển bằng state + timeout, không chờ animationend,
// nên khi người dùng bật "giảm chuyển động" thì flow vẫn chạy (delay = 0).
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const later = (fn: () => void, ms: number) => window.setTimeout(fn, reducedMotion() ? 0 : ms)
