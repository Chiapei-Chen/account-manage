# vue3-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Environment Requirements

- Node.js `^22.18.0` or `>=24.12.0`

## Getting Started

1. Clone 專案後進入資料夾：

   ```sh
   git clone <repo-url>
   cd vue3-project
   ```

2. 安裝套件：

   ```sh
   npm install
   ```

3. 設定環境變數：在專案根目錄新增 `.env` 檔案（內容另外提供），需包含以下變數：

   ```
   VITE_API_BASE_URL=
   VITE_INTERVIEWER_NAME=
   ```

4. 啟動開發伺服器：

   ```sh
   npm run dev
   ```

   啟動後預設可用瀏覽器開啟 `http://localhost:5173` 查看。

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Preview Production Build Locally

```sh
npm run preview
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
