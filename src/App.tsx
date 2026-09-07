import { FormPreview } from "./components/FormPreview";
import { SchemaBuilder } from "./components/SchemaBuilder";
import { useFormConfig } from "./context/FormConfigContext";
import styles from "./App.module.css";

function App() {
  const { previewResetKey } = useFormConfig();

  return (
    <div className={styles.layout}>
      <SchemaBuilder />
      <div className={styles.previewPane}>
        <FormPreview key={previewResetKey} />
      </div>
    </div>
  );
}

export default App;
