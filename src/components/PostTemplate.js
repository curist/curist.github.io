const PostTemplate = ({
  title = 'a post',
  frontMatters = {},
  children,
}) => ['html', [
  ['head', [
    ['meta', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    }],
    ['link', {
      rel: 'icon',
      href: '/favicon.ico',
    }],
    ['link', {
      rel: 'stylesheet',
      // href: 'https://unpkg.com/sakura.css/css/sakura.css',
      href: 'https://newcss.net/lite.css',
    }],
    ['title', frontMatters.title || title],
  ]],
  ['body', [
    ...children,
  ]],
]]

export default PostTemplate

