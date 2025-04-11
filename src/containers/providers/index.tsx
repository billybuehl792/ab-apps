import { type FC, type PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { theme } from "@/config/theme";
import AuthProvider from "./AuthProvider";
import Snackbar from "@/components/alerts/Snackbar";

const Providers: FC<PropsWithChildren> = ({ children }) => {
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
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export default Providers;
