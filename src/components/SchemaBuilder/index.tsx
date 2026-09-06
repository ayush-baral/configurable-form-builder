import type { FieldType } from "../../types/form";
import { useFormConfig } from "../../context/FormConfigContext";
import { addField, createField } from "../../utils/fields";
import { AddFieldButtons } from "./AddFieldButtons";
import { SchemaFieldItem } from "./SchemaFieldItem";
import styles from "./SchemaBuilder.module.css";

export function SchemaBuilder() {
  const { fields, setFields } = useFormConfig();

  function handleAddRoot(type: FieldType) {
    setFields((current) => addField(current, null, createField(type)));
  }

  return (
    <section className={styles.builder}>
      <h1 className={styles.title}>Form Builder</h1>
      <p className={styles.hint}>
        Please update the schema on left to see the preview on right.
      </p>

      {fields.length === 0 ? (
        <p className={styles.empty}>
          No fields yet. Add a text, number, or group field.
        </p>
      ) : (
        <ul className={styles.list}>
          {fields.map((field, index) => (
            <SchemaFieldItem
              key={field.id}
              field={field}
              index={index}
              siblingCount={fields.length}
            />
          ))}
        </ul>
      )}

      <AddFieldButtons onAdd={handleAddRoot} />
    </section>
  );
}
