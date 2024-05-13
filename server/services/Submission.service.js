import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import EventEmitter from 'node:events'
import {
  getVars,
  runCommands,
  problemInitializer,
  makeMethodNameWithLanguage,
} from './helpers.js'

import SolveService from './Solve.service.ts'

import Problem from '../models/Problem.model'

import { problemSolutionMap, languages } from './code.js'

const currentLang = languages[5]

const eventEmitter = new EventEmitter()
const defaultScriptPath = '/tmp/scripts'
let scriptsDirectoryPath = defaultScriptPath
if (!fs.existsSync(scriptsDirectoryPath)) {
  fs.mkdirSync(scriptsDirectoryPath, { recursive: true })
  fs.mkdirSync(scriptsDirectoryPath + '/bin', { recursive: true })
  console.log(`Directory created: ${scriptsDirectoryPath}`)
}

export default class SubmissionService {
  constructor(e, body) {
    this.runResult = {
      ...this.body,
    }
    this.calls = []
    this.body = body
    this.language = body.language
    // this.language = currentLang
    // this.body.language = currentLang
    // this.body.body = problemSolutionMap[1][currentLang].code
    this.problem = null
    this.testCases = []
    this.isError = false
    this.executionCount = 0
    this.user = e.context.user
    this.totalExecutions = null
    this.solveService = new SolveService(e, body, this.language)
  }

  async setup() {
    try {
      this.problem = await Problem.findOne({ _id: this.body.problem })
      this.totalExecutions = this.problem.testCases.length
      this.functionName = makeMethodNameWithLanguage(
        this.language,
        this.problem.title
      )
      await this.createFunctionCalls()
    } catch (error) {
      logger.fatal({ error: error.message }, 'Setup Submission')
    }
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
        problem: this.body.problem,
        language: this.language,
        // language: currentLang,
        // body: problemSolutionMap[1][currentLang].code,
      })
      this.user.submissions.push(this.submission._id)
      this.runResult.submissionId = this.submission._id
    } catch (error) {
      logger.error({
        error: error.message,
        msg: 'New Submission creation failed',
      })
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
          let memoryUsedBytes = finalMemoryUsage - initialMemoryUsage
          if (memoryUsedBytes < 0) {
            memoryUsedBytes = Math.abs(memoryUsedBytes)
          }
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

  runTest(inputs, idx, callback) {
    try {
      const lang = this.language
      const [extension, filePath] = getVars(lang)
      const timestamp = Date.now()
      let fileName = `runner_${timestamp}-${idx}.${extension}`
      let scriptPath = path.join(
        scriptsDirectoryPath,
        // Info: Add idx to prevent multiple testCases using the same script/file/case
        fileName
      )
      let code = problemInitializer[lang](
        this.functionName,
        this.body.body,
        inputs,
        this.problem.signature,
        idx
      )

      if (lang === 'go') {
        scriptPath = path.join(scriptsDirectoryPath, `go-${timestamp}-${idx}`)
        fs.mkdirSync(scriptPath)
        scriptPath = path.join(scriptPath, `main.go`)
      }
      fs.writeFileSync(scriptPath, code)

      let command = `${runCommands[lang]} ${scriptPath}`
      if (lang === 'cplusplus') {
        command += ` -o ${filePath}`
        this.scriptRun(command)
        this.scriptRun(filePath, idx, callback)
      } else if (lang === 'java') {
        const binDir = path.join(defaultScriptPath, 'bin')
        fileName = path.join(defaultScriptPath, fileName)
        let compileCode = `javac -d ${binDir} ${fileName}`
        this.scriptRun(compileCode)
        let runCode = `java -cp /tmp/scripts/bin Solution${idx}`
        this.scriptRun(runCode, idx, callback)
      } else {
        this.scriptRun(command, idx, callback)
      }
    } catch (error) {
      logger.fatal({ error: error.message }, 'Running Tests')
    }
  }

  scriptRun(command, idx, callback) {
    exec(command, (error, stdout, _) => {
      if (error) {
        let msg = error.message.split('line')[1]
        const match = msg?.match(/\d+\n/)
        const index = match ? error.message.indexOf(match[0]) : -1
        msg = index !== -1 ? error.message.substring(index).trim() : ''
        logger.warn({ error: error.message }, 'Not all tests passed')
        this.buildTestResult(stdout.trim(), idx)
        eventEmitter.emit('error', msg)
      }
      if (callback) {
        // Msg key takes place of 2nd argument.
        logger.info({
          output: stdout.trim(),
          msg: 'Test Output',
        })
        this.buildTestResult(stdout.trim(), idx)
        callback(stdout.trim())
      }
    })
  }

  buildTestResult(stdout, idx) {
    try {
      let stdoutArray = JSON.parse(stdout)
      let outExpected = this.results[idx]
      // Some problems the order of the returned elements don't matter.
      // For example 1. twoSum
      if (true) {
        stdoutArray = stdoutArray.sort()
        outExpected = outExpected.sort()
      }
      const passing =
        JSON.stringify(stdoutArray) === JSON.stringify(outExpected)
      const testCase = {
        passing,
        outExpected,
        outActual: stdoutArray,
        input: this.inputs[idx],
      }
      this.testCases.push(testCase)
    } catch (error) {
      logger.fatal({ error: error.message }, 'Building test result')
    }
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

  async createFunctionCalls() {
    try {
      const specials = ['java', 'go']
      const calls = []
      const params = []
      const results = []

      this.problem.testCases.forEach((testCase) => {
        const input = testCase.get('input')
        const inputs = input?.map((input) => JSON.stringify(input))
        const inputs2 = input?.map((input) => input)
        if (specials.includes(this.language)) {
          calls.push(inputs)
        } else {
          calls.push(`${inputs.join(', ')}`)
        }
        params.push(inputs2)
        results.push(testCase.get('output'))
      })
      this.calls = calls
      this.results = results
      this.inputs = params
    } catch (error) {
      logger.fatal({ error: error.message }, 'Creating Functions Calls')
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

// class Solution:
//     def longestSubstringWithoutRepeatingCharacters(self, s: str) -> int:
//         ans, l, seen = 0, 0, set()
//         for r, c in enumerate(s):
//             while c in seen:
//                 seen.remove(s[l])
//                 l+=1
//             seen.add(c)
//             ans = max(ans, r - l + 1)
//         return ans
