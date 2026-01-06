export function java(functionName, codeBody, inputs, signature, idx) {
  let args = []

  for (let i = 0; i < signature.parameters.length; i++) {
    const inputType = signature.parameters[i].type
    const rawInput = inputs[i]

    if (inputType === 'List[int]' || inputType === 'int[]') {
      const values = rawInput.replace(/^\[|\]$/g, '')
      args.push(`new int[]{${values}}`)
    } else if (inputType === 'List[str]' || inputType === 'String[]') {
      const values = rawInput
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map((s) => `"${s.trim().replace(/^"|"$/g, '')}"`)
        .join(', ')
      args.push(`new String[]{${values}}`)
    } else {
      args.push(rawInput)
    }
  }

  const resultCall = `solution.${functionName}(${args.join(', ')})`

  const returnType = signature.returnType
  const isArrayReturn =
    returnType === 'List[int]' ||
    returnType === 'int[]' ||
    returnType.endsWith('[]')

  const printStatement = isArrayReturn
    ? `System.out.println(Arrays.toString(${resultCall}));`
    : `System.out.println(${resultCall});`

  const mainFunction = `
  public static void main(String[] args) {
    Solution${idx} solution = new Solution${idx}();
    ${printStatement}
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
    console.warn('Class definition not found in Java code.')
    return code
  }
}
