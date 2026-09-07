import type { FormConfiguration } from "../types/form";

export const initialFields: FormConfiguration = [
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
    id: "personal",
    type: "group",
    label: "Personal Information",
    children: [
      {
        id: "email",
        type: "text",
        label: "Email",
        required: true,
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
    ],
  },
];
