import { createHighlighter } from "@tanstack/highlight/core";
import { css } from "@tanstack/highlight/languages/css";
import { html } from "@tanstack/highlight/languages/html";
import { js } from "@tanstack/highlight/languages/js";
import { jsx } from "@tanstack/highlight/languages/jsx";
import { plaintext } from "@tanstack/highlight/languages/plaintext";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";
import { createTanStackMarkdownHighlighter } from "@tanstack/highlight/markdown";
import { createThemeCss } from "@tanstack/highlight/theme";
import { githubDarkTheme } from "@tanstack/highlight/themes/github-dark";
import { githubLightTheme } from "@tanstack/highlight/themes/github-light";
import type { CodeHighlighter } from "@tanstack/markdown";

const highlighter = createHighlighter({
  languages: [plaintext, css, html, js, jsx, ts, tsx],
});

export const highlightMarkdownCode: CodeHighlighter =
  createTanStackMarkdownHighlighter(highlighter);

export const markdownHighlightCss = createThemeCss({
  light: githubLightTheme,
  dark: githubDarkTheme,
  lightSelector: ".question",
  darkSelector: ".dark .question",
  codeBlockSelector: ".question pre.tm-code",
  lineNumbersSelector: ".question .tm-code--line-numbers",
});
