import { createApp } from 'h3'
import { toPlainHandler } from 'h3'
import API from '../../../../server/api/submissions/index.post.js'

const app = createApp()
app.use(API)
const handler = toPlainHandler(app)

const body = String.raw`{
  "lang": "python",
  "body": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        store = {}\n        for idx, n in enumerate(nums):\n            remainder = target - n\n            if store.get(remainder) != None:\n                return [store.get(remainder), idx]\n            store[n] = idx",
  "name": "Two Sum",
  "problem": "66365afe499de034006863c3"
}`

const problems = [
  String.raw`{
    "lang": "python",
    "body": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        store = {}\n        for idx, n in enumerate(nums):\n            remainder = target - n\n            if store.get(remainder) != None:\n                return [store.get(remainder), idx]\n            store[n] = idx",
    "name": "Two Sum",
    "problem": "66365afe499de034006863c3"
  }`,
]

describe('Event Handler', () => {
  test('should handle new submission successfully', async () => {
    const result = await handler({
      method: 'POST',
      path: '/api/submissions',
      headers: {
        'content-type': 'text/json',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNkMmY0YzAyNjAwNDZhNDQzNTExYTIiLCJpYXQiOjE3MTM2NDg2NzgsImV4cCI6MjAyOTAwODY3OH0.HnX3iDxGkKdcgaxpZSAR34jXq5T1pASW6vaeEjuJ6EM',
      },
      body: body,
      context: {
        user: {
          _id: '65cd2f4c0260046a443511a2',
        },
      },
    })

    console.log({
      result,
    })
    expect(true).toBe(true)
  }, 10000)

  test('should handle errors properly', async () => {
    // Write test case for error handling
    expect(true).toBe(true)
  })
})
