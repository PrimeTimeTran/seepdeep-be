import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

process.chdir(__dirname)

export const languageCommands = {
  python: 'python3',
  javascript: 'node',
  cplusplus: 'g++',
  dart: 'dart',
}

export function getVars(language) {
  let fileExtension
  let compileCommand = null
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
      executablePath = path.join(__dirname, 'example')
      break
    case 'dart':
      fileExtension = 'dart'
      break
    default:
      console.error(`Unsupported language: ${language}`)
      return
  }
  return [fileExtension, compileCommand, executablePath]
}
