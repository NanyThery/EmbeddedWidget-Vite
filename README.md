# seQura frontend challenge

- [seQura frontend challenge](#sequra-frontend-challenge)
  - [Summary](#summary)
  - [How to run the project locally](#how-to-run-the-project-locally)
  - [How to test in the `product-page.html`](#how-to-test-in-the-product-pagehtml)
    - [Build the project:](#build-the-project)
    - [Add in the productPage](#add-in-the-productpage)
  - [Considerations and Assumptions](#considerations-and-assumptions)
    - [Stack election](#stack-election)
    - [Assumptions](#assumptions)
    - [Distributing the widget](#distributing-the-widget)

## Summary

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

This project has a wrapping `App` that allows visualizing and play around with the Widget component. However, when the project is built, only the `Widget` component is exported, wrapped in WebComponent.

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

## Considerations and Assumptions

### Stack election

Although I was conviced that ReactJs was the way to go, I wasn't sure about the framework/library to use. After some research I decided to use Vite on top of React since it's highly rated for creating embeddable components due the "out-of-the-box" bundling.

I discarded using CSS libraries since this was a small project that could be easily tackled with pure CSS (modules).

### Assumptions

- **Web Components** : the current widget is wrapped in Web Component in order to create a cross-browser framework agnostic component.
- **i18n**: Although the mockups where in Spanish, the product-page.html was in English. Which made me consider that the widget had to accept some sort of internationalization. I implemented a simple method of i18n that handles spanish/english depending on the language received.
  - The election of language must be sent to the component and it's part of the `<script/>` that has to be included in the page.
- **Price detection**: The widget is not responsible for scanning the price, just dealing with it. On the "setup script" I implemented a very basic ad-hoc detection of the product price based on tag detections. In a real world scenario, we should consider what kind of pages/platforms (custom, Shopigy, WooComerce...) we are integrating with and how the price can be passed on real time to the widget.
- **Quantity**: The product-page does not modify the price accordingly. As mentioned above, the widget only calculates based on the price received. Since the product-page was not in the scope of this task I haven't modify this, but it's expectable that the stalements shoud be different when the quantity changes.
- **Error handling**: I assumed that whenever an error ocurrs on fetching we don't want the Widget to render, instead of showing any kind of error to the user or blocking the merchant page.
- **Loading status**: I have not implemented loading indicators. This was not indicated in the mockup, but I consdiered that, since there's the possibility of the stalements to be empty, we don't want to show a loading status and then nothing.
- **Design system**: I created a small design system based/extracted on the mockup measures, colors and typography (`global.css`) for a more consistent development. Similar to how we'd deal with in production env, with a theme or a library.
- **API Typing**: for lack of context, I made a strict typing of what's expected from the API. However, in certain cases, it might be interesting to allow a "catch-all" property in the incoming type to avoid unexpected crashes when the API adds more properties. As long as the mapper function doesn't assign them it doesn't have any effect on the UI.
- **Events**: I added an event on the selection of stalement and also the check on the "More Info" link.
- **Number formating**: The API is returning `string` format of the numeric values, which include the currency, and comma separated values as in Spanish. The mock expects that rounded values like "5 €" are displayed as `5,00 €`. Even though this transformation could be done in the frontend (in the mapping of values), given that the API is already exposing these strings, it sounds like it's more efficient returning the string properly formatted from the backend rather that destructuring, modifying, and joing the string again to keep the currency.Or, if that is not possible, then we should also implement i18n in the currency and number transformation in the frontend (or backend).

### Distributing the widget

I'd consider the distribution of a widget like this based on a CDN distribution that can be consumed with a <script></script>, similar to the solution I considered here, and also how other known companies do (Google Maps, Facebook...). A CDN is the best way to ensure a fast delivery and also allows us to control the versions users are consuming.

It would also be necessary to consider the profile of our merchants. There might be other approaches with a seamless integration for the users for certain platforms such as Shopify. In this case, a specific App could be developed and offer the merchant a seamless instalation experience.

Or even more, the exposing of an SDK for developers, in case of companies that have developers in house that want to integrate this on their own/customizing.

Part of the distribution of the widget must also consider that the merchants may need some sort of UI/portal/app where they could change the settings of the widget to match their theme, different widget formats or even the language. Where this app is would depend on the platform we are working with.

**Dismissed idea: Iframe**

This could be a fast way to distribute the widget. It may use a and html placeholder to inject the iframe after the DOMContentLoaded event has finished.
The price could be capture in a variable and passed as a parameter in the URL, later captured by the widget.
However, this approach was quickly discarded due to the design requirementswhere a modal needs to be displayed. The iframe is a _"page within a page"_, and the format applied to its elements can only be done in relation to itself. We cannot set an "absolute/fixed" `div` that renders full-screen.
