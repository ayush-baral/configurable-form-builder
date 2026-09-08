import { useState, type SubmitEvent } from "react";
import { useFormConfig } from "../../context/FormConfigContext";
import {
  validateForm,
  type FormErrors,
  type FormValues,
} from "../../utils/validate";

export function useFormPreview() {
  const { fields } = useFormConfig();
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleValueChange(fieldId: string, value: string) {
    setValues((currentValues) => ({ ...currentValues, [fieldId]: value }));
    setErrors((currentErrors) => {
      if (!currentErrors[fieldId]) {
        return currentErrors;
      }

      const remainingErrors = { ...currentErrors };
      delete remainingErrors[fieldId];
      return remainingErrors;
    });
    setSubmitted(false);
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(fields, values);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  function handleReset() {
    setValues({});
    setErrors({});
    setSubmitted(false);
  }

  return {
    fields,
    values,
    errors,
    submitted,
    handleValueChange,
    handleSubmit,
    handleReset,
  };
}
