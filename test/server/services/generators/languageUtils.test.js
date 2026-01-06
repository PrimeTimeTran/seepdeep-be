import { describe, test, expect } from 'vitest'
import { makeMethodNameWithLanguage } from '@/server/services/languageUtils'

const languages = [
  'python',
  'ruby',
  'js',
  'ts',
  'dart',
  'java',
  'go',
  'cplusplus',
]

describe('makeMethodNameWithLanguage', () => {
  test('returns empty string if title is empty', () => {
    languages.forEach((lang) => {
      expect(makeMethodNameWithLanguage(lang, '')).toBe('')
    })
  })

  test('handles simple words', () => {
    const title = 'add numbers'
    const expected = {
      ruby: 'add_numbers',
      python: 'addNumbers',
      js: 'addNumbers',
      ts: 'addNumbers',
      dart: 'addNumbers',
      java: 'addNumbers',
      go: 'addNumbers',
      cplusplus: 'addNumbers',
    }

    languages.forEach((lang) => {
      expect(makeMethodNameWithLanguage(lang, title)).toBe(expected[lang])
    })
  })

  test('handles underscores and spaces', () => {
    const title = 'sum_all numbers'
    const expected = {
      ruby: 'sum_all_numbers',
      python: 'sumAllNumbers',
      js: 'sumAllNumbers',
      ts: 'sumAllNumbers',
      dart: 'sumAllNumbers',
      java: 'sumAllNumbers',
      go: 'sumAllNumbers',
      cplusplus: 'sumAllNumbers',
    }

    languages.forEach((lang) => {
      expect(makeMethodNameWithLanguage(lang, title)).toBe(expected[lang])
    })
  })

  // Let's make sure all names follow the guidelines

  // test('handles dashes and mixed casing', () => {
  //   const title = 'Do-SomethingCrazy'
  //   const expected = {
  //     ruby: 'do_something_crazy',
  //     python: 'doSomethingCrazy',
  //     js: 'doSomethingCrazy',
  //     ts: 'doSomethingCrazy',
  //     dart: 'doSomethingCrazy',
  //     java: 'doSomethingCrazy',
  //     go: 'doSomethingCrazy',
  //     cplusplus: 'doSomethingCrazy',
  //   }

  //   languages.forEach((lang) => {
  //     expect(makeMethodNameWithLanguage(lang, title)).toBe(expected[lang])
  //   })
  // })

  // test('handles all caps acronyms', () => {
  //   const title = 'parseJSONData'
  //   const expected = {
  //     ruby: 'parse_json_data',
  //     python: 'parseJsonData',
  //     js: 'parseJsonData',
  //     ts: 'parseJsonData',
  //     dart: 'parseJsonData',
  //     java: 'parseJsonData',
  //     go: 'parseJsonData',
  //     cplusplus: 'parseJsonData',
  //   }

  //   languages.forEach((lang) => {
  //     expect(makeMethodNameWithLanguage(lang, title)).toBe(expected[lang])
  //   })
  // })
})
