import fs from 'fs'
import path from 'path'
// import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import mongoose from 'mongoose'
import EventEmitter from 'node:events'
import { getVars, runCommands } from './helpers.js'
const eventEmitter = new EventEmitter()

import data from './problems.json'
const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)
// process.chdir(__dirname)
const __dirname = '/Users/future/Downloads/CSGemsBE/nuxt/server/services/'

export default class SubmissionService {
  constructor(e, body) {
    this.runResult = {
      ...this.body,
    }
    this.body = body
    this.problem = null
    this.testCases = []
    this.isError = false
    this.language = 'python'
    this.executionCount = 0
    this.user = e.context.user
    this.totalExecutions = null
    this.setup()
  }

  setup() {
    this.problem = data.data.find((problem) => problem.id === this.body.problem)
    this.totalExecutions = this.problem.testSuite.length
    this.functionName = toCamelCase(this.problem.title)
    this.createFunctionCalls()
  }

  async updateSolved() {
    let solveIds = [...new Set(this.user.solves)]
    let solveDocuments = await Solve.find({ _id: { $in: solveIds } })
    let solveMap = new Map()
    solveDocuments.forEach((solve) => {
      solveMap.set(solve.problem.toString(), solve)
    })
    let solvedItem = solveMap.get(this.submission.problem.toString())
    if (solvedItem) {
      logger.info('Problem previously solved')
      solvedItem = await Solve.findById(solvedItem)
    } else {
      logger.info('Newly Solved Problem')
      let solvedItem = Solve({
        user: this.user._id,
        problem: this.submission.problem,
      })
      await solvedItem.save()
      this.user.solves.push(solvedItem._id)
      await this.user.save()
    }
  }

  async onNewSubmission() {
    // - Create submission instance
    // [x] Run & benchmark submission
    // [ ] Update user streak.
    // [x] Update user solves.
    // [ ] Update user language mastery.
    // [ ] Update solved problems if already existing, else create.
    // [ ] Update problem stats
    try {
      this.benchmark()
      this.submission = await new Submission({
        ...this.body,
        user: this.user._id,
        language: this.language,
        problem: this.body.problem,
      })
      this.runResult.submissionId = this.submission._id
      this.updateSolved()
      this.user.submissions.push(this.submission._id)
      this.user.save()
    } catch (error) {
      logger.error(error, 'Error:')
      throw new Error("Error! You didn't code this correctly")
    }
  }

  benchmark() {
    const initialMemoryUsage = process.memoryUsage().heapUsed
    this.runResult.timeStart = Date.now()
    this.calls.map((call, idx) =>
      this.runTest(call, idx, () => {
        this.executionCount++
        if (this.executionCount === this.totalExecutions) {
          const finalMemoryUsage = process.memoryUsage().heapUsed
          const memoryUsedBytes = finalMemoryUsage - initialMemoryUsage
          this.runResult.memoryUsedMB = memoryUsedBytes / 1024 / 1024
          this.runResult.timeEnd = Date.now()
          const timeElapsed = this.runResult.timeEnd - this.runResult.timeStart
          this.runResult.timeToComplete = timeElapsed / 1000
          this.submission.testCases = this.testCases
          this.submission.passing = this.testCases.every((c) => c.passing)
          eventEmitter.emit('finish', this.runResult)
        }
      })
    )
  }

  runTest(fn, idx, callback) {
    try {
      const lang = this.language
      const [extension, filePath] = getVars(lang)
      const timestamp = Date.now()
      const scriptPath = path.join(
        __dirname,
        // Info: Add idx to prevent multiple testCases using the same script/file/case
        `./scripts/runner_${timestamp}-${idx}.${extension}`
      )
      const code = 'from typing import List\n' + this.body.body + fn
      fs.writeFileSync(scriptPath, code)
      let command = `${runCommands[lang]} ${scriptPath}`
      if (lang === 'cplusplus') {
        command += ` -o ${filePath}`
        this.scriptRun(command)
        this.scriptRun(filePath, idx, callback)
      } else {
        this.scriptRun(command, idx, callback)
      }
    } catch (error) {
      logger.info({ msg: error })
    }
  }

