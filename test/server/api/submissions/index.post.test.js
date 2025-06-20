import { describe, it, expect } from 'vitest'
import { $fetch } from '@nuxt/test-utils'
import { answers } from './answers.js'

const headers = {
  authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNkMmY0YzAyNjAwNDZhNDQzNTExYTIiLCJpYXQiOjE3MTM2NDg2NzgsImV4cCI6MjAyOTAwODY3OH0.HnX3iDxGkKdcgaxpZSAR34jXq5T1pASW6vaeEjuJ6EM',
}

describe('POST /api/submissions', () => {
  describe('twoSum ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.twoSum.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
    it('should handle Dart', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.twoSum.dart,
          lang: 'dart',
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
    it('should handle Ruby', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.twoSum.ruby,
          lang: 'ruby',
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
    it('should handle Java', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.twoSum.java,
          lang: 'java',
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
    it('should handle Go', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.twoSum.go,
          lang: 'go',
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('longestSubstringWithoutRepeatingCharacters ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.longestSubstringWithoutRepeatingCharacters.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
    it('should handle Dart', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.longestSubstringWithoutRepeatingCharacters.dart,
          lang: 'dart',
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
    it('should handle Ruby', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.longestSubstringWithoutRepeatingCharacters.ruby,
          lang: 'ruby',
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
    it('should handle Java', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.longestSubstringWithoutRepeatingCharacters.java,
          lang: 'java',
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
    it('should handle Go', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.longestSubstringWithoutRepeatingCharacters.go,
          lang: 'go',
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  // describe('medianOfTwoSortedArrays ', () => {
  //   it('should handle Python', async () => {
  //     const res = await $fetch('/api/submissions', {
  //       method: 'POST',
  //       headers,
  //       body: {
  //         ...answers.medianOfTwoSortedArrays.python,
  //       },
  //     })
  //     expect(res).toHaveProperty('data.submission.passing', true)
  //   })
  //   it('should handle Dart', async () => {
  //     const res = await $fetch('/api/submissions', {
  //       method: 'POST',
  //       headers,
  //       body: {
  //         ...answers.medianOfTwoSortedArrays.dart,
  //         lang: 'dart',
  //       },
  //     })
  //     expect(res).toHaveProperty('data.submission.passing', true)
  //   })
  //   it('should handle Ruby', async () => {
  //     const res = await $fetch('/api/submissions', {
  //       method: 'POST',
  //       headers,
  //       body: {
  //         ...answers.medianOfTwoSortedArrays.ruby,
  //         lang: 'ruby',
  //       },
  //     })
  //     expect(res).toHaveProperty('data.submission.passing', true)
  //   })
  //   it('should handle Java', async () => {
  //     const res = await $fetch('/api/submissions', {
  //       method: 'POST',
  //       headers,
  //       body: {
  //         ...answers.medianOfTwoSortedArrays.java,
  //         lang: 'java',
  //       },
  //     })
  //     expect(res).toHaveProperty('data.submission.passing', true)
  //   })
  //   it('should handle Go', async () => {
  //     const res = await $fetch('/api/submissions', {
  //       method: 'POST',
  //       headers,
  //       body: {
  //         ...answers.medianOfTwoSortedArrays.go,
  //         lang: 'go',
  //       },
  //     })
  //     expect(res).toHaveProperty('data.submission.passing', true)
  //   })
  // })
})
