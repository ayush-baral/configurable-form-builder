import { FieldRenderer } from "./components/FieldRenderer";
import { useFormConfig } from "./context/FormConfigContext";
import styles from "./App.module.css";

function App() {
  const { fields } = useFormConfig();

  return (
    <section className={styles.preview}>
      <h1 className={styles.title}>Form Preview</h1>
      {fields.map((field) => (
        <FieldRenderer key={field.id} field={field} />
      ))}
    </section>
  );
}

export default App;
