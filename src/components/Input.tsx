import styles from "./Input.module.css";

type InputProps = {
  id: string;
  label: string;
  type?: "text" | "number";
  required?: boolean;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function Input({
  id,
  label,
  type = "text",
  required = false,
  value,
  error,
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
        className={`${styles.input} ${error ? styles.invalid : ""}`}
        id={id}
        name={id}
        type={type}
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
