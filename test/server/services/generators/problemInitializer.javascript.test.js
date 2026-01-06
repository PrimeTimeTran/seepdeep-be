import { describe, it, expect } from 'vitest'
import {
  problemInitializer,
  makeMethodNameWithLanguage,
} from '@/server/services/languageUtils'

describe('JavaScript generator', () => {
  it('converts titles to camelCase', () => {
    const fnName = makeMethodNameWithLanguage('js', 'add numbers')
    expect(fnName).toBe('addNumbers')

    const fnName2 = makeMethodNameWithLanguage('js', 'Calculate_SUM')
    expect(fnName2).toBe('calculateSum')
  })

  it('generates simple code with correct function call', () => {
    const fnName = makeMethodNameWithLanguage('js', 'add numbers')
    const codeBody = `
function addNumbers(a, b) {
  return a + b
}`
    const inputs = ['1', '2']
    const code = problemInitializer.js(fnName, codeBody, inputs.join(', '))
    expect(code).toContain('function addNumbers')
    expect(code).toContain(`const result = ${fnName}(1, 2)`)
    expect(code).toContain('console.log(result)')
  })

  it('handles empty inputs correctly', () => {
    const fnName = makeMethodNameWithLanguage('js', 'do nothing')
    const codeBody = `function doNothing() {}`
    const code = problemInitializer.js(fnName, codeBody, '')
    expect(code).toContain(`const result = ${fnName}()`)
  })

  it('handles array parameters', () => {
    const fnName = makeMethodNameWithLanguage('js', 'sum array')
    const codeBody = `
function sumArray(nums) {
  return nums.reduce((a, b) => a + b, 0)
}`
    const inputs = ['[1,2,3,4]']
    const code = problemInitializer.js(fnName, codeBody, inputs.join(', '))
    expect(code).toContain(`const result = ${fnName}([1,2,3,4])`)
    expect(code).toContain('console.log(result)')
  })

  it('handles nested arrays', () => {
    const fnName = makeMethodNameWithLanguage('js', 'sum matrix')
    const codeBody = `
function sumMatrix(matrix) {
  return matrix.flat().reduce((a, b) => a + b, 0)
}`
    const inputs = ['[[1,2],[3,4]]']
    const code = problemInitializer.js(fnName, codeBody, inputs.join(', '))
    expect(code).toContain(`const result = ${fnName}([[1,2],[3,4]])`)
  })
})
