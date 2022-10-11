# Carousel

Turn HTML pages into keyboard-navigable slideshows. Designed to be used with [browserify](http://browserify.org/).

If jQuery is available, scroll transitions will be animated.

## Installation

```
npm install carousel --save
```

## Usage

First, check out the demo directory.

Create a simple script to use Carousel:

```js
// pre-browserify.js
var Carousel = require('carousel');
new Carousel('#slides');
```

Use browserify to bundle it up for the browser:

```sh
npm install browserify -g
browserify pre-browserify.js -o post-browserify.js
```

Then drop the browserified script into your HTML page and you're good to go.

```html
<script src="post-browserify.js"></script>

<ol id="slides">
  <li>a slide</li>
  <li>another slide</li>
  <li>keep on slidin'</li>
<ol>
```

## Demo

Visit [ba2.herokuapp.com](http://ba2.herokuapp.com) for a
working example of Carousel in action, then check out its [source on github](https://github.com/zeke/ba2#readme).

## Hacking

```
npm install grunt-cli -g
npm install
grunt
```