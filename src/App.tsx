import { FormPreview } from "./components/FormPreview";
import { SchemaBuilder } from "./components/SchemaBuilder";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.layout}>
      <SchemaBuilder />
      <div className={styles.previewPane}>
        <FormPreview />
      </div>
    </div>
  );
}

export default App;
