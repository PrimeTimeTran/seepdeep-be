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

  testSubmission(language, content) {
    try {
      this.runResult.language = language
      const [fileExtension, executablePath] = getVars(language)
      const scriptPath = path.join(__dirname, `./scripts/runner.${fileExtension}`)
      fs.writeFileSync(scriptPath, content)
      if (language === 'cplusplus') {
        const compileCommand = `${languageCommands[language]} ${scriptPath} -o ${executablePath}`
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
        exec(`${command} ${scriptPath}`, (error, stdout, stderr) => {
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
    this.runResult.result = result;
    this.runResult.endTime = Date.now();
    this.runResult.duration = this.runResult.endTime - this.runResult.startTime;
    const timeTakenInMilliseconds = this.runResult.endTime - this.runResult.startTime;
    this.runResult.runTime = timeTakenInMilliseconds / 1000;

    console.log({...this.runResult});
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

function measureMemoryUsage(fn) {
  const initialMemoryUsage = process.memoryUsage().heapUsed;
  
  // Call the function
  fn();
  
  const finalMemoryUsage = process.memoryUsage().heapUsed;
  const memoryUsed = finalMemoryUsage - initialMemoryUsage;
  
  console.log(`Memory used by function call: ${memoryUsed} bytes`);
}

function myFunction1() {
  const runner1 = new Runner();
  runner1.testSubmission('python', input1P)
  
}
function myFunction2() {
  const runner2 = new Runner();
  runner2.testSubmission('javascript', input1J)

  
}
function myFunction3() {
  const runner3 = new Runner();
  runner3.testSubmission('cplusplus', input1C)
  
}

measureMemoryUsage(myFunction1);
measureMemoryUsage(myFunction2);
measureMemoryUsage(myFunction3);
