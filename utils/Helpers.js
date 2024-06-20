export function titleize(str) {
  const minorWords = [
    'and',
    'but',
    'for',
    'nor',
    'or',
    'so',
    'yet',
    'a',
    'an',
    'the',
    'to',
    'in',
    'on',
    'by',
    'of',
    'as',
    'at',
    'from',
    'up',
    'for',
    'with',
    'into',
    'onto',
    'upon',
    'over',
    'under',
  ]

  return str.toLowerCase().replace(/\b\w+/g, function (word, index) {
    if (
      index === 0 ||
      index === str.length - 1 ||
      !minorWords.includes(word) ||
      word.length > 3 ||
      (word === 'to' && str.split(' ')[index - 1] !== '-')
    ) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    } else {
      return word
    }
  })
}

export function replaceWithUnderline(inputString = '', replaceString) {
  try {
    const regex = new RegExp(replaceString, 'g')
    const replacedText = inputString.replace(regex, `<u>${replaceString}</u>`)
    return replacedText
  } catch (error) {
    return inputString
  }
}

export function replaceWithDoubleUnderline(inputString = '', replaceString) {
  try {
    const regex = new RegExp(replaceString, 'g')
    const replacedText = inputString.replace(regex, `<u class='.double-underline'>${replaceString}</u>`)
    return replacedText
  } catch (error) {
    return inputString
  }
}

export const views = {
  sort: 'sort',
  help: 'help',
  feedback: 'feedback',
  entities: 'entities',
  relationships: 'relationships',
}
export const toolBarScreens = ['relationships', 'entities', 'feedback', 'help']
