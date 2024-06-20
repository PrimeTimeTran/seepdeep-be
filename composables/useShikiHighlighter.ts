import { getHighlighter, type Highlighter, renderToHtml } from 'shiki-es'

const highlighter = ref<Highlighter | null>(null)

export const useShikiHighlighter = () => {
  if (highlighter.value === null) {
    getHighlighter({
      theme: 'dark-plus',
      themes: ['dark-plus'],
      langs: ['dart', 'css', 'scss', 'js', 'ts', 'diff', 'vue', 'html', 'json', 'sh', 'bash'],
    }).then((_highlighter) => {
      highlighter.value = _highlighter
    })
  }

  return { highlighter, renderToHtml }
}
