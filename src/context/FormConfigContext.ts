import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { FormConfiguration } from "../types/form";

export type FormConfigContextValue = {
  fields: FormConfiguration;
  setFields: Dispatch<SetStateAction<FormConfiguration>>;
};

export const FormConfigContext = createContext<FormConfigContextValue | null>(
  null,
);

export function useFormConfig() {
  const context = useContext(FormConfigContext);

  if (context == null) {
    throw new Error("useFormConfig must be used within FormConfigProvider");
  }

  return context;
}

