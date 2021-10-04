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
    ['script', `console.log('yoyo!!')`],
  ],
]

export default App