  scriptRun(command, idx, callback) {
    exec(command, (error, stdout, _) => {
      console.log({ output: stdout.trim() })
      if (error) {
        let msg = error.message.split('line')[1]
        const match = msg.match(/\d+\n/)
        const index = match ? error.message.indexOf(match[0]) : -1
        msg = index !== -1 ? error.message.substring(index).trim() : ''
        console.log({ msg, what: error.message })
        this.buildTestResult(stdout.trim(), idx)
        eventEmitter.emit('error', msg)
      }
      if (callback) {
        this.buildTestResult(stdout.trim(), idx)
        callback(stdout.trim())
      }
    })
  }

  buildTestResult(stdout, idx) {
    const stdoutArray = JSON.parse(stdout)
    const outExpected = this.results[idx]
    const passing = JSON.stringify(stdoutArray) === JSON.stringify(outExpected)
    const testCase = {
      passing,
      outExpected,
      outActual: stdoutArray,
      input: this.inputs[idx],
    }
    this.testCases.push(testCase)
  }

  async onComplete() {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId)
        reject(new Error('Timeout'))
      }, 10000)

      const onFinishHandler = async (result) => {
        clearTimeout(timeoutId)
        logger.info('onComplete')
        this.submission.runResult = result
        await this.submission.save()
        resolve({
          data: {
            runResult: result,
            submission: this.submission,
          },
        })
      }

      const onErrorHandler = (error) => {
        if (!this.isError) {
          clearTimeout(timeoutId)
          logger.info('onError')
          this.isError = true
          this.submission.runResult = this.runResult
          this.submission.testCases = this.testCases
          this.submission.passing = false
          this.submission.save()
          reject(new Error(error))
        }
      }
      eventEmitter.once('error', onErrorHandler)
      eventEmitter.once('finish', onFinishHandler)
    })
  }

  createFunctionCalls() {
    try {
      const calls = []
      const results = []
      const params = []
      this.problem.testSuite.forEach((testCase) => {
        const inputs = testCase.input.map((input) => JSON.stringify(input))
        const inputs2 = testCase.input.map((input) => input)
        const call = `\nsolution = Solution()\nresult = solution.${
          this.functionName
        }(${inputs.join(', ')}) \nprint(result)`
        params.push(inputs2)
        calls.push(call)
        results.push(testCase.output)
      })
      this.calls = calls
      this.results = results
      this.inputs = params
    } catch (error) {
      console.log({ error })
    }
  }
}

const input1P = `
def twoSum(a, b):
    return a + b

result = twoSum(1, 2)
print(result)
`
const input1J = `
function twoSum(a,b) {
  return a + b
}
const result = twoSum(1,2)
console.log(result)
`
const input1C = `
#include <iostream>

// Define the twoSum function
int twoSum(int a, int b) {
    return a + b;
}

int main() {
    int result = twoSum(1, 2);
    std::cout << result << std::endl;
    return 0;
}
`

function myFunction1() {
  const runner1 = new SubmissionService()
  runner1.testSubmission('python', input1P)
}
function myFunction2() {
  const runner2 = new SubmissionService()
  runner2.testSubmission('javascript', input1J)
}
function myFunction3() {
  const runner3 = new SubmissionService()
  runner3.testSubmission('cplusplus', input1C)
}

// measureMemoryUsage(myFunction3)
// measureMemoryUsage(myFunction2)
// measureMemoryUsage(myFunction1)

