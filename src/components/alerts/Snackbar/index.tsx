import { forwardRef } from "react";
import { SnackbarContent, type CustomContentProps } from "notistack";
import { Alert } from "@mui/material";

/**
 * Custom Snackbar component.
 */
const Snackbar = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ variant, message }, ref) => {
    return (
      <SnackbarContent ref={ref} role="alert">
        <Alert
          variant="outlined"
          {...(variant !== "default" && { severity: variant })}
        >
          {message}
        </Alert>
      </SnackbarContent>
    );
  }
);

export default Snackbar;
