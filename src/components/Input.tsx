import styles from "./Input.module.css";

type InputProps = {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  error?: string;
  inputMode?: "decimal";
  onChange: (value: string) => void;
};

export function Input({
  id,
  label,
  required = false,
  value,
  error,
  inputMode,
  onChange,
}: InputProps) {
  const errorId = `${id}-error`;

  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.label}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
      <input
        className={error ? `${styles.input} ${styles.invalid}` : styles.input}
        id={id}
        name={id}
        type="text"
        inputMode={inputMode}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <span className={styles.error} id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
