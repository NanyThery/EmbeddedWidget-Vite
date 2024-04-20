import Widget from "./components/Widget/Widget";
import "../src/styles/global.css";
import styles from "./App.module.css";

// This initializes an app with the webcomponent, but Vite is only exporting the standalone Widget component
function App() {
  return (
    <div className={styles.wrapper}>
      <Widget price={12300} />
    </div>
  );
}

export default App;
