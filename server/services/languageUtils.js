import { toSnakeCase } from '../utils/helpers/strings'
export { problemInitializer } from './generators/index.js'

const languageConfig = {
  python: { extension: 'py', executable: 'python3' },
  ruby: { extension: 'rb', executable: 'ruby' },
  js: { extension: 'js', executable: 'node' },
  ts: { extension: 'ts', executable: 'npx ts-node' },
  dart: { extension: 'dart', executable: 'dart' },
  java: { extension: 'java', executable: 'java' },
  go: { extension: 'go', executable: '/usr/local/go/bin/go run' },
  cplusplus: { extension: 'cpp', executable: 'g++ -std=c++11' },
}

export const runCommands = Object.fromEntries(
  Object.entries(languageConfig).map(([lang, { executable }]) => [
    lang,
    executable,
  ])
)

export function getVars(language) {
  const config = languageConfig[language]
  if (!config) throw new Error(`Unsupported language: ${language}`)
  return [config.extension, config.executable]
}

export function makeMethodNameWithLanguage(language, title) {
  if (!title) return ''
  if (language === 'ruby') return toSnakeCase(title)

  return title
    .toLowerCase()
    .replace(/[_\s-]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
}
