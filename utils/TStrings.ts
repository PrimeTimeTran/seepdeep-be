export function makeQueryString(fields: Record<string, any>) {
  return Object.keys(fields)
    .filter((key) => fields[key] !== undefined)
    .map((key) => key + '=' + fields[key])
    .join('&')
}

export function makeApiQueryString(url: string, fields: Record<string, any>) {
  return `${url}&${makeQueryString(fields)}`
}

export const capitalize = (word: String) => {
  const firstLetter = word.charAt(0)
  const firstLetterCap = firstLetter.toUpperCase()
  const remainingLetters = word.slice(1)
  const capitalizedWord = firstLetterCap + remainingLetters
  return capitalizedWord
}

export function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export function formatMoney(price: string) {
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return USDollar.format(parseFloat(price))
}
