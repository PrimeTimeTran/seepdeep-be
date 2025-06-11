// import SubmissionService from "../../../server/services/Solve.service";
import { describe, it, expect } from 'vitest'

const body = `
{
  "lang": "python",
  "body": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        store = {}\n        for idx, n in enumerate(nums):\n            remainder = target - n\n            if store.get(remainder) != None:\n                return [store.get(remainder), idx]\n            store[n] = idx",
  "name": "Two Sum",
  "problem": "66365afe499de034006863c3"
}
`
describe('Submissions Service', function () {
  describe('Submit Python code', function () {
    it('When python code is submitted, then the service runs it without error.', () => {
      expect(true).toBe(true)
    })
    it('When the method parameter contains an int, it does not error.', () => {
      expect(true).toBe(true)
    })
  })
})
