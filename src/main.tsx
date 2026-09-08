import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { FormConfigProvider } from "./context/FormConfigProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormConfigProvider>
      <App />
    </FormConfigProvider>
  </StrictMode>,
);
