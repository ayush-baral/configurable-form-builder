import { useState, type SubmitEvent } from "react";
import { FieldRenderer } from "./FieldRenderer";
import { useFormConfig } from "../context/FormConfigContext";
import {
  validateForm,
  type FormErrors,
  type FormValues,
} from "../utils/validate";
import styles from "./FormPreview.module.css";

export function FormPreview() {
  const { fields } = useFormConfig();
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleValueChange(fieldId: string, value: string) {
    setValues((currentValues) => ({ ...currentValues, [fieldId]: value }));
    setErrors((currentErrors) => {
      if (!currentErrors[fieldId]) {
        return currentErrors;
      }

      const remainingErrors = { ...currentErrors };
      delete remainingErrors[fieldId];
      return remainingErrors;
    });
    setSubmitted(false);
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(fields, values);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

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
          <button className={styles.submit} type="submit">
            Submit
          </button>
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
