// Admirable try but the code seems to disappear
import hljs from 'highlight.js'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('javascript', javascript)

const marker = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'javascript'
      return hljs.highlight(code, { language }).value
    },
  }),
)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      marker: (msg) => marker.parse(msg),
    },
  }
})
