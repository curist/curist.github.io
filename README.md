`markup.js` is the lib.

`build.js` build `src/pages/*.js` as pages.

everything under `assets/` will be copied to `public/`. 

JS libraries should be exported in `src/browser.js`, and can be accessed as `libs.*` in browser.

CSS is extracted using `src/css.js` helper, and processed using `PostCSS`.

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

Or if you prefer...
```typescript
type Tag = string | ((...args: any) => Markup)

type Attrs = Record<string, boolean | string | number | Function>

type Children = (Markup | string | number)[]

type Markup =
  | [Tag, Attrs, Children]
  | [Tag, Attrs]
  | [Tag, Children]
  | [Tag]
```

## attrs

`attrs` can have normal [Element.attributes](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes), only that the event callback functions will always have the signature as `(event, element) => any`, and the `onload` event which is normally only available on selected few tags, can also be used for tags like `div`.

