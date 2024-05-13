import { toSnakeCase } from '../utils/helpers/strings'

const __dirname = '/Users/future/Documents/Work/seepdeep-be/server/services/'

export const runCommands = {
  python: 'python3',
  ruby: 'ruby',
  js: 'node',
  ts: 'npx ts-node',
  dart: 'dart',
  java: 'java',
  go: 'go',
  cplusplus: 'g++ -std=c++11',
}

export function getVars(language) {
  let fileExtension
  let executablePath = null
  switch (language) {
    case 'python':
      fileExtension = 'py'
      break
    case 'ruby':
      fileExtension = 'rb'
      break
    case 'js':
      fileExtension = 'js'
      break
    case 'ts':
      fileExtension = 'ts'
      break
    case 'dart':
      fileExtension = 'dart'
      break
    case 'java':
      fileExtension = 'java'
      break
    case 'go':
      fileExtension = 'go'
      break
    case 'cplusplus':
      fileExtension = 'cpp'
      executablePath = path.join(__dirname, './scripts/runner.cpp')
      break
    default:
      console.error(`Unsupported language: ${language}`)
      return
  }
  return [fileExtension, executablePath]
}

export const problemInitializer = {
  python: function (functionName, codeBody, inputs) {
    return `
    from typing import List
    ${codeBody}
    solution = Solution()
    result = solution.${functionName}(${inputs})
    print(result)`
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
  java: function (functionName, codeBody, inputs, signature, idx) {
    var args = []
    var testIdx = -1
    for (var input of signature.parameters) {
      testIdx += 1
      if (input.type === 'List[int]') {
        var str = inputs[testIdx]
        str = str.replace(/\[/g, '{')
        str = str.replace(/\]/g, '}')
        args.push(`new int[] ${str}`)
      } else {
        args.push(inputs[testIdx])
      }
    }
    const mainFunction = `public static void main(String[] args) {
      Solution${idx} solution = new Solution${idx}();
      System.out.println(Arrays.toString(solution.${functionName}(${args})));
    }`
    const javaCode = `
    import java.util.*;

    ${codeBody}
    `
    const classRegex = /class\s+Solution\s*{/
    const classStartIndex = javaCode.search(classRegex)
    const openingBraceIndex = javaCode.indexOf('{', classStartIndex)

    if (classStartIndex !== -1 && openingBraceIndex !== -1) {
      const beforeClass = javaCode.slice(0, classStartIndex)
      const classDefinition = javaCode.slice(
        classStartIndex,
        openingBraceIndex + 1
      )
      const modifiedClassDefinition = classDefinition.replace(
        /class\s+Solution/g,
        `class Solution${idx}`
      )
      const afterClass = javaCode.slice(openingBraceIndex + 1)

      const modifiedJavaCode = `${beforeClass}${modifiedClassDefinition}${mainFunction}\n${afterClass}`
      console.log(modifiedJavaCode)
      return modifiedJavaCode
    } else {
      console.log('Class definition not found in Java code.')
    }
  },
}

export function makeMethodNameWithLanguage(language, title) {
  switch (language) {
    case 'python':
      return toCamelCase(title)
    case 'ruby':
      return toSnakeCase(title)
    case 'js':
      return toCamelCase(title)
    case 'ts':
      return toCamelCase(title)
    case 'dart':
      return toCamelCase(title)
    case 'java':
      return toCamelCase(title)
    default:
      break
  }
}
