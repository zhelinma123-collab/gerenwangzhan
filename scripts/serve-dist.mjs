import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../dist', import.meta.url))
const port = Number(process.env.PORT || 5173)

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.m4v': 'video/mp4',
  '.mp4': 'video/mp4',
  '.svg': 'image/svg+xml',
  '.webm': 'video/webm',
}

createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host}`)
  const pathname = decodeURIComponent(url.pathname)
  const target = normalize(join(root, pathname))
  const file = existsSync(target) && statSync(target).isFile() ? target : join(root, 'index.html')

  response.writeHead(200, {
    'Content-Type': types[extname(file)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  })
  createReadStream(file).pipe(response)
}).listen(port, '0.0.0.0', () => {
  console.log(`Portfolio preview running at http://127.0.0.1:${port}`)
})
