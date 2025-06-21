import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
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
    this.language = body.lang
    this.problem = null
    this.testCases = []
    this.isError = false
    this.fileNames = []
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
      let fileName = `runner_${crypto.randomUUID()}-${idx}.${extension}`
      let scriptPath = path.join(scriptsDirectoryPath, fileName)
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
        // Todo: Fix race condition in testing environment
        const binDir = path.join(defaultScriptPath, 'bin')
        fileName = path.join(defaultScriptPath, fileName)
        // this.fileNames.push(fileName)
        let compileCode = `javac -d ${binDir} ${fileName}`
        this.scriptRun(compileCode)
        let runCode = `java -cp /tmp/scripts/bin Solution${idx}`
        // this.fileNames.push(`/tmp/scripts/bin/Solution${idx}.class`)
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
        logger.warn(
          { error: error.message, language: this.language },
          'Not all tests passed'
        )
        this.buildTestResult(stdout.trim(), idx, error.message)
        callback(stdout.trim())
        // eventEmitter.emit('error', msg)
      }
      if (callback) {
        this.buildTestResult(stdout.trim(), idx)
        callback(stdout.trim())
      }
    })
  }

  // Extract function to a "functions" service...?
  normalizeArray(arr) {
    return arr
      .map((inner) => [...inner].sort())
      .sort((a, b) => a.join('').localeCompare(b.join('')))
  }
  // Extract function to a "functions" service...?
  isArrayOfArrays(arr) {
    return Array.isArray(arr) && arr.every((inner) => Array.isArray(inner))
  }

  buildTestResult(stdout, idx, stackTrace) {
    try {
      let fixedStdout = stdout.trim()
      if (fixedStdout === 'True') fixedStdout = 'true'
      if (fixedStdout === 'False') fixedStdout = 'false'

      // Group Anagrams needs to be parsed.
      if (fixedStdout.startsWith("['") || fixedStdout.startsWith("[['")) {
        fixedStdout = fixedStdout.replace(/'/g, '"')
      }
      let stdoutArray

      // When a test case fails.
      if (fixedStdout === '') {
        stdoutArray = null
      } else {
        stdoutArray = JSON.parse(fixedStdout)
      }
      let outExpected = this.results[idx]
      let passing = JSON.stringify(stdoutArray) === JSON.stringify(outExpected)

      // When the test case is correct but the ordering isn't correct
      if (
        this.isArrayOfArrays(outExpected) &&
        this.isArrayOfArrays(stdoutArray)
      ) {
        const normalizedExpected = this.normalizeArray(outExpected)
        const normalizedActual = this.normalizeArray(stdoutArray)
        passing =
          JSON.stringify(normalizedExpected) ===
          JSON.stringify(normalizedActual)
      }
      const testCase = {
        stackTrace,
        passing,
        outExpected,
        outActual: stdoutArray,
        inputs: this.inputs[idx],
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
      // logger.info({ msg: this.fileNames, output: this.fileNames })
      // this.fileNames.forEach((fileName) => {
      //   fs.unlink(fileName, (err) => {
      //     if (err) {
      //       console.warn(`Failed to delete ${fileName}:`, err.message)
      //     } else {
      //       console.log(`Deleted: ${fileName}`)
      //     }
      //   })
      // })
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
        const input = testCase.get('inputs')
        const inputs = input
          ? Object.entries(input).map(([key, value]) => JSON.stringify(value))
          : []

        const inputs2 = input
          ? Object.fromEntries(
              Object.entries(input).map(([key, value]) => [key, String(value)])
            )
          : {}
        if (specials.includes(this.language)) {
          calls.push(inputs)
        } else {
          calls.push(`${inputs.join(', ')}`)
        }
        params.push(inputs2)
        let result = testCase.get('output')
        results.push(result)
      })
      this.calls = calls
      this.results = results
      this.inputs = params
    } catch (error) {
      logger.fatal({ error: error.message }, 'Creating Functions Calls')
    }
  }
}
