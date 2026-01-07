export function python(functionName, codeBody, inputs, _signature, idx = 0) {
  let classWrapper = codeBody.trim()
  let callPrefix = ''

  if (codeBody.includes('class Solution')) {
    const className = `Solution${idx}`
    classWrapper = codeBody
      .replace(/class\s+Solution/, `class ${className}`)
      .trim()
    callPrefix = `solution = ${className}()\n`
  }

  return `
from collections import defaultdict, Counter
import heapq
from heapq import heappop, heappush
from typing import List, Optional

${classWrapper}

${callPrefix}result = solution.${functionName}(${inputs})
print(result)
`.trim()
}
