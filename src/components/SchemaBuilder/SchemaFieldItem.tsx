import type { Field, FieldType } from "../../types/form";
import { useFormConfig } from "../../context/FormConfigContext";
import {
  addField,
  createField,
  deleteField,
  moveField,
  updateField,
} from "../../utils/fields";
import { AddFieldButtons } from "./AddFieldButtons";
import styles from "./SchemaBuilder.module.css";

type SchemaFieldItemProps = {
  field: Field;
  index: number;
  siblingCount: number;
};

export function SchemaFieldItem({
  field,
  index,
  siblingCount,
}: SchemaFieldItemProps) {
  const { setFields } = useFormConfig();

  function handleAddChild(type: FieldType) {
    setFields((current) => addField(current, field.id, createField(type)));
  }

  return (
    <li className={styles.item}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.type}>
            {field.type}
            {field.type === "group" ? ` · ${field.label}` : null}
          </span>
          <div className={styles.actions}>
            <button
              type="button"
              aria-label={`Move ${field.label} up`}
              disabled={index === 0}
              onClick={() =>
                setFields((current) => moveField(current, field.id, "up"))
              }
            >
              Up
            </button>
            <button
              type="button"
              aria-label={`Move ${field.label} down`}
              disabled={index === siblingCount - 1}
              onClick={() =>
                setFields((current) => moveField(current, field.id, "down"))
              }
            >
              Down
            </button>
            <button
              type="button"
              aria-label={`Delete ${field.label}`}
              onClick={() =>
                setFields((current) => deleteField(current, field.id))
              }
            >
              Delete
            </button>
          </div>
        </div>

        <label className={styles.prop}>
          {field.type === "group" ? "Group label" : "Label"}
          <input
            type="text"
            value={field.label}
            onChange={(event) => {
              const label = event.target.value;
              setFields((current) =>
                updateField(current, field.id, (currentField) => {
                  if (currentField.type === "group") {
                    return {
                      ...currentField,
                      label,
                      children: currentField.children,
                    };
                  }

                  return { ...currentField, label };
                }),
              );
            }}
          />
        </label>

        {field.type !== "group" ? (
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={field.required}
              onChange={(event) => {
                const required = event.target.checked;
                setFields((current) =>
                  updateField(current, field.id, (currentField) => ({
                    ...currentField,
                    required,
                  })),
                );
              }}
            />
            Required
          </label>
        ) : null}

        {field.type === "number" ? (
          <div className={styles.numberProps}>
            <label className={styles.prop}>
              Min
              <input
                type="number"
                value={field.min ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  setFields((current) =>
                    updateField(current, field.id, (currentField) => {
                      if (currentField.type !== "number") {
                        return currentField;
                      }

                      return {
                        ...currentField,
                        min: value === "" ? undefined : Number(value),
                      };
                    }),
                  );
                }}
              />
            </label>
            <label className={styles.prop}>
              Max
              <input
                type="number"
                value={field.max ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  setFields((current) =>
                    updateField(current, field.id, (currentField) => {
                      if (currentField.type !== "number") {
                        return currentField;
                      }

                      return {
                        ...currentField,
                        max: value === "" ? undefined : Number(value),
                      };
                    }),
                  );
                }}
              />
            </label>
          </div>
        ) : null}
      </div>

      {field.type === "group" ? (
        <div className={styles.children}>
          {field.children.length > 0 ? (
            <ul className={styles.list}>
              {field.children.map((child, childIndex) => (
                <SchemaFieldItem
                  key={child.id}
                  field={child}
                  index={childIndex}
                  siblingCount={field.children.length}
                />
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>This group has no fields yet.</p>
          )}
          <AddFieldButtons onAdd={handleAddChild} />
        </div>
      ) : null}
    </li>
  );
}