// const input1P = `
// nums = [454, 30, 42, 185, 177, 46, 253, 64, 130, 47, 111, 235, 368, 170, 132, 150, 200, 151, 306, 286, 183, 39, 365, 265, 155, 288, 466, 258, 103, 278, 406, 442, 418, 277, 57, 234, 201, 378, 359, 63, 239, 237, 81, 429, 283, 122, 464, 32, 272, 443, 304, 232, 256, 204, 336, 310, 260, 337, 436, 497, 461, 124, 476, 470, 449, 458, 257, 68, 231, 259, 137, 384, 323, 108, 178, 371, 455, 45, 7, 2, 73, 156, 479, 426, 222, 404, 95, 184, 22, 344, 202, 430, 145, 435, 316, 25, 41, 387, 451, 129, 52, 408, 163, 302, 1, 276, 14, 339, 101, 303, 462, 215, 279, 324, 186, 250, 182, 161, 77, 93, 11, 383, 248, 478, 179, 199, 28, 273, 181, 118, 496, 329, 490, 372, 62, 116, 141, 210, 226, 85, 236, 421, 56, 230, 440, 112, 452, 37, 433, 380, 460, 209, 308, 318, 441, 88, 55, 100, 3, 114, 459, 152, 405, 423, 341, 102, 284, 31, 12, 113, 499, 139, 362, 363, 121, 146, 415, 87, 140, 394, 187, 397, 290, 216, 473, 191, 285, 245, 229, 131, 386, 364, 98, 166, 54, 233, 189, 97, 489, 355, 89, 94, 10, 158, 390, 471, 314, 422, 60, 281, 128, 5, 165, 67, 427, 289, 350, 494, 457, 90, 269, 217, 414, 438, 391, 104, 228, 9, 134, 126, 358, 375, 162, 492, 349, 377, 498, 487, 472, 19, 195, 254, 312, 338, 280, 53, 160, 36, 270, 297, 243, 275, 481, 325, 40, 352, 263, 396, 24, 78, 379, 167, 71, 315, 8, 13, 294, 357, 220, 72, 437, 247, 483, 65, 107, 313, 413, 193, 322, 138, 38, 16, 218, 307, 69, 21, 261, 392, 482, 268, 346, 92, 251, 153, 395, 354, 119, 110, 416, 360, 401, 172, 291, 491, 242, 206, 295, 6, 80, 388, 311, 343, 50, 434, 293, 198, 214, 175, 66, 348, 174, 420, 106, 246, 445, 412, 402, 15, 319, 296, 82, 168, 367, 292, 4, 105, 148, 196, 403, 143, 159, 446, 447, 26, 468, 190, 117, 417, 70, 120, 444, 125, 91, 495, 266, 262, 133, 453, 300, 221, 428, 356, 385, 373, 115, 477, 374, 301, 227, 147, 474, 282, 370, 345, 271, 321, 425, 299, 328, 79, 35, 305, 219, 456, 249, 469, 264, 252, 86, 83, 480, 154, 287, 99, 389, 439, 326, 49, 34, 192, 109, 164, 330, 213, 369, 33, 74, 197, 320, 241, 317, 419, 475, 207, 149, 208, 173, 157, 331, 61, 188, 381, 20, 450, 376, 51, 169, 180, 333, 366, 347, 465, 400, 240, 238, 17, 407, 171, 424, 58, 485, 48, 342, 274, 298, 488, 463, 493, 448, 361, 23, 267, 486, 212, 332, 18, 75, 431, 205, 96, 351, 335, 399, 224, 255, 398, 59, 340, 353, 211, 484, 432, 123, 410, 29, 194, 244, 203, 467, 43, 135, 225, 334, 223, 176, 144, 76, 327, 411, 382, 142, 309, 127, 409, 84, 27, 136, 393, 44]
// def bubble_sort(nums):
//   sorted = False

//   while not sorted:
//     sorted = True
//     for i in range(len(nums) - 1):
//       if nums[i] > nums[i + 1]:
//         sorted = False
//         nums[i], nums[i + 1] = nums[i + 1], nums[i]

//   return nums

