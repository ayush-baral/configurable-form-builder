import { FieldRenderer } from "./FieldRenderer";
import { useFormConfig } from "../context/FormConfigContext";
import styles from "./FormPreview.module.css";

export function FormPreview() {
  const { fields } = useFormConfig();

  return (
    <section className={styles.preview}>
      <h1 className={styles.title}>Form Preview</h1>
      {fields.length === 0 ? (
        <p className={styles.empty}>
          Add fields in the builder to preview the form.
        </p>
      ) : (
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {fields.map((field) => (
            <FieldRenderer key={field.id} field={field} />
          ))}
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </form>
      )}
    </section>
  );
}
