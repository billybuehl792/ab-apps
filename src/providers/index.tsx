import { type PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { theme } from "@/config/theme";
import AuthProvider from "./AuthProvider";
import Snackbar from "@/components/alerts/Snackbar";
import GoogleMapsProvider from "./GoogleMapsProvider";

const Providers = ({ children }: PropsWithChildren) => {
  /** Values */

  const queryClient = new QueryClient();

  return (
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
          <GoogleMapsProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </GoogleMapsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export default Providers;
