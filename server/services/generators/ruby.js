export function ruby(functionName, codeBody, inputs) {
  // inputs is an array like ['1', '2'] or ['[1,2,3]']
  const formattedInputs = Array.isArray(inputs) ? inputs.join(', ') : inputs

  return `
${codeBody}

# Call the function with the given inputs
result = ${functionName}(${formattedInputs})

# Print the result
puts result
`
}
