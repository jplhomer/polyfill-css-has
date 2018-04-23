# CSS :has() Polyfill

This polyfill allows you to query elements using the [CSS `:has()` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) which has not been implemented in any browsers yet.

## Installation

```sh
$ yarn add polyfill-css-has
```

Then, in your JavaScript:

```js
import querySelectorAllWithHas from 'polyfill-css-has';

// Get all paragraphs in the container which have links
var items = querySelectorAllWithHas('.container > p:has(> a)');

// Optionally, pass an element to query against:
var container = document.querySelector('.container');
var items = querySelectorAllWithHas('.container > p:has(> a)', container);
```

## How it works

The Polyfill works by splitting up your selector into two chunks:

1.  The scope which is to be queried for elements with `:has()` requirements
1.  The specific selector inside the `:has()` class

Each of the scope-level elements are then filtered by the `:has()` selector and returned in an array.

## Limitations

* Does not support additional chained pseudo-classes like `:nth-child()` or `:empty()`
* Does not support more than one `:has()` element in the selector

## Development

To develop locally, ensure you have Node.js > v8.6.0 installed, and run:

```sh
yarn
```

To build a development version of the polyfill, run:

```sh
yarn dev
```

To build a production version of the polyfill, run:

```sh
yarn build
```

## Testing

To run tests with Jest:

```sh
yarn test

# Watch for changes with Git:
yarn test --watch
```
