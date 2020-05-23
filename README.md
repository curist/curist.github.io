`markup.js` is the lib.

`build.js` build `src/pages/*.js` as pages.

everything under `assets/` will be copied to `public/`. 

styles are in [linaria](https://github.com/callstack/linaria), and will be collected as `/styles.css` by `webpack`.

JS libraries should be exported in `src/browser.js`, and can be accessed as `libs.*` in browser.

# The markup

Markups are in the form of either one of the expressions below
```js
[ tagName ]
[ tagName, attrs ]
[ tagName, attrs ]
[ tagName, attrs, children ]
```
`tagName` is a `string` or `function` returning a `markup`.

`attrs` is an object.

`children` should be an array, containing zero or more`markup`s. 

