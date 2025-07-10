import { type PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { theme } from "@/store/config/theme";
import AuthProvider from "./AuthProvider";
import Snackbar from "@/components/alerts/Snackbar";
import GoogleMapsProvider from "./GoogleMapsProvider";
import RouterProvider from "./RouterProvider";

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
        <GoogleMapsProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <RouterProvider>{children}</RouterProvider>
            </AuthProvider>
          </ThemeProvider>
        </GoogleMapsProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export default Providers;
