import { describe, it, expect } from 'vitest'
import {
  problemInitializer,
  makeMethodNameWithLanguage,
} from '@/server/services/languageUtils'

describe('Java generator', () => {
  it('converts titles to camelCase', () => {
    const fnName = makeMethodNameWithLanguage('java', 'add numbers')
    expect(fnName).toBe('addNumbers')

    const fnName2 = makeMethodNameWithLanguage('java', 'Calculate_SUM')
    expect(fnName2).toBe('calculateSum')
  })

  it('generates simple code with correct function call', () => {
    const fnName = makeMethodNameWithLanguage('java', 'add numbers')
    const codeBody = `
class Solution {
    public int addNumbers(int a, int b) {
        return a + b;
    }
}`
    const inputs = ['1', '2']
    const signature = {
      parameters: [
        { name: 'a', type: 'int' },
        { name: 'b', type: 'int' },
      ],
      returnType: 'int',
    }
    const code = problemInitializer.java(fnName, codeBody, inputs, signature, 1)

    expect(code).toContain('class Solution1')
    expect(code).toContain(`Solution1 solution = new Solution1()`)
    expect(code).toContain(`System.out.println(solution.${fnName}(1, 2));`)
  })

  it('handles empty inputs correctly', () => {
    const fnName = makeMethodNameWithLanguage('java', 'do nothing')
    const codeBody = `
class Solution {
    public void doNothing() {}
}`
    const inputs = []
    const signature = { parameters: [], returnType: 'void' }
    const code = problemInitializer.java(fnName, codeBody, inputs, signature, 2)

    expect(code).toContain(`Solution2 solution = new Solution2()`)
    expect(code).toContain(`System.out.println(solution.${fnName}())`)
  })

  it('handles array parameters', () => {
    const fnName = makeMethodNameWithLanguage('java', 'sum list')
    const codeBody = `
class Solution {
    public int sumList(int[] nums) {
        int sum = 0;
        for(int n : nums) sum += n;
        return sum;
    }
}`
    const inputs = ['[1,2,3,4]']
    const signature = {
      parameters: [{ name: 'nums', type: 'List[int]' }],
      returnType: 'int',
    }
    const code = problemInitializer.java(fnName, codeBody, inputs, signature, 3)

    expect(code).toContain(`new int[]{1,2,3,4}`)
    expect(code).toContain(
      `System.out.println(solution.${fnName}(new int[]{1,2,3,4}));`
    )
  })

  it('handles array of strings parameters', () => {
    const fnName = makeMethodNameWithLanguage('java', 'print names')
    const codeBody = `
class Solution {
    public String joinStrings(String[] arr) {
        return String.join("-", arr);
    }
}`
    const inputs = ['["Alice","Bob"]']
    const signature = {
      parameters: [{ name: 'arr', type: 'List[str]' }],
      returnType: 'String',
    }
    const code = problemInitializer.java(fnName, codeBody, inputs, signature, 4)

    expect(code).toContain(`new String[]{"Alice", "Bob"}`)
    expect(code).toContain(
      `System.out.println(solution.${fnName}(new String[]{"Alice", "Bob"}));`
    )
  })
})
