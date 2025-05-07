import { type ReactNode } from "react";
import {
  Button,
  type ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  type DialogProps,
} from "@mui/material";
import DialogTitle from "../DialogTitle";

interface ConfirmDialogProps extends Omit<DialogProps, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  onConfirm?: ButtonProps["onClick"];
  onCancel?: DialogProps["onClose"];
}

const ConfirmDialog = ({
  title,
  description,
  onConfirm,
  onCancel,
  onClose: onCloseProp,
  ...props
}: ConfirmDialogProps) => {
  /** Callbacks */

  const onClose: DialogProps["onClose"] = (event, reason) => {
    onCancel?.(event, reason);
    onCloseProp?.(event, reason);
  };

  return (
    <Dialog
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      onClose={onClose}
      {...props}
    >
      <DialogTitle id="alert-dialog-title" onClose={onClose}>
        {title ?? "Confirm"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description ?? "Are you sure you want to continue?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          color="error"
          onClick={() => {
            onClose(new CloseEvent("close"), "backdropClick");
          }}
        >
          Cancel
        </Button>
        <Button onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
