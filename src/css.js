import postcss from 'postcss'
import nested from 'postcss-nested'
import autoprefixer from 'autoprefixer'
import shortHash from 'short-hash'

const css = (() => {
  const post = postcss([ nested, autoprefixer ])
  const styles = {}
  const tasks = []
  function css(style) {
    const hash = '_' + shortHash(style)
    const completeStyle = `.${hash} {${style}}`
    tasks.push((async () => {
      const result = await post.process(completeStyle, { from: undefined })
      if(result.css) {
        styles[hash] = result.css
      }
      // TODO: error handling
      result.warnings().forEach(warn => console.warn(warn.toString()))
    })())
    return hash
  }
  css.styles = async () => {
    await tasks
    return Object.entries(styles).map(([_, v]) => v).join('\n')
  }
  return css
})()

export default css
