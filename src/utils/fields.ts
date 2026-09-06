/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Field, FieldType, FormConfiguration } from "../types/form";

export function createField(type: FieldType): Field {
  const id = new Date().getTime().toString();

  switch (type) {
    case "text":
      return {
        id,
        type,
        label: "Text field",
        required: false,
      };
    case "number":
      return {
        id,
        type,
        label: "Number field",
        required: false,
      };
    case "group":
      return {
        id,
        type,
        label: "Group",
        required: false,
        children: [],
      };
  }
}

export function addField(
  fields: FormConfiguration,
  parentId: string | null,
  newField: Field,
): FormConfiguration {
  return fields;
}

export function deleteField(
  fields: FormConfiguration,
  id: string,
): FormConfiguration {
  return fields;
}

export function updateField(
  fields: FormConfiguration,
  id: string,
  updater: (field: Field) => Field,
): FormConfiguration {
  return fields;
}

export function moveField(
  fields: FormConfiguration,
  id: string,
  direction: "up" | "down",
): FormConfiguration {
  return fields;
}
