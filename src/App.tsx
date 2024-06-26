import Widget from "./components/Widget/Widget";
import "../src/styles/global.css";
import styles from "./App.module.css";
import { useState } from "react";

// This initializes an app with the webcomponent, but Vite is only exporting the standalone Widget component
function App() {
  const [price, setPrice] = useState("2000");
  return (
    /*Simulates what may come from the parent app*/
    <div className={styles.wrapper}>
      <label>Price</label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <Widget price={price} language="en" />
    </div>
  );
}

export default App;
