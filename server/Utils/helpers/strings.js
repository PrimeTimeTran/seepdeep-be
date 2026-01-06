export function toCamelCase(string) {
  string = string.replace(/^\d+\.\s*/, '')

  let cleanedString = string.replace(/[-.0-9]/g, function (match) {
    return replaceDigitsWithWords(match)
  })

  if (cleanedString !== string) {
    return cleanedString
  }

  let parts = cleanedString.split(/[_\s]/)

  let capitalizedParts = parts.map(function (part) {
    if (part.length > 0) {
      if (/^[A-Z]+$/.test(part)) {
        return part
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    } else {
      return ''
    }
  })

  let camelCaseString = capitalizedParts.join('')

  if (/^[A-Za-z]/.test(string)) {
    camelCaseString =
      camelCaseString.charAt(0).toLowerCase() + camelCaseString.slice(1)
  }

  return camelCaseString
}

export function toSnakeCase(str) {
  return (
    str
      // insert _ before uppercase letters preceded by lowercase letters or numbers
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      // insert _ before sequences of uppercase letters followed by lowercase (for all caps acronyms)
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
      .replace(/[\s\-]+/g, '_') // spaces and dashes to _
      .toLowerCase()
  )
}

function replaceDigitsWithWords(input) {
  let digitWords = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
  }

  return input.replace(/\d/g, function (match) {
    return digitWords[match]
  })
}

export function replaceBrackets(str) {
  str = str.replace(/\[/g, '{')
  str = str.replace(/\]/g, '}')
  return str
}
