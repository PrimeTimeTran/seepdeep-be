function parseGoInput(val, type) {
  // If it's a string but the signature says array, parse it
  if (
    typeof val === 'string' &&
    (type.startsWith('[]') || type.startsWith('[['))
  ) {
    return JSON.parse(val)
  }
  // Otherwise return as-is
  return val
}

function serializeGoValue(val) {
  if (Array.isArray(val)) {
    const isNested = val.some((v) => Array.isArray(v))
    if (isNested) {
      return `[][]int{${val.map((row) => `{${row.join(',')}}`).join(',')}}`
    } else {
      return `[]int{${val.join(',')}}`
    }
  } else if (typeof val === 'number') {
    return val.toString()
  } else if (typeof val === 'string') {
    if (/^\d+$/.test(val)) return val
    return `"${val}"`
  } else {
    throw new Error('Unsupported input type for Go generator')
  }
}

export function go(functionName, codeBody, inputs, signature, idx) {
  let args = []

  if (signature?.parameters?.length) {
    for (let i = 0; i < signature.parameters.length; i++) {
      const paramType = signature.parameters[i].type
      const parsed = parseGoInput(inputs[i], paramType)
      args.push(serializeGoValue(parsed))
    }
  } else if (inputs) {
    args.push(serializeGoValue(inputs))
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
  result := ${functionName}(${args.join(', ')})

  // Handle single int vs slice of ints vs slice of slice of ints
  switch v := interface{}(result).(type) {
  case int:
      fmt.Println(v)
  case []int:
      var strResult []string
      for _, num := range v {
          strResult = append(strResult, strconv.Itoa(num))
      }
      fmt.Println("[" + strings.Join(strResult, ",") + "]")
  case [][]int:
      var rows []string
      for _, row := range v {
          var strRow []string
          for _, num := range row {
              strRow = append(strRow, strconv.Itoa(num))
          }
          rows = append(rows, "[" + strings.Join(strRow, ",") + "]")
      }
      fmt.Println("[" + strings.Join(rows, ",") + "]")
  default:
      fmt.Println(result)
  }
}`
}
