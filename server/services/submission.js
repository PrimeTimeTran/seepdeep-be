import fs from 'fs'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { getVars, languageCommands } from './helpers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

process.chdir(__dirname)

class Runner {
  constructor() {
    this.runResult = {
      startTime: Date.now(),
    }
  }

  testSubmission(language, scriptContent) {
    try {
      this.runResult.language = language
      const [fileExtension, compileCommand, executablePath] = getVars(language)
      const scriptFilePath = path.join(__dirname, `example.${fileExtension}`)
      fs.writeFileSync(scriptFilePath, scriptContent)

      if (language === 'cplusplus') {
        const compileCommand = `${languageCommands[language]} ${scriptFilePath} -o ${executablePath}`
        exec(compileCommand, (compileError) => {
          if (compileError) {
            console.error(`Error compiling C++ code: ${compileError.message}`)
            return
          }
          exec(executablePath, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error running C++ executable: ${error.message}`)
              return
            }
            this.buildResult(stdout.trim())
          })
        })
      } else {
        const command = languageCommands[language]
        exec(`${command} ${scriptFilePath}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error running script: ${error.message}`)
            return
          }
          this.buildResult(stdout.trim())
        })
      }
    } catch (error) {
      console.log({ error })
    }
  }

  buildResult(result) {
    this.runResult.result = result
    this.runResult.endTime = Date.now()
    this.runResult.duration = this.runResult.endTime - this.runResult.startTime
    console.log({...this.runResult})
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
const runner1 = new Runner();
runner1.testSubmission('python', input1P)
const runner2 = new Runner();
runner2.testSubmission('javascript', input1J)
const runner3 = new Runner();
runner3.testSubmission('cplusplus', input1C)
