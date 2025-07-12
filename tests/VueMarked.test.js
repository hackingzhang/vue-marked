import { mount } from "@vue/test-utils";
import markedKatex from "marked-katex-extension";
import { describe, expect, test } from "vitest";

import VueMarked from "../src/VueMarked.vue";
import mdContent from "../playground/default-markdown.ts";

/**
 * Wait in milliseconds
 * @param {number} milliseconds
 * @returns {Promise}
 */
function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

describe("VueMarked.vue", () => {
  test("Should render empty content", () => {
    const wrapper = mount(VueMarked, {
      props: {
        markdown: "",
      },
    });

    expect(wrapper.text().length).toBe(0);
  });

  test("Should render markdown content", async () => {
    const wrapper = mount(VueMarked, {
      props: {
        markdown: mdContent,
      },
    });

    await sleep(100);
    expect(wrapper.html()).matchSnapshot();
  });

  test("Should sanitize output HTML by default", async () => {
    const wrapper = mount(VueMarked, {
      props: {
        markdown:
          "<p>paragraph will exist</p>\n<script>console.log('script tag will be sanitized')</script>",
      },
    });

    await sleep(100);
    const resultWrapper = wrapper.find("script");
    expect(resultWrapper.exists()).toBe(false);
  });

  test("Should NOT sanitize output HTML if specified", async () => {
    const wrapper = mount(VueMarked, {
      props: {
        markdown:
          "<p>paragraph will exist</p>\n<script>console.log('script tag will be sanitized')</script>",
        sanitize: false,
      },
    });

    await sleep(100);
    const resultWrapper = wrapper.get("script");
    expect(resultWrapper.exists()).toBe(true);
  });

  test("options prop should work", async () => {
    const wrapper = mount(VueMarked, {
      props: {
        markdown: "line1\nline2",
        options: {
          breaks: true,
        },
      },
    });

    await sleep(0);
    const resultWrapper = wrapper.get("br");
    expect(resultWrapper.exists()).toBe(true);
  });

  test("extentions prop should work", async () => {
    const wrapper = mount(VueMarked, {
      props: {
        markdown: `Inline: $E=mc^2$

Block:
$$
c = \\pm\\sqrt{a^2 + b^2}
$$`,
        extentions: [
          markedKatex({
            throwOnError: false,
          }),
        ],
      },
    });

    await sleep(0);
    expect(wrapper.html()).matchSnapshot();
  });

  test("colorScheme prop should work", () => {
    const wrapper = mount(VueMarked, {
      props: {
        markdown: "",
        colorScheme: "dark",
      },
    });

    expect(wrapper.attributes()["data-theme"]).toBe("dark");
  });
});
