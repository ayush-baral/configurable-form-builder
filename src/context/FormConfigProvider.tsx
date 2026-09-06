import { useMemo, useState, type ReactNode } from "react";
import { initialFields } from "../data/initialFields";
import type { FormConfiguration } from "../types/form";
import { FormConfigContext } from "./FormConfigContext";

type FormConfigProviderProps = {
  children: ReactNode;
};

export function FormConfigProvider({ children }: FormConfigProviderProps) {
  const [fields, setFields] = useState<FormConfiguration>(initialFields);

  const value = useMemo(
    () => ({
      fields,
      setFields,
    }),
    [fields],
  );

  return (
    <FormConfigContext.Provider value={value}>
      {children}
    </FormConfigContext.Provider>
  );
}
