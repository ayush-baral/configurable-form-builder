import { useState } from "react";
import type { FormConfiguration } from "../../types/form";
import { parseConfig, exampleConfigJson } from "../../utils/configJson";
import { Modal } from "../Modal";
import { ReplaceSchemaModal } from "./ReplaceSchemaModal";
import styles from "./ImportModal.module.css";

type ImportModalProps = {
  open: boolean;
  onClose: () => void;
  onImport: (fields: FormConfiguration) => void;
};

export function ImportModal({ open, onClose, onImport }: ImportModalProps) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [replacementConfig, setReplacementConfig] =
    useState<FormConfiguration | null>(null);

  function handleClose() {
    setDraft("");
    setError(null);
    setReplacementConfig(null);
    onClose();
  }

  function handleImport() {
    const result = parseConfig(draft);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setReplacementConfig(result.fields);
  }

  function confirmReplace() {
    if (replacementConfig == null) {
      return;
    }

    onImport(replacementConfig);
    handleClose();
  }

  if (replacementConfig != null) {
    return (
      <ReplaceSchemaModal
        open={open}
        onClose={handleClose}
        onConfirm={confirmReplace}
        onBack={() => setReplacementConfig(null)}
      />
    );
  }

  return (
    <Modal open={open} onClose={handleClose} title="Import configuration">
      <p className={styles.hint}>
        Paste JSON from Export, or use the example below.
      </p>
      <textarea
        className={styles.json}
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value);
          setError(null);
        }}
        rows={12}
        placeholder="Paste exported JSON here"
      />
      <details className={styles.example}>
        <summary>Example JSON</summary>
        <pre>{exampleConfigJson}</pre>
        <button
          type="button"
          onClick={() => {
            setDraft(exampleConfigJson);
            setError(null);
          }}
        >
          Use this example
        </button>
      </details>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      <div className={styles.actions}>
        <button type="button" onClick={handleImport}>
          Import
        </button>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
