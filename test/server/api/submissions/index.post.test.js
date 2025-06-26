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
    // it('should handle Dart', async () => {
    //   const res = await $fetch('/api/submissions', {
    //     method: 'POST',
    //     headers,
    //     body: {
    //       ...answers.twoSum.dart,
    //       lang: 'dart',
    //     },
    //   })
    //   expect(res).toHaveProperty('data.submission.passing', true)
    // })
    // it('should handle Ruby', async () => {
    //   const res = await $fetch('/api/submissions', {
    //     method: 'POST',
    //     headers,
    //     body: {
    //       ...answers.twoSum.ruby,
    //       lang: 'ruby',
    //     },
    //   })
    //   expect(res).toHaveProperty('data.submission.passing', true)
    // })
    // // Todo: Fix race condition
    // // Java tests will pass if run one at a time. They're fail if all run together.
    // // The Java files being named the same when compiled causes a collision in the test cases.
    // it('should handle Java', async () => {
    //   const res = await $fetch('/api/submissions', {
    //     method: 'POST',
    //     headers,
    //     body: {
    //       ...answers.twoSum.java,
    //       lang: 'java',
    //     },
    //   })
    //   expect(res).toHaveProperty('data.submission.passing', true)
    // }, 20000)
    // it('should handle Go', async () => {
    //   const res = await $fetch('/api/submissions', {
    //     method: 'POST',
    //     headers,
    //     body: {
    //       ...answers.twoSum.go,
    //       lang: 'go',
    //     },
    //   })
    //   expect(res).toHaveProperty('data.submission.passing', true)
    // })
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
    // it('should handle Dart', async () => {
    //   const res = await $fetch('/api/submissions', {
    //     method: 'POST',
    //     headers,
    //     body: {
    //       ...answers.longestSubstringWithoutRepeatingCharacters.dart,
    //       lang: 'dart',
    //     },
    //   })
    //   expect(res).toHaveProperty('data.submission.passing', true)
    // })
    // it('should handle Ruby', async () => {
    //   const res = await $fetch('/api/submissions', {
    //     method: 'POST',
    //     headers,
    //     body: {
    //       ...answers.longestSubstringWithoutRepeatingCharacters.ruby,
    //       lang: 'ruby',
    //     },
    //   })
    //   expect(res).toHaveProperty('data.submission.passing', true)
    // })
    // // Todo: Fix race condition
    // // Java tests will pass if run one at a time. They're fail if all run together.
    // // The Java files being named the same when compiled causes a collision in the test cases.
    // it('should handle Java', async () => {
    //   const res = await $fetch('/api/submissions', {
    //     method: 'POST',
    //     headers,
    //     body: {
    //       ...answers.longestSubstringWithoutRepeatingCharacters.java,
    //       lang: 'java',
    //     },
    //   })
    //   expect(res).toHaveProperty('data.submission.passing', true)
    // }, 20000)
    // it('should handle Go', async () => {
    //   const res = await $fetch('/api/submissions', {
    //     method: 'POST',
    //     headers,
    //     body: {
    //       ...answers.longestSubstringWithoutRepeatingCharacters.go,
    //       lang: 'go',
    //     },
    //   })
    //   expect(res).toHaveProperty('data.submission.passing', true)
    // })
  })
  describe('medianOfTwoSortedArrays ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.medianOfTwoSortedArrays.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
    // it('should handle Dart', async () => {
    //   const res = await $fetch('/api/submissions', {
    //     method: 'POST',
    //     headers,
    //     body: {
    //       ...answers.medianOfTwoSortedArrays.dart,
    //       lang: 'dart',
    //     },
    //   })
    //   expect(res).toHaveProperty('data.submission.passing', true)
    // })
    // it('should handle Ruby', async () => {
    //   const res = await $fetch('/api/submissions', {
    //     method: 'POST',
    //     headers,
    //     body: {
    //       ...answers.medianOfTwoSortedArrays.ruby,
    //       lang: 'ruby',
    //     },
    //   })
    //   expect(res).toHaveProperty('data.submission.passing', true)
    // })
    // it('should handle Java', async () => {
    //   const res = await $fetch('/api/submissions', {
    //     method: 'POST',
    //     headers,
    //     body: {
    //       ...answers.medianOfTwoSortedArrays.java,
    //       lang: 'java',
    //     },
    //   })
    //   expect(res).toHaveProperty('data.submission.passing', true)
    // })
    // it('should handle Go', async () => {
    //   const res = await $fetch('/api/submissions', {
    //     method: 'POST',
    //     headers,
    //     body: {
    //       ...answers.medianOfTwoSortedArrays.go,
    //       lang: 'go',
    //     },
    //   })
    //   expect(res).toHaveProperty('data.submission.passing', true)
    // })
  })
  describe('containerWithMostWater ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.containerWithMostWater.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('3Sum ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.threeSum.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('validParentheses ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.validParentheses.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('validSudoku ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.validSudoku.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('groupAnagrams ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.groupAnagrams.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('longestConsecutiveSequence ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.longestConsecutiveSequence.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('containsDuplicate ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.containsDuplicate.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('productOfArrayExceptSelf ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.productOfArrayExceptSelf.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('validAnagram ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.validAnagram.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('islandPerimeter ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.islandPerimeter.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('floodFill ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.floodFill.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('findTheTownJudge ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.findTheTownJudge.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('numberOfIslands ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.numberOfIslands.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('maxAreaOfIsland ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.maxAreaOfIsland.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('coinChange ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.coinChange.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('houseRobber ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.houseRobber.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('houseRobberII ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.houseRobberII.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
  describe('climbingStairs ', () => {
    it('should handle Python', async () => {
      const res = await $fetch('/api/submissions', {
        method: 'POST',
        headers,
        body: {
          ...answers.climbingStairs.python,
        },
      })
      expect(res).toHaveProperty('data.submission.passing', true)
    })
  })
})
