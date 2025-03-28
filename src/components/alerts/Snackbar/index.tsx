import { forwardRef } from "react";
import {
  SnackbarContent,
  useSnackbar,
  type CustomContentProps,
} from "notistack";
import { Alert, AlertTitle } from "@mui/material";
import CloseIconButton from "@/components/buttons/CloseIconButton";

/**
 * Custom Snackbar component.
 */
const Snackbar = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, variant, message }, ref) => {
    /** Values */

    const { closeSnackbar } = useSnackbar();

    return (
      <SnackbarContent ref={ref} role="alert">
        <Alert
          variant="standard"
          action={<CloseIconButton onClick={() => closeSnackbar(id)} />}
          {...(variant !== "default" && { severity: variant })}
          sx={{ flexGrow: 1 }}
        >
          <AlertTitle>{variant.toTitleCase()}</AlertTitle>
          {message}
        </Alert>
      </SnackbarContent>
    );
  }
);

export default Snackbar;
