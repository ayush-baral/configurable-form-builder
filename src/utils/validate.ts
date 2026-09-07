import type { Field, FormConfiguration } from "../types/form";

export type FormValues = Record<string, string>;
export type FormErrors = Record<string, string>;

function validateField(
  field: Field,
  formValues: FormValues,
  formErrors: FormErrors,
) {
  if (field.type === "group") {
    for (const childField of field.children) {
      validateField(childField, formValues, formErrors);
    }
    return;
  }

  const trimmedValue = (formValues[field.id] ?? "").trim();

  if (field.required && trimmedValue === "") {
    formErrors[field.id] = `${field.label} is required.`;
    return;
  }

  if (field.type === "number" && trimmedValue !== "") {
    const numericValue = Number(trimmedValue);

    if (Number.isNaN(numericValue)) {
      formErrors[field.id] = `${field.label} must be a number.`;
      return;
    }

    if (field.min !== undefined && numericValue < field.min) {
      formErrors[field.id] = `${field.label} must be at least ${field.min}.`;
      return;
    }

    if (field.max !== undefined && numericValue > field.max) {
      formErrors[field.id] = `${field.label} must be at most ${field.max}.`;
    }
  }
}

export function validateForm(
  fields: FormConfiguration,
  formValues: FormValues,
): FormErrors {
  const formErrors: FormErrors = {};

  for (const field of fields) {
    validateField(field, formValues, formErrors);
  }

  return formErrors;
}