// result = bubble_sort(nums)
// print(result)
// `
// const input1J = `
// function bubbleSort(arr) {
//   const n = arr.length;
//   for (let i = 0; i < n - 1; i++) {
//       for (let j = 0; j < n - i - 1; j++) {
//           if (arr[j] > arr[j + 1]) {
//               // Swap arr[j] and arr[j+1]
//               let temp = arr[j];
//               arr[j] = arr[j + 1];
//               arr[j + 1] = temp;
//           }
//       }
//   }
//   return arr;
// }
// const nums = [454, 30, 42, 185, 177, 46, 253, 64, 130, 47, 111, 235, 368, 170, 132, 150, 200, 151, 306, 286, 183, 39, 365, 265, 155, 288, 466, 258, 103, 278, 406, 442, 418, 277, 57, 234, 201, 378, 359, 63, 239, 237, 81, 429, 283, 122, 464, 32, 272, 443, 304, 232, 256, 204, 336, 310, 260, 337, 436, 497, 461, 124, 476, 470, 449, 458, 257, 68, 231, 259, 137, 384, 323, 108, 178, 371, 455, 45, 7, 2, 73, 156, 479, 426, 222, 404, 95, 184, 22, 344, 202, 430, 145, 435, 316, 25, 41, 387, 451, 129, 52, 408, 163, 302, 1, 276, 14, 339, 101, 303, 462, 215, 279, 324, 186, 250, 182, 161, 77, 93, 11, 383, 248, 478, 179, 199, 28, 273, 181, 118, 496, 329, 490, 372, 62, 116, 141, 210, 226, 85, 236, 421, 56, 230, 440, 112, 452, 37, 433, 380, 460, 209, 308, 318, 441, 88, 55, 100, 3, 114, 459, 152, 405, 423, 341, 102, 284, 31, 12, 113, 499, 139, 362, 363, 121, 146, 415, 87, 140, 394, 187, 397, 290, 216, 473, 191, 285, 245, 229, 131, 386, 364, 98, 166, 54, 233, 189, 97, 489, 355, 89, 94, 10, 158, 390, 471, 314, 422, 60, 281, 128, 5, 165, 67, 427, 289, 350, 494, 457, 90, 269, 217, 414, 438, 391, 104, 228, 9, 134, 126, 358, 375, 162, 492, 349, 377, 498, 487, 472, 19, 195, 254, 312, 338, 280, 53, 160, 36, 270, 297, 243, 275, 481, 325, 40, 352, 263, 396, 24, 78, 379, 167, 71, 315, 8, 13, 294, 357, 220, 72, 437, 247, 483, 65, 107, 313, 413, 193, 322, 138, 38, 16, 218, 307, 69, 21, 261, 392, 482, 268, 346, 92, 251, 153, 395, 354, 119, 110, 416, 360, 401, 172, 291, 491, 242, 206, 295, 6, 80, 388, 311, 343, 50, 434, 293, 198, 214, 175, 66, 348, 174, 420, 106, 246, 445, 412, 402, 15, 319, 296, 82, 168, 367, 292, 4, 105, 148, 196, 403, 143, 159, 446, 447, 26, 468, 190, 117, 417, 70, 120, 444, 125, 91, 495, 266, 262, 133, 453, 300, 221, 428, 356, 385, 373, 115, 477, 374, 301, 227, 147, 474, 282, 370, 345, 271, 321, 425, 299, 328, 79, 35, 305, 219, 456, 249, 469, 264, 252, 86, 83, 480, 154, 287, 99, 389, 439, 326, 49, 34, 192, 109, 164, 330, 213, 369, 33, 74, 197, 320, 241, 317, 419, 475, 207, 149, 208, 173, 157, 331, 61, 188, 381, 20, 450, 376, 51, 169, 180, 333, 366, 347, 465, 400, 240, 238, 17, 407, 171, 424, 58, 485, 48, 342, 274, 298, 488, 463, 493, 448, 361, 23, 267, 486, 212, 332, 18, 75, 431, 205, 96, 351, 335, 399, 224, 255, 398, 59, 340, 353, 211, 484, 432, 123, 410, 29, 194, 244, 203, 467, 43, 135, 225, 334, 223, 176, 144, 76, 327, 411, 382, 142, 309, 127, 409, 84, 27, 136, 393, 44]
// const result = bubbleSort(nums)
// console.log(result)
// `
// const input1C = `
// #include <iostream>
// #include <vector> // Include the vector header

// void bubbleSort(std::vector<int>& arr) {
//   int n = arr.size();
//   for (int i = 0; i < n - 1; i++) {
//       for (int j = 0; j < n - i - 1; j++) {
//           if (arr[j] > arr[j + 1]) {
//               // Swap arr[j] and arr[j+1]
//               int temp = arr[j];
//               arr[j] = arr[j + 1];
//               arr[j + 1] = temp;
//           }
//       }
//   }
// }

