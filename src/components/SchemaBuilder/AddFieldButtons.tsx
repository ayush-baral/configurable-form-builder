import type { FieldType } from "../../types/form";
import styles from "./SchemaBuilder.module.css";

type AddFieldButtonsProps = {
  onAdd: (type: FieldType) => void;
};

export function AddFieldButtons({ onAdd }: AddFieldButtonsProps) {
  return (
    <div className={styles.addRow}>
      <button type="button" onClick={() => onAdd("text")}>
        + Text
      </button>
      <button type="button" onClick={() => onAdd("number")}>
        + Number
      </button>
      <button type="button" onClick={() => onAdd("group")}>
        + Group
      </button>
    </div>
  );
}
