import shortHash from 'short-hash'

const css = (() => {
  // TODO: postcss, autoprefixer
  const styles = {}
  function css(style) {
    const hash = '_' + shortHash(style)
    styles[hash] = style
    return hash
  }
  css.styles = () => styles
  return css
})()

export default css
