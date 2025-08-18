import { type RefObject } from "react";
import {
  SnackbarContent,
  useSnackbar,
  type CustomContentProps as SnackbarContentProps,
} from "notistack";
import { Alert, AlertTitle, Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CloseIconButton from "@/components/buttons/CloseIconButton";

const Snackbar = ({
  ref,
  id,
  variant,
  message,
}: SnackbarContentProps & { ref: RefObject<HTMLDivElement | null> }) => {
  /** Values */

  const { closeSnackbar } = useSnackbar();
  const severity = variant === "default" ? "info" : variant;

  /** Callbacks */

  const handleClose = () => {
    closeSnackbar(id);
  };

  return (
    <SnackbarContent ref={ref} role="alert">
      <Alert
        variant="standard"
        action={
          <CloseIconButton onClick={handleClose} sx={{ alignSelf: "center" }} />
        }
        severity={severity}
        sx={{ flexGrow: 1 }}
      >
        <AlertTitle>{severity.toTitleCase()}</AlertTitle>
        {typeof message === "string" ? (
          <Box
            sx={{ strong: { fontWeight: "bold" }, em: { fontStyle: "italic" } }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
          </Box>
        ) : (
          message
        )}
      </Alert>
    </SnackbarContent>
  );
};

export default Snackbar;
