<script lang="ts" setup>
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";
import markedKatex from "marked-katex-extension";
import { ref } from "vue";

import "highlight.js/styles/github.min.css";
import "katex/dist/katex.min.css";

import defaultMD from "./default-markdown.ts";

const markdown = ref(defaultMD);
const extentions = [
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  markedKatex({
    throwOnError: false,
  }),
];
</script>

<template>
  <div class="h-screen w-full flex">
    <div class="flex flex-1 h-full p-2 overflow-auto border-r border-black">
      <VueMonacoEditor v-model:value="markdown" language="markdown" theme="vs-light" />
    </div>
    <div class="flex-1 h-full p-2 overflow-auto">
      <VueMarked
        :markdown="markdown"
        sanitize
        color-scheme="auto"
        :extentions="extentions"
      />
    </div>
  </div>
</template>
