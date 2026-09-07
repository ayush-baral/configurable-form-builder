import { useState } from "react";
import { Modal } from "../Modal";
import styles from "./ExportModal.module.css";

type ExportModalProps = {
  open: boolean;
  json: string;
  onClose: () => void;
};

export function ExportModal({ open, json, onClose }: ExportModalProps) {
  const [copied, setCopied] = useState(false);

  function handleClose() {
    setCopied(false);
    onClose();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Modal open={open} onClose={handleClose} title="Export configuration">
      <textarea className={styles.json} readOnly value={json} rows={16} />
      <div className={styles.actions}>
        <button type="button" onClick={handleCopy}>
          {copied ? "Copied" : "Copy"}
        </button>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
