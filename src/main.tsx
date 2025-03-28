import "reset-css/reset.css";
import "./utils/string";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import AuthProvider from "./providers/AuthProvider";
import { router } from "./router";
import App from "./App";
import Snackbar from "./components/alerts/Snackbar";
import { theme } from "./theme";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  const queryClient = new QueryClient();
  root.render(
    <StrictMode>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        Components={{
          default: Snackbar,
          success: Snackbar,
          error: Snackbar,
          warning: Snackbar,
          info: Snackbar,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </StrictMode>
  );
}
