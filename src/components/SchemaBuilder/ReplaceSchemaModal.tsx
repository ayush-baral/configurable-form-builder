import { Modal } from "../Modal";
import styles from "./ReplaceSchemaModal.module.css";

type ReplaceSchemaModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onBack: () => void;
};

export function ReplaceSchemaModal({
  open,
  onClose,
  onConfirm,
  onBack,
}: ReplaceSchemaModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Replace current schema?">
      <p className={styles.warning} role="alert">
        This will replace the form you are editing. That cannot be undone.
      </p>
      <div className={styles.actions}>
        <button className={styles.danger} type="button" onClick={onConfirm}>
          Replace
        </button>
        <button type="button" onClick={onBack}>
          Back
        </button>
      </div>
    </Modal>
  );
}
