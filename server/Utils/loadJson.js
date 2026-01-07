import fs from 'fs'
import path from 'path'

export function loadJson(relativePath) {
  const filePath = path.resolve(process.cwd(), relativePath)

  if (!fs.existsSync(filePath)) {
    throw new Error(`JSON file not found: ${filePath}`)
  }

  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw)
}
