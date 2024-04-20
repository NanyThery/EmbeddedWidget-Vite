# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Considerations and Assumptions

### Typing

- For lack of context, I made a strict typing of what's expected from the API. However, in certain cases, it might be interesting to allow a "catch-all" property in the incoming type to avoid unexpected crashes when the API adds more properties. As long as the mapper function doesn't assign them it doesn't have any effect on the UI.

### Distributing the widget

- [Rejected] Iframe
  This could be a fast way to distribute the widget. It may use a and html placeholder to inject the iframe after the DOMContentLoaded event has finished.
  The price could be capture in a variable and passed as a parameter, later captured by the widget.
  However, this approach is not valid for the current design and requirements where a modal needs to be displayed.
  The iframe is a _"page within a page"_, and the format applied to its elements can only be done in relation to itself. We cannot set an "absolute" `div` that takes the whole screen.

Define the URL of the API (localhost8000 by default)
