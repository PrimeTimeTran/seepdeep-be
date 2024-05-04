import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import EventEmitter from 'node:events'
import { getVars, runCommands } from './helpers.js'
import SolveService from './Solve.service.ts'
import data from './problems.json'

const eventEmitter = new EventEmitter()
const __dirname = '/Users/future/Documents/Work/seepdeep-be/server/services/'

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
    this.solveService = new SolveService(e, body, this.language)
    this.setup()
  }

  setup() {
    this.problem = data.data.find((problem) => problem.id === this.body.problem)
    this.totalExecutions = this.problem.testSuite.length
    this.functionName = toCamelCase(this.problem.title)
    this.createFunctionCalls()
  }

  async onNewSubmission() {
    // [x] Create submission instance
    // [x] Run & benchmark submission.
    // [x] Update user solves.
    // [x] Update solved problems if already existing, else create.
    // [x] Update user streak.
    // [ ] Update user language mastery.
    // [ ] Update problem stats
    try {
      this.benchmark()
      this.submission = await new Submission({
        ...this.body,
        user: this.user._id,
        language: this.language,
        problem: this.body.problem,
      })
      this.user.submissions.push(this.submission._id)
      this.runResult.submissionId = this.submission._id
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
    const onDone = async () => {
      await this.submission.save()
      await this.solveService.updateSolved(this.submission.problem.toString())
    }
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId)
        onDone()
        reject(new Error('Timeout'))
      }, 10000)

      const onFinishHandler = async (result) => {
        clearTimeout(timeoutId)
        logger.info('onComplete')
        this.submission.runResult = result
        onDone()
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
          onDone()
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




// class Solution:
//     def twoSum(self, nums, target):
//         store = {}
//         for idx, n in enumerate(nums):
//             remainder = target - n
//             if store.get(remainder) != None:
//                 return [store.get(remainder), idx]
//             store[n] = idx



// class Solution:
//     def twoSum(self, nums: List[int], target: int) -> List[int]:
//         store = {}
//         for idx, n in enumerate(nums):
//             remainder = target - n
//             if store.get(remainder) != None:
//                 return [store.get(remainder), idx]
//             store[n] = idx
            