import { readFileSync, writeFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { recipients } from './src/data/family'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Zalo/Facebook không chạy JS → sinh dist/<code>.html với title/mô tả/ảnh preview riêng.
// Vercel (cleanUrls) trả file này cho /<code>; app vẫn chạy y như cũ.
function personalPages(): Plugin {
  return {
    name: 'personal-pages',
    apply: 'build',
    closeBundle() {
      const html = readFileSync('dist/index.html', 'utf8')
      const site = html.match(/property="og:url" content="([^"]*?)\/?"/)![1]
      for (const r of recipients) {
        const title = esc(`20.10 — Gửi ${r.role} ${r.name}`)
        const desc = esc(r.preview)
        const page = html
          .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
          .replace(/(name="description" content=")[^"]*/, `$1${desc}`)
          .replace(/(property="og:title" content=")[^"]*/, `$1${title}`)
          .replace(/(property="og:description" content=")[^"]*/, `$1${desc}`)
          .replace(/(property="og:url" content=")[^"]*/, `$1${site}/${r.code}`)
          .replace(/(property="og:image" content=")[^"]*/, `$1${site}/og/${r.code}.jpg`)
        writeFileSync(`dist/${r.code}.html`, page)
      }
    },
  }
}

// base '/' vì mỗi người có link riêng /<code> — host cần rewrite mọi path về index.html
// (đã kèm public/_redirects cho Netlify và vercel.json cho Vercel).
export default defineConfig({ base: '/', plugins: [react(), personalPages()] })
