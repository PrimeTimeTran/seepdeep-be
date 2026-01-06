import { describe, it, expect } from 'vitest'
import {
  problemInitializer,
  makeMethodNameWithLanguage,
} from '@/server/services/languageUtils'

describe('Ruby generator', () => {
  it('converts titles to snake_case', () => {
    const fnName = makeMethodNameWithLanguage('ruby', 'Add Numbers')
    expect(fnName).toBe('add_numbers')

    const fnName2 = makeMethodNameWithLanguage('ruby', 'CalculateSUM')
    expect(fnName2).toBe('calculate_sum')
  })

  it('generates simple code with correct function call', () => {
    const fnName = makeMethodNameWithLanguage('ruby', 'add numbers')
    const codeBody = `
class Solution
  def add_numbers(a, b)
    a + b
  end
end
`
    const inputs = ['1', '2']
    const code = problemInitializer.ruby(fnName, codeBody, inputs.join(', '))
    expect(code).toContain('class Solution')
    expect(code).toContain(`result = ${fnName}(1, 2)`) // Ruby prints directly, may also check print
    expect(code).toContain('puts result')
  })

  it('handles empty inputs correctly', () => {
    const fnName = makeMethodNameWithLanguage('ruby', 'do nothing')
    const codeBody = `class Solution; def do_nothing; end; end`
    const code = problemInitializer.ruby(fnName, codeBody, '')
    expect(code).toContain(`result = ${fnName}()`)
  })

  it('handles array parameters', () => {
    const fnName = makeMethodNameWithLanguage('ruby', 'sum array')
    const codeBody = `
class Solution
  def sum_array(arr)
    arr.sum
  end
end
`
    const inputs = ['[1,2,3,4]']
    const code = problemInitializer.ruby(fnName, codeBody, inputs.join(', '))
    expect(code).toContain(`result = ${fnName}([1,2,3,4])`)
    expect(code).toContain('puts result')
  })

  it('handles array of strings parameters', () => {
    const fnName = makeMethodNameWithLanguage('ruby', 'concat strings')
    const codeBody = `
class Solution
  def concat_strings(arr)
    arr.join('-')
  end
end
`
    const inputs = [`["a","b","c"]`]
    const code = problemInitializer.ruby(fnName, codeBody, inputs.join(', '))
    expect(code).toContain(`result = ${fnName}(["a","b","c"])`)
  })
})
