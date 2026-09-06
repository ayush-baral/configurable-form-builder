import type { Field } from "../types/form";
import styles from "./FieldRenderer.module.css";

type FieldRendererProps = {
  field: Field;
};

export function FieldRenderer({ field }: FieldRendererProps) {
  switch (field.type) {
    case "text":
      return (
        <label className={styles.field} htmlFor={field.id}>
          <span className={styles.label}>
            {field.label}
            {field.required ? <span aria-hidden="true"> *</span> : null}
          </span>
          <input
            className={styles.input}
            id={field.id}
            name={field.id}
            type="text"
            required={field.required}
          />
        </label>
      );

    case "number":
      return (
        <label className={styles.field} htmlFor={field.id}>
          <span className={styles.label}>
            {field.label}
            {field.required ? <span aria-hidden="true"> *</span> : null}
          </span>
          <input
            className={styles.input}
            id={field.id}
            name={field.id}
            type="number"
            required={field.required}
            min={field.min}
            max={field.max}
          />
        </label>
      );

    case "group":
      return (
        <fieldset className={styles.group}>
          <legend className={styles.groupLabel}>{field.label}</legend>
          {field.children.map((child) => (
            <FieldRenderer key={child.id} field={child} />
          ))}
        </fieldset>
      );

    default: {
      return null;
    }
  }
}
