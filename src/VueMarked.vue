<script lang="ts">
import "./styles/github-markdown.css";

export default {
  name: "VueMarked",
};
</script>
<script lang="ts" setup>
import DOMPurify from "dompurify";
import { Marked, type MarkedExtension } from "marked";
import { computed, onUnmounted, ref, watch } from "vue";

import type { ColorScheme, PrefersColorScheme } from "./types";

type Props = {
  /** color schema: light, dark or auto, default to auto */
  colorScheme?: ColorScheme;
  /** Markdown content */
  markdown: string;
  /** If sanitize the output HTML to prevent XSS attach, default to true */
  sanitize?: boolean;
  /** marked option, @see https://marked.js.org/using_advanced#options */
  options?: MarkedExtension;
  /** marked extentions, @see https://marked.js.org/using_advanced#extensions */
  extentions?: Array<MarkedExtension>;
};
const props = withDefaults(defineProps<Props>(), {
  colorScheme: "auto",
  sanitize: true,
  options: () => ({}),
  extentions: () => [],
});

const marked = new Marked(props.options, ...props.extentions);

const html = ref("");
watch(
  () => props.markdown,
  async () => {
    const rawHTML = await marked.parse(props.markdown);
    if (props.sanitize) {
      html.value = DOMPurify.sanitize(rawHTML);
    } else {
      html.value = rawHTML;
    }
  },
  { immediate: true }
);

const perfersColorScheme = ref<PrefersColorScheme>("light");
const colorScheme = computed(() => {
  if (props.colorScheme === "auto") {
    return perfersColorScheme.value;
  } else {
    return props.colorScheme;
  }
});
const darkModeListener = (ev: MediaQueryListEvent) => {
  console.log(ev);
  perfersColorScheme.value = ev.matches ? "dark" : "light";
};
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
perfersColorScheme.value = darkModeQuery.matches ? "dark" : "light";
darkModeQuery.addEventListener("change", darkModeListener);
onUnmounted(() => {
  darkModeQuery.removeEventListener("change", darkModeListener);
});

defineExpose({
  marked: marked,
});
</script>

<template>
  <div v-html="html" :data-theme="colorScheme" class="v-marked"></div>
</template>

<style>
.v-marked {
  /* prevent katex styles from disrupting the layout */
  position: relative;
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
}
</style>
