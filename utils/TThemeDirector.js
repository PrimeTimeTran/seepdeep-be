import _ from 'lodash'
import { useDark, useToggle } from '@vueuse/core'

let isDark = useDark()

function configTheme() {
  const htmlElement = document.querySelector('html')
  let newTheme = 'light'
  if (isDark.value) {
    newTheme = 'dark'
  }
  htmlElement.setAttribute('data-theme', newTheme)
}

if (process.browser) {
  configTheme()
}

function daisyThemeToggle() {
  const htmlElement = document.querySelector('html')
  let theme = htmlElement.getAttribute('data-theme')
  let newTheme = 'light'
  if (theme === 'light') {
    newTheme = 'dark'
  } else if (theme === 'dark') {
    newTheme = 'light'
  }
  htmlElement.setAttribute('data-theme', newTheme)
}

export function toggleTheme() {
  isDark = useDark()
  const toggleDark = useToggle(isDark)
  daisyThemeToggle()
  toggleDark()
}

export function setTheme(val) {
  const htmlElement = document.querySelector('html')
  htmlElement.setAttribute('data-theme', val)
}
let themes = []
export function sampleTheme() {
  let theme = _.sample(TApp.themes)
  const htmlElement = document.querySelector('html')
  themes.push(theme)
  htmlElement.setAttribute('data-theme', theme)
  let items = document.querySelectorAll('.brandName')
  items.forEach((item) => {
    item.innerHTML = theme
  })
}
