import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)
// process.chdir(__dirname)
const __dirname = '/Users/future/Downloads/CSGemsBE/nuxt/server/services/'

export const runCommands = {
  dart: 'dart',
  python: 'python3',
  javascript: 'node',
  cplusplus: 'g++ -std=c++11',
}

export function getVars(language) {
  let fileExtension
  let executablePath = null
  switch (language) {
    case 'python':
      fileExtension = 'py'
      break
    case 'javascript':
      fileExtension = 'js'
      break
    case 'cplusplus':
      fileExtension = 'cpp'
      executablePath = path.join(__dirname, './scripts/runner.cpp')
      break
    case 'dart':
      fileExtension = 'dart'
      break
    default:
      console.error(`Unsupported language: ${language}`)
      return
  }
  return [fileExtension, executablePath]
}
