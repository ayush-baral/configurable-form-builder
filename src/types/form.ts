export type FieldType = "text" | "number" | "group";

type FieldBase = {
  id: string;
  label: string;
};

export type TextField = FieldBase & {
  type: "text";
  required: boolean;
};

export type NumberField = FieldBase & {
  type: "number";
  required: boolean;
  min?: number;
  max?: number;
};

export type GroupField = FieldBase & {
  type: "group";
  children: Field[];
};

export type Field = TextField | NumberField | GroupField;

export type FormConfiguration = Field[];
