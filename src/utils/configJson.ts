import type { Field, FormConfiguration } from "../types/form";

export function stringifyConfig(fields: FormConfiguration) {
  return JSON.stringify(fields, null, 2);
}

const exampleConfig: FormConfiguration = [
  {
    id: "name",
    type: "text",
    label: "Full Name",
    required: true,
  },
  {
    id: "age",
    type: "number",
    label: "Age",
    required: false,
    min: 18,
    max: 100,
  },
  {
    id: "address",
    type: "group",
    label: "Address",
    children: [
      {
        id: "city",
        type: "text",
        label: "City",
        required: true,
      },
    ],
  },
];

export const exampleConfigJson = stringifyConfig(exampleConfig);

export type ParseConfigResult =
  | { ok: true; fields: FormConfiguration }
  | { ok: false; error: string };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseFields(
  items: unknown[],
  seenIds: Set<string>,
): FormConfiguration | null {
  const fields: FormConfiguration = [];

  for (const item of items) {
    const field = parseField(item, seenIds);
    if (field == null) {
      return null;
    }
    fields.push(field);
  }

  return fields;
}

function parseField(value: unknown, seenIds: Set<string>): Field | null {
  // skip random values like "hello" or [1,2]
  if (!isPlainObject(value)) {
    return null;
  }

  const { id, label, type } = value;
  // two fields with the same id would break keys / update / delete
  if (typeof id !== "string" || id.trim() === "" || seenIds.has(id)) {
    return null;
  }
  if (typeof label !== "string") {
    return null;
  }

  seenIds.add(id);

  if (type === "text" || type === "number") {
    if (typeof value.required !== "boolean") {
      return null;
    }

    if (type === "text") {
      return { id, type, label, required: value.required };
    }

    // check if the min and max values are numbers or empty
    if (
      (value.min !== undefined && typeof value.min !== "number") ||
      (value.max !== undefined && typeof value.max !== "number")
    ) {
      return null;
    }

    return {
      id,
      type,
      label,
      required: value.required,
      min: value.min,
      max: value.max,
    };
  }

  if (type === "group") {
    // a group without children isn't a group
    if (!Array.isArray(value.children)) {
      return null;
    }

    const children = parseFields(value.children, seenIds);
    if (children == null) {
      return null;
    }

    return { id, type, label, children };
  }

  // e.g. type: "select" — we don't have that field
  return null;
}

export function parseConfig(json: string): ParseConfigResult {
  try {
    // bad JSON shouldn't replace the current form
    const parsed: unknown = JSON.parse(json);

    //parsed json should be an array of fields
    if (!Array.isArray(parsed)) {
      return {
        ok: false,
        error: "Configuration must be a JSON array of fields.",
      };
    }

    // check nested groups as well (Address -> City)
    const fields = parseFields(parsed, new Set());
    if (fields == null) {
      return {
        ok: false,
        error: "JSON doesn't match the form schema.",
      };
    }

    return { ok: true, fields };
  } catch {
    return { ok: false, error: "That isn't valid JSON." };
  }
}
