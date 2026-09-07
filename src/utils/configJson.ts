import type { FormConfiguration } from "../types/form";

export function stringifyConfig(fields: FormConfiguration) {
  return JSON.stringify(fields, null, 2);
}
