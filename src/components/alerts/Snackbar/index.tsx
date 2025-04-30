import {
  SnackbarContent,
  useSnackbar,
  type CustomContentProps,
} from "notistack";
import { Alert, AlertTitle } from "@mui/material";

import CloseIconButton from "@/components/buttons/CloseIconButton";

interface SnackbarProps extends CustomContentProps {
  ref?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Custom Snackbar component.
 */
const Snackbar = ({ ref, id, variant, message }: SnackbarProps) => {
  /** Values */

  const { closeSnackbar } = useSnackbar();

  /** Callbacks */

  const handleClose = () => {
    closeSnackbar(id);
  };

  return (
    <SnackbarContent ref={ref} role="alert">
      <Alert
        variant="standard"
        action={<CloseIconButton onClick={handleClose} />}
        severity={variant === "default" ? "info" : variant}
        sx={{ flexGrow: 1, alignItems: "center" }}
      >
        {variant !== "default" && (
          <AlertTitle>{variant.toTitleCase()}</AlertTitle>
        )}
        {message}
      </Alert>
    </SnackbarContent>
  );
};

export default Snackbar;
