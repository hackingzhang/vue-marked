# vue-marked

A markdown render component for Vue3, build with [marked](https://github.com/markedjs/marked) and [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)

## Installation

```bash
# npm
npm i @hackingzhang/vue-marked
# or pnpm
pnpm add @hackingzhang/vue-marked
# or yarn
yarn add @hackingzhang/vue-marked
```

## Usage

### Global Registration

In your main.js

```js
import { createApp } from "vue";
import { install as VueMarkedPlugin } from "@hackingzhang/vue-marked";

// import stylesheet
import "@hackingzhang/vue-marked/lib/vue-marked.css";

import App from "./App.vue";

const app = createApp(App);
app.use(VueMarkedPlugin);
app.count("#app");
```

App.vue

```vue
<script setup>
import { ref } from "vue";

const markdown = ref("# markdown content");
</script>
<template>
  <vue-marked :markdown="markdown" />
</template>
```

### Local Registration

```vue
<script setup>
import { ref } from "vue";
import { VueMarked } from "@hackingzhang/vue-marked";

// import stylesheet
import "@hackingzhang/vue-marked/lib/vue-marked.css";

const markdown = ref("# markdown content");
</script>
<template>
  <vue-marked :markdown="markdown" />
</template>
```

## Props

| Name        | Type                          | Default  | Description                                                                                                    |
| ----------- | ----------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| markdown    | `string`                      |          | makdown to render                                                                                              |
| sanitize    | `boolean`                     | `true`   | whether to sanitize the output HTML. [DOMPurify](https://github.com/cure53/DOMPurify) is used for sanitization |
| options     | `object`                      |          | marked options, see https://marked.js.org/using_advanced#options                                               |
| extentions  | `Array`                       |          | marked extentions, see https://marked.js.org/using_advanced#extensions                                         |
| colorScheme | `"dark" \| "light" \| "auto"` | `"auto"` | theme for github-markdown-css                                                                                  |

## Examples

### Render Katex

Install `katex` and `marked-katex-extension` first

```bash
# npm
npm install katex marked-katex-extension
# or pnpm
pnpm add katex marked-katex-extension
# or yarn
yarn add katex marked-katex-extension
```

Then, in your Vue component

```vue
<script setup>
import { VueMarked } from "@hackingzhang/vue-marked";
import markedKatex from "marked-katex-extension";
import { ref } from "vue";

import "@hackingzhang/vue-marked/lib/vue-marked.css";
// import katex stylesheet
import "katex/dist/katex.min.css";

const markdown = ref("# markdown content");
const extentions = [
  markedKatex({
    throwOnError: false,
  }),
];
</script>
<template>
  <vue-marked :markdown="markdown" :extentions="extentions" />
</template>
```

### Code Highlight

Install `highlight.js` and `marked-highlight` first

```bash
# npm
npm install highlight.js marked-highlight
# or pnpm
pnpm add highlight.js marked-highlight
# or yarn
yarn add highlight.js marked-highlight
```

Then, in your Vue component

```vue
<script setup>
import { VueMarked } from "@hackingzhang/vue-marked";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";
import { ref } from "vue";

import "@hackingzhang/vue-marked/lib/vue-marked.css";
// import highlight.js stylesheet
import "highlight.js/styles/github.min.css";

const markdown = ref("# markdown content");
const extentions = [
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
];
</script>
<template>
  <vue-marked :markdown="markdown" :extentions="extentions" />
</template>
```
