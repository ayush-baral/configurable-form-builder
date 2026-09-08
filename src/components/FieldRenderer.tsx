import type { Field } from "../types/form";
import type { FormErrors, FormValues } from "../utils/validate";
import { Input } from "./Input";
import styles from "./FieldRenderer.module.css";

type FieldRendererProps = {
  field: Field;
  values: FormValues;
  errors: FormErrors;
  onValueChange: (id: string, value: string) => void;
};

export function FieldRenderer({
  field,
  values,
  errors,
  onValueChange,
}: FieldRendererProps) {
  switch (field.type) {
    case "text":
    case "number":
      return (
        <Input
          id={field.id}
          label={field.label}
          type={field.type}
          required={field.required}
          value={values[field.id] ?? ""}
          error={errors[field.id]}
          onChange={(value) => onValueChange(field.id, value)}
        />
      );

    case "group":
      return (
        <fieldset className={styles.group}>
          <legend className={styles.groupLabel}>{field.label}</legend>
          {field.children.map((child) => (
            <FieldRenderer
              key={child.id}
              field={child}
              values={values}
              errors={errors}
              onValueChange={onValueChange}
            />
          ))}
        </fieldset>
      );

    default: {
      return null;
    }
  }
}
