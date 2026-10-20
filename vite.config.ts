import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '/' vì mỗi người có link riêng /<code> — host cần rewrite mọi path về index.html
// (đã kèm public/_redirects cho Netlify và vercel.json cho Vercel).
export default defineConfig({ base: '/', plugins: [react()] })
