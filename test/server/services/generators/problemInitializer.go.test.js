import { describe, expect } from 'vitest'
import {
  problemInitializer,
  makeMethodNameWithLanguage,
} from '@/server/services/languageUtils'

describe('Go generator', () => {
  describe('Generates correct function signatures', () => {
    test('generates simple code with correct function call', () => {
      const fnName = 'addNumbers'
      const codeBody = 'func addNumbers(a, b int) int { return a + b }'
      const inputs = ['1', '2']

      const signature = {
        parameters: [
          { name: 'a', type: 'int' },
          { name: 'b', type: 'int' },
        ],
        returnType: 'int',
      }

      const code = problemInitializer.go(fnName, codeBody, inputs, signature, 0)
      expect(code).toContain('result := addNumbers(1, 2)')
      expect(code).toContain('func main() {')
      expect(code).toMatch(/switch v := interface\{\}\(result\).*{[\s\S]*}/)
    })

    test('handles array parameters', () => {
      const fnName = 'sumArray'
      const codeBody =
        'func sumArray(nums []int) []int { sum := 0; for _, n := range nums { sum += n }; return []int{sum} }'
      const inputs = ['[1,2,3,4]']

      const signature = {
        parameters: [{ name: 'nums', type: '[]int' }],
        returnType: '[]int',
      }

      const code = problemInitializer.go(fnName, codeBody, inputs, signature, 0)
      expect(code).toContain('result := sumArray([]int{1,2,3,4})')
      expect(code).toContain('func main() {')
      expect(code).toMatch(/switch v := interface\{\}\(result\)\.?\(type\)/)
      expect(code).toMatch(/fmt\.Println\(/)
    })

    test('handles nested arrays', () => {
      const fnName = 'sumMatrix'
      const codeBody = `
  func sumMatrix(matrix [][]int) []int {
      sum := 0
      for _, row := range matrix {
          for _, n := range row {
              sum += n
          }
      }
      return []int{sum}
  }`
      const inputs = ['[[1,2],[3,4]]']

      const signature = {
        parameters: [{ name: 'matrix', type: '[][]int' }],
        returnType: '[]int',
      }

      const code = problemInitializer.go(fnName, codeBody, inputs, signature, 0)
      expect(code).toContain('result := sumMatrix([][]int{{1,2},{3,4}})')
      expect(code).toContain('func main() {')
      expect(code).toMatch(/switch v := interface\{\}\(result\)\.?\(type\)/)
      expect(code).toMatch(/fmt\.Println\(/)
    })
  })
})
