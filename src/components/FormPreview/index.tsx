import { FieldRenderer } from "../FieldRenderer";
import { useFormPreview } from "./useFormPreview";
import styles from "./FormPreview.module.css";

export function FormPreview() {
  const {
    fields,
    values,
    errors,
    submitted,
    handleValueChange,
    handleSubmit,
    handleReset,
  } = useFormPreview();

  return (
    <section className={styles.preview}>
      <h1 className={styles.title}>Form Preview</h1>
      {fields.length === 0 ? (
        <p className={styles.empty}>
          Add fields in the builder to preview the form.
        </p>
      ) : (
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
          {fields.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              values={values}
              errors={errors}
              onValueChange={handleValueChange}
            />
          ))}
          <div className={styles.actions}>
            <button className={styles.submit} type="submit">
              Submit
            </button>
            <button className={styles.reset} type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
          {submitted ? (
            <p className={styles.success} role="status">
              Form submitted successfully.
            </p>
          ) : null}
        </form>
      )}
    </section>
  );
}
