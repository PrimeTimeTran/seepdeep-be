import { describe, it, expect } from 'vitest'
import {
  problemInitializer,
  makeMethodNameWithLanguage,
} from '@/server/services/languageUtils'

describe('Python generator', () => {
  it('converts titles to camelCase', () => {
    const fnName = makeMethodNameWithLanguage('python', 'add numbers')
    expect(fnName).toBe('addNumbers')

    const fnName2 = makeMethodNameWithLanguage('python', 'Calculate_SUM')
    expect(fnName2).toBe('calculateSum')
  })

  it('generates simple code with correct function call', () => {
    const fnName = makeMethodNameWithLanguage('python', 'add numbers')
    const codeBody = `
class Solution:
    def addNumbers(self, a, b):
        return a + b
`
    const inputs = ['1', '2'] // Note: stringified values for the generator
    const code = problemInitializer.python(fnName, codeBody, inputs.join(', '))
    expect(code).toContain('class Solution')
    expect(code).toContain(`result = solution.${fnName}(1, 2)`)
    expect(code).toContain('print(result)')
  })

  it('handles empty inputs correctly', () => {
    const fnName = makeMethodNameWithLanguage('python', 'do nothing')
    const codeBody = `class Solution: pass`
    const code = problemInitializer.python(fnName, codeBody, '')
    expect(code).toContain('result = solution.' + fnName + '()')
  })

  it('handles list parameters', () => {
    const fnName = makeMethodNameWithLanguage('python', 'sum list')
    const codeBody = `
class Solution:
    def sumList(self, nums):
        return sum(nums)
`
    const inputs = ['[1,2,3,4]']
    const code = problemInitializer.python(fnName, codeBody, inputs.join(', '))
    expect(code).toContain('result = solution.' + fnName + '([1,2,3,4])')
    expect(code).toContain('print(result)')
  })

  it('handles nested lists', () => {
    const fnName = makeMethodNameWithLanguage('python', 'sum matrix')
    const codeBody = `
class Solution:
    def sumMatrix(self, matrix):
        return sum(sum(row) for row in matrix)
`
    const inputs = ['[[1,2],[3,4]]']
    const code = problemInitializer.python(fnName, codeBody, inputs.join(', '))
    expect(code).toContain('result = solution.' + fnName + '([[1,2],[3,4]])')
  })
})
