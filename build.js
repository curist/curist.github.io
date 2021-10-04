import shelljs from 'shelljs'
import { writeFileSync, readFileSync } from 'fs'
import { build as esbuild } from 'esbuild'
import { join } from 'path'
import globLib from 'glob'
import basename from 'basename'
import markup from './markup.js'
import css from './src/css.js'

const { rm, mkdir, cp } = shelljs
const { sync: glob } = globLib

// ========== prebuild ==========
await esbuild({
  entryPoints: ['src/browser.js'],
  outfile: 'dist/files/libs.js',
  bundle: true,
  minify: true,
})
rm('-rf', 'public')
mkdir('-p', 'public')

// ========== build markdown posts ==========
let frontMatters = {}
import markdown from 'markdown-it'
import markdownFrontmatter from 'markdown-it-front-matter'
const md = markdown()
  .use(markdownFrontmatter, fm => {
    frontMatters = fm.split('\n').reduce((acc, fm) => {
      const [ key, value ] = fm.split(': ')
      acc[key] = value
      return acc
    }, {})
  })

const postPaths = glob('./src/posts/**/*.md')
const posts = []
import PostTemplate from './src/components/PostTemplate.js'
mkdir('-p', 'public/posts')
for(let post of postPaths) {
  const body = md.render(readFileSync(post, 'utf-8'))
  if(!frontMatters.createdAt) {
    console.log('bad post: ' + post)
    continue
  }
  const content = markup([PostTemplate, { frontMatters }, [ body ]])
  const postFileName = frontMatters.url || basename(post)
  const url = join('posts', frontMatters.createdAt, postFileName)
  const outputPath = join('public', url)
  mkdir('-p', outputPath)
  const outputFilePath = `${outputPath}/index.html`
  writeFileSync(outputFilePath, content)
  posts.push({
    title: frontMatters.title,
    createdAt: frontMatters.createdAt,
    postFileName,
    url,
  })
}


// ========== build pages ==========
const pages = glob('./src/pages/**/*.js')

for(let page of pages) {
  const [ fullPath ] = page.replace('./src/pages/', '').split('.')
  const [ fileName ] = fullPath.split('/').slice(-1)
  const partialPath = fullPath.split('/').slice(0, -1).join('/')

  const outputPath = fileName === 'index'
    ? partialPath
    : join(partialPath, fileName)

  if(outputPath) {
    mkdir('-p', join('public', outputPath))
  }

  const outputFilePath = join(
    'public', partialPath,
    fileName === 'index' ? '' : fileName,
    'index.html'
  )

  const Page = await import(page)
  writeFileSync(outputFilePath, markup(Page.default, 0, { posts }))
}

// ========== write css ==========
const extractedStyles = Object.entries(css.styles()).map(([k, v]) => {
  return `.${k} {${v}}`
}).join('\n')
writeFileSync('public/styles.css', extractedStyles)

// ========== postbuild ==========
cp('-r', 'dist/files/*', 'public')
cp('-r', 'assets/*', 'public')
rm('-rf', 'dist')
