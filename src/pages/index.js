import Template from '../components/Template.js'
import MyForm from '../components/MyForm.js'
import Counter from '../components/Counter.js'

const App = (_, { posts }) => [
  Template, [
    ['h1', 'Hello world!'],
    MyForm,
    [Counter, { count: 10 }],
    ['div', {
      onload: function(e, el) {
        setTimeout(function() {
          const { now } = libs
          el.innerHTML = now()
        }, 2000)
      },
    }, 'some content...'],
    'kk',
    Counter,
    ['div', posts.map(post => ['a', {
      href: post.url,
    }, post.title])],
    ['br'],
    ['a', {
      href: 'https://github.com/curist/curist.github.io',
      style: 'display:flex;align-content:center'
    }, [
      ['img', {
        src: 'https://github.com/favicon.ico',
        alt: 'github logo',
      }],
      ['span', {style: 'margin-left: 10px'}, 'this repo'],
    ]],
    ['script', `console.log('yoyo!!')`],
  ],
]

export default App
