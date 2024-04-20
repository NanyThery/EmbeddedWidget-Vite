import ReactDOM from "react-dom/client";
import Widget, { WidgetProps } from "./components/Widget/Widget";
import { normalizeAttribute } from "./utils/normalizeAttributes";
import { ProdStyles } from "./components/ProdStyles";

/**
 * This is the web component that will be used in the parent app.
 * Wraps and exports the React component Widget to be injected in the parent app/web
 */

class InstalmentsWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes<WidgetProps>();
    const root = ReactDOM.createRoot(this.shadowRoot as ShadowRoot);

    root.render(
      <>
        <ProdStyles />
        <Widget {...props} />
      </>
    );
  }

  private getPropsFromAttributes<T>(): T {
    const props: Record<string, string> = {};

    for (let index = 0; index < this.attributes.length; index++) {
      const attribute = this.attributes[index];
      props[normalizeAttribute(attribute.name)] = attribute.value;
    }

    return props as T;
  }
}

export default InstalmentsWebComponent;
