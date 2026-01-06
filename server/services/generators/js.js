export function js(functionName, codeBody, inputs) {
  return `
${codeBody}

const result = ${functionName}(${inputs})
console.log(result)
`
}
