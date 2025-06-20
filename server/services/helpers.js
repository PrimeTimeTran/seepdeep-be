import {
  replaceBrackets,
  toCamelCase,
  toSnakeCase,
} from '../utils/helpers/strings'

export const runCommands = {
  python: 'python3',
  ruby: 'ruby',
  js: 'node',
  ts: 'npx ts-node',
  dart: 'dart',
  java: 'java',
  go: '/usr/local/go/bin/go run',
  cplusplus: 'g++ -std=c++11',
}

export function getVars(language) {
  let extension
  let executablePath = null
  switch (language) {
    case 'python':
      extension = 'py'
      break
    case 'ruby':
      extension = 'rb'
      break
    case 'js':
      extension = 'js'
      break
    case 'ts':
      extension = 'ts'
      break
    case 'dart':
      extension = 'dart'
      break
    case 'java':
      extension = 'java'
      break
    case 'go':
      extension = 'go'
      break
    case 'cplusplus':
      extension = 'cpp'
    default:
      console.error(`Unsupported language: ${language}`)
      return
  }
  return [extension, executablePath]
}

const languageSpecificType = {
  go: {
    str: 'string',
    'List[int]': '[]int',
    'List[str]': '[]string',
    'List[List[int]]': '[][]int',
    'List[List[str]]': '[][]string',
  },
  java: {
    str: 'String',
    'List[int]': 'new int[]',
    'List[str]': 'new String[]',
    'List[List[int]]': 'new int[][]',
    'List[List[str]]': 'new String[][]',
  },
}

const parseTypes = [
  'str',
  'List[int]',
  'List[str]',
  'List[List[int]]',
  'List[List[str]]',
]

export const problemInitializer = {
  python: function (functionName, codeBody, inputs) {
    const code = `
from collections import defaultdict, Counter
import heapq
from typing import List\n${codeBody}\n

solution = Solution()\n
result = solution.${functionName}(${inputs})\n
print(result)`
    return code
  },
  ruby: function (functionName, codeBody, inputs) {
    return `
    ${codeBody}
    result = ${functionName}(${inputs})
    print(result)`
  },
  js: function (functionName, codeBody, inputs) {
    return `
    ${codeBody}
    const result = ${functionName}(${inputs})
    console.log(result)`
  },
  ts: function (functionName, codeBody, inputs) {
    return `
    ${codeBody}
    const result = ${functionName}(${inputs})
    console.log(result)`
  },
  dart: function (functionName, codeBody, inputs) {
    return `
    ${codeBody}
    void main() {
      final solution = Solution();
      final result = solution.${functionName}(${inputs});
      print(result);
    }`
  },
  go: function (functionName, codeBody, inputs, signature, idx) {
    let args = []
    let testIdx = -1
    for (let input of signature.parameters) {
      testIdx += 1
      if (parseTypes.includes(input.type)) {
        args.push(
          `${languageSpecificType.go[input.type]} ${replaceBrackets(
            inputs[testIdx]
          )}`
        )
      } else {
        args.push(inputs[testIdx])
      }
      // if (input.type === 'List[int]') {
      //   args.push(`[]int ${str}`)
      // } else if (input.type === 'List[str]') {
      //   args.push(`[]string ${str}`)
      // } else if (input.type === 'List[List[str]') {
      //   args.push(`[][]string ${str}`)
      // } else if (input.type === 'List[List[int]') {
      //   args.push(`[][]int ${str}`)
      // } else {
      //   args.push(inputs[testIdx])
      // }
    }
    return `
    package main
    import (
      "fmt"
      "strings"
      "strconv"
    )
    ${codeBody}
    func main() {
      result := ${functionName}(${args})
      var strResult []string
      for _, num := range result {
          strResult = append(strResult, strconv.Itoa(num))
      }
      output := fmt.Sprintf("[%s]", strings.Join(strResult, ","))
      fmt.Println(output)
    }`
  },
  java: function (functionName, codeBody, inputs, signature, idx) {
    let args = []
    let testIdx = -1
    for (let input of signature.parameters) {
      testIdx += 1
      if (parseTypes.includes(input.type)) {
        args.push(
          `${languageSpecificType.java[input.type]} ${replaceBrackets(
            inputs[testIdx]
          )}`
        )
      } else {
        args.push(inputs[testIdx])
      }
      // var str = replaceBrackets(inputs[testIdx])
      // if (input.type === 'List[int]') {
      //   args.push(`new int[] ${str}`)
      // } else if (input.type === 'List[str]') {
      //   args.push(`new String[] ${str}`)
      // } else if (input.type === 'List[List[int]') {
      //   args.push(`new int[][] ${str}`)
      // } else if (input.type === 'List[List[str]') {
      //   args.push(`new String[][] ${str}`)
      // } else {
      //   args.push(inputs[testIdx])
      // }
    }
    const mainFunction = `public static void main(String[] args) {
      Solution${idx} solution = new Solution${idx}();
      System.out.println(Arrays.toString(solution.${functionName}(${args})));
    }`
    let code = `
    import java.util.*;
    ${codeBody}
    `
    const classRegex = /class\s+Solution\s*{/
    const classStartIndex = code.search(classRegex)
    const openingBraceIndex = code.indexOf('{', classStartIndex)

    if (classStartIndex !== -1 && openingBraceIndex !== -1) {
      const beforeClass = code.slice(0, classStartIndex)
      const classDefinition = code.slice(classStartIndex, openingBraceIndex + 1)
      const modifiedClassDefinition = classDefinition.replace(
        /class\s+Solution/g,
        `class Solution${idx}`
      )
      const afterClass = code.slice(openingBraceIndex + 1)

      code = `${beforeClass}${modifiedClassDefinition}${mainFunction}\n${afterClass}`
      return code
    } else {
      console.log('Class definition not found in Java code.')
    }
  },
}

export function makeMethodNameWithLanguage(language, title) {
  switch (language) {
    case 'ruby':
      return toSnakeCase(title)
    case 'python':
    case 'js':
    case 'ts':
    case 'dart':
    case 'java':
    case 'go':
      return toCamelCase(title)
    default:
      console.error(`Unsupported language: ${language}`)
      break
  }
}
