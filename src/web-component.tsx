import ReactDOM from "react-dom/client";
import Widget, { WidgetProps } from "./components/Widget/Widget";
import { normalizeAttribute } from "./utils/normalizeAttributes";
import { ProdStyles } from "./components/ProdStyles";

class InstalmentsWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes<WidgetProps>();
    const root = ReactDOM.createRoot(this.shadowRoot as ShadowRoot);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL("./style.css", document.baseURI).href;
    this.shadowRoot?.appendChild(link);

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
