import "@/i18n";

import { AppProviders } from "@/app/providers/AppProvider";
import { AppRouter } from "@/app/routes/AppRouter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>,
);
