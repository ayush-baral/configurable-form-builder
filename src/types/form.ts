export type FieldType = "text" | "number" | "group";

type FieldBase = {
  id: string;
  label: string;
  required: boolean;
};

export type TextField = FieldBase & {
  type: "text";
};

export type NumberField = FieldBase & {
  type: "number";
  min?: number;
  max?: number;
};

export type GroupField = FieldBase & {
  type: "group";
  children: Field[];
};

export type Field = TextField | NumberField | GroupField;

export type FormConfiguration = Field[];
