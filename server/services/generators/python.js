// /server/services/generators/python.js

/**
 * Python code generator for problems.
 * Expects:
 *  - functionName: string
 *  - codeBody: string (body of Solution class or function)
 *  - inputs: array of input values (as strings, e.g., '1', '[1,2,3]')
 *  - signature: object describing parameters and return type
 *    { parameters: [{name: 'x', type: 'int'}, ...], returnType: 'int' }
 *  - idx: optional index if multiple solutions exist (for class naming)
 */

export function python(functionName, codeBody, inputs, signature, idx = 0) {
  // Decide whether to wrap in Solution class
  let classWrapper = ''
  let callPrefix = ''
  if (codeBody.includes('class Solution')) {
    // rename class if multiple solutions
    const className = `Solution${idx}`
    codeBody = codeBody.replace(/class\s+Solution/, `class ${className}`)
    classWrapper = codeBody.trim()
    callPrefix = `solution = ${className}()\n`
  } else {
    classWrapper = codeBody.trim()
  }

  // Build function call
  let argList
  if (signature?.parameters) {
    // use the signature to pick inputs in order
    argList = signature.parameters
      .map((p, i) => {
        const val = inputs[i]
        // convert arrays/lists to Python syntax
        if (Array.isArray(val)) return JSON.stringify(val)
        return val
      })
      .join(', ')
  } else {
    // inputs might be a single value or an array
    if (Array.isArray(inputs)) {
      argList = inputs
        .map((val) => (Array.isArray(val) ? JSON.stringify(val) : val))
        .join(', ')
    } else {
      argList = inputs ?? '' // fallback to empty string
    }
  }

  const callLine = `result = ${
    callPrefix ? `solution.${functionName}` : functionName
  }(${argList})`

  // Final code
  return `
from collections import defaultdict, Counter
import heapq
from heapq import heappop, heappush
from typing import List, Optional

${classWrapper}

${callPrefix}${callLine}
print(result)
`.trim()
}
