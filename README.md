  - [Summary](#summary)
  - [How to run the project locally](#how-to-run-the-project-locally)
  - [How to test in the `product-page.html`](#how-to-test-in-the-product-pagehtml)
    - [Build the project:](#build-the-project)
    - [Add in the productPage](#add-in-the-productpage)

## Summary

> ⚠️ This repo is based on a code challenge for a company. This is my solution to that challenge. The API was provided, sames as the product page.

The current project builds and exposes a Widget for calculating the instalments given a particular price. It also provides an API for i18n (basic) and sends tracking events.

The project stack is:

- Building Stack:
  - ReactJs
  - Typescript
  - Vite
  - CSS Modules
- Testing:
  - React Testing Library
  - Vitest

## How to run the project locally

This project has a wrapping `App` that allows visualizing and playing around with the Widget component. However,when the project is built, only the `Widget` component is exported, wrapped in WebComponent.

`npm install`
`npm run dev`

⚠️ It requires the API server to run. The entrypoint can be defined/changed in the `settings.ts` file, by default `https://localhost:8000`

## How to test in the `product-page.html`

### Build the project:

`npm run build`

Look for the `dist/` folder created by Vite, and use that address to refer sdk.

### Add in the productPage

ℹ️ The `product-page.html` file included in this zip **has already a working integration of the widget**. You can check that one or test with the local build explained below. Both require the API server to run locally at localhost:8000.

1. Add the following snippet where you wish the widget to display. It will be replaced with the actual widget when loaded.

   `<div id="custom-widget"></div>`

2. At the bottom of the page, paste the following snippet:

- The `src` is pointing to the current path of the project that Vite will generate (locally).

```
  <script src="../seQura Instalments Widget/dist/instalments-sequra.umd.js defer></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      const metaLang = document.querySelector('meta[http-equiv="content-language"]');
      merchantLanguage = metaLang ? metaLang.content : 'default_language';

      const customWidget = document.querySelector("#custom-widget");
      const priceElement = document.querySelector("#product-price");


    // This observes for price changes to recalculate the instalments
      const observer = new MutationObserver(function() {
        const price = priceElement.textContent;
        customWidget.innerHTML = `<instalments-widget price=${price} language=${merchantLanguage}></instalments-widget>`;
      });
      observer.observe(priceElement, { childList: true });

      customWidget.innerHTML = `<instalments-widget price=${priceElement.textContent} language=${merchantLanguage}></instalments-widget>`;
    });
  </script>
```


