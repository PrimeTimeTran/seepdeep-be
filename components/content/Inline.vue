<script setup>
// Custom plugin we made
// ~/plugins/marked.js
// Code disappears.
// const { $marker } = useNuxtApp();
// const props = defineProps(['value']);

// console.log({
//   gogog: $marker(props.value)
// })

// const renderedMarkdown = computed(() => {
//   return $marker(props.value);
// });

// Not inline
// import { getHighlighter } from 'shikiji'

// const shiki = await getHighlighter({
//   themes: ['nord'],
//   langs: ['javascript'],
// })

// // optionally, load themes and languages after creation
// await shiki.loadTheme('vitesse-light')
// await shiki.loadLanguage('javascript')

// const code = shiki.codeToHtml('const a = 1', { lang: 'javascript', theme: 'vitesse-light' })

// Todo: Syntax highlighting inline codeblock when you figure it out
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import hljs from 'highlight.js'
hljs.registerLanguage('javascript', javascript)

const props = defineProps(['value'])

const marker = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'javascript'
      return hljs.highlight(code, { language: language }).value
    },
  }),
)

// A lot of work for inline code but:
// - Removed backticks
// - Defines MDC component which is parsed before MDC parses it.
// - Removes <p> tags
// - Makes inline
// spent 6 hours deep diving...
const computedVal = computed(() => {
  const html = marker.parse(props.value)
  let str = html.replace(
    /<p>(.*?)<\/p>/g,
    '<code class="after:content-none before:content-none text-cyan-400 dark:text-cyan-400">$1</code>',
  )
  return str
})
</script>
<template>
  <span v-html="computedVal" />
</template>
