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
        children: [],
      };
  }
}

export function addField(
  fields: FormConfiguration,
  parentId: string | null,
  newField: Field,
): FormConfiguration {
  // parentId refers to the group id
  // if parentId is null, the new field is added to the root
  if (parentId === null) {
    return [...fields, newField];
  }

  return fields.map((field) => {
    // if the field is not a group, return it unchanged
    if (field.type !== "group") {
      return field;
    }
    // if the field is a group and its id matches the parentId, add the new field to the group
    if (field.id === parentId) {
      return { ...field, children: [...field.children, newField] };
    }

    // search this group's children for the parent and add there if found.
    return {
      ...field,
      children: addField(field.children, parentId, newField),
    };
  });
}

export function deleteField(
  fields: FormConfiguration,
  id: string,
): FormConfiguration {
  return fields
    .filter((field) => field.id !== id)
    .map((field) => {
      // if the field is not a group, return it unchanged
      if (field.type !== "group") {
        return field;
      }
      // if the field is a group, search its children recursively for the id and delete there if found.
      return { ...field, children: deleteField(field.children, id) };
    });
}

export function updateField(
  fields: FormConfiguration,
  id: string,
  updater: (field: Field) => Field,
): FormConfiguration {
  return fields.map((field) => {
    if (field.id === id) {
      // if the field is found, update it
      return updater(field);
    }
    // This field's id did not match, and it is a text or number field,
    // so it has no children to search. Return it unchanged.
    if (field.type !== "group") {
      return field;
    }
    // if the field is a group, search its children recursively for the id and update there if found.
    return {
      ...field,
      children: updateField(field.children, id, updater),
    };
  });
}

function swapSiblings(
  fields: FormConfiguration, // field configuration of the siblings list
  index: number, // the index of the field to swap
  direction: "up" | "down", // the direction to swap
): FormConfiguration {
  const targetIndex = direction === "up" ? index - 1 : index + 1; // the index of the field to swap with

  // if the target index is out of bounds, return the fields unchanged
  if (targetIndex < 0 || targetIndex >= fields.length) {
    return fields;
  }

  // make a copy of the fields to avoid mutating the original
  const newFields = [...fields];
  // remove the field at the index
  const [moved] = newFields.splice(index, 1);
  // insert the field at the target index
  newFields.splice(targetIndex, 0, moved);
  // return the new fields
  return newFields;
}

export function moveField(
  fields: FormConfiguration,
  id: string,
  direction: "up" | "down",
): FormConfiguration {
  // position of the field in the siblings list, if not found, index is -1
  const index = fields.findIndex((field) => field.id === id);

  if (index !== -1) { // if the field is found, swap it
    return swapSiblings(fields, index, direction);
  }

  return fields.map((field) => {
    if (field.type !== "group") { // if the field is not a group, return it unchanged
      return field;
    }
    // if the field is a group, search its children recursively for the id and swap there if found.
    return {
      ...field,
      children: moveField(field.children, id, direction),
    };
  });
}
