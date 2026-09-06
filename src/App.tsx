import { FieldRenderer } from "./components/FieldRenderer";
import { initialFields } from "./data/initialFields";
import styles from "./App.module.css";

function App() {
  return (
    <section className={styles.preview}>
      <h1 className={styles.title}>Form Preview</h1>
      {initialFields.map((field) => (
        <FieldRenderer key={field.id} field={field} />
      ))}
    </section>
  );
}

export default App;