// int main() {
//   std::vector<int> array = {454, 30, 42, 185, 177, 46, 253, 64, 130, 47, 111, 235, 368, 170, 132, 150, 200, 151, 306, 286, 183, 39, 365, 265, 155, 288, 466, 258, 103, 278, 406, 442, 418, 277, 57, 234, 201, 378, 359, 63, 239, 237, 81, 429, 283, 122, 464, 32, 272, 443, 304, 232, 256, 204, 336, 310, 260, 337, 436, 497, 461, 124, 476, 470, 449, 458, 257, 68, 231, 259, 137, 384, 323, 108, 178, 371, 455, 45, 7, 2, 73, 156, 479, 426, 222, 404, 95, 184, 22, 344, 202, 430, 145, 435, 316, 25, 41, 387, 451, 129, 52, 408, 163, 302, 1, 276, 14, 339, 101, 303, 462, 215, 279, 324, 186, 250, 182, 161, 77, 93, 11, 383, 248, 478, 179, 199, 28, 273, 181, 118, 496, 329, 490, 372, 62, 116, 141, 210, 226, 85, 236, 421, 56, 230, 440, 112, 452, 37, 433, 380, 460, 209, 308, 318, 441, 88, 55, 100, 3, 114, 459, 152, 405, 423, 341, 102, 284, 31, 12, 113, 499, 139, 362, 363, 121, 146, 415, 87, 140, 394, 187, 397, 290, 216, 473, 191, 285, 245, 229, 131, 386, 364, 98, 166, 54, 233, 189, 97, 489, 355, 89, 94, 10, 158, 390, 471, 314, 422, 60, 281, 128, 5, 165, 67, 427, 289, 350, 494, 457, 90, 269, 217, 414, 438, 391, 104, 228, 9, 134, 126, 358, 375, 162, 492, 349, 377, 498, 487, 472, 19, 195, 254, 312, 338, 280, 53, 160, 36, 270, 297, 243, 275, 481, 325, 40, 352, 263, 396, 24, 78, 379, 167, 71, 315, 8, 13, 294, 357, 220, 72, 437, 247, 483, 65, 107, 313, 413, 193, 322, 138, 38, 16, 218, 307, 69, 21, 261, 392, 482, 268, 346, 92, 251, 153, 395, 354, 119, 110, 416, 360, 401, 172, 291, 491, 242, 206, 295, 6, 80, 388, 311, 343, 50, 434, 293, 198, 214, 175, 66, 348, 174, 420, 106, 246, 445, 412, 402, 15, 319, 296, 82, 168, 367, 292, 4, 105, 148, 196, 403, 143, 159, 446, 447, 26, 468, 190, 117, 417, 70, 120, 444, 125, 91, 495, 266, 262, 133, 453, 300, 221, 428, 356, 385, 373, 115, 477, 374, 301, 227, 147, 474, 282, 370, 345, 271, 321, 425, 299, 328, 79, 35, 305, 219, 456, 249, 469, 264, 252, 86, 83, 480, 154, 287, 99, 389, 439, 326, 49, 34, 192, 109, 164, 330, 213, 369, 33, 74, 197, 320, 241, 317, 419, 475, 207, 149, 208, 173, 157, 331, 61, 188, 381, 20, 450, 376, 51, 169, 180, 333, 366, 347, 465, 400, 240, 238, 17, 407, 171, 424, 58, 485, 48, 342, 274, 298, 488, 463, 493, 448, 361, 23, 267, 486, 212, 332, 18, 75, 431, 205, 96, 351, 335, 399, 224, 255, 398, 59, 340, 353, 211, 484, 432, 123, 410, 29, 194, 244, 203, 467, 43, 135, 225, 334, 223, 176, 144, 76, 327, 411, 382, 142, 309, 127, 409, 84, 27, 136, 393, 44};
//   for (int num : array) {
//       std::cout << num << " ";
//   }
//   bubbleSort(array);
//   for (int num : array) {
//     std::cout << num << " ";
//   }
//   return 0;
// }
// `

// LinkedList(ListNode), LinkedListWithRandom(Node)
const pythonClasses = `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random
`