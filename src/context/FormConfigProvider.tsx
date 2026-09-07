import { useCallback, useMemo, useState, type ReactNode } from "react";
import { initialFields } from "../data/initialFields";
import type { FormConfiguration } from "../types/form";
import { FormConfigContext } from "./FormConfigContext";

type FormConfigProviderProps = {
  children: ReactNode;
};

export function FormConfigProvider({ children }: FormConfigProviderProps) {
  const [fields, setFields] = useState<FormConfiguration>(initialFields);
  const [previewResetKey, setPreviewResetKey] = useState(0);

  const resetPreview = useCallback(() => {
    setPreviewResetKey((key) => key + 1);
  }, []);

  const value = useMemo(
    () => ({
      fields,
      setFields,
      previewResetKey,
      resetPreview,
    }),
    [fields, previewResetKey, resetPreview],
  );

  return (
    <FormConfigContext.Provider value={value}>
      {children}
    </FormConfigContext.Provider>
  );
}
