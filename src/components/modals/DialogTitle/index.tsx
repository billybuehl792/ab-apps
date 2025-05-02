import { type ReactNode, type FC } from "react";
import {
  type DialogProps,
  DialogTitle as MuiDialogTitle,
  Stack,
  type DialogTitleProps as MuiDialogTitleProps,
} from "@mui/material";
import CloseIconButton from "@/components/buttons/CloseIconButton";

interface DialogTitleProps extends MuiDialogTitleProps {
  label?: ReactNode;
  onClose?: DialogProps["onClose"];
}

/**
 * This component renders a `DialogTitle` with a close button.
 * It is a wrapper around the Mui `DialogTitle` component.
 */
const DialogTitle: FC<DialogTitleProps> = ({
  label,
  children,
  onClose,
  ...props
}) => {
  return (
    <MuiDialogTitle
      component={Stack}
      direction="row"
      justifyContent="space-between"
      {...props}
    >
      {label || children}
      {!!onClose && (
        <CloseIconButton
          onClick={(event) => {
            onClose(event, "backdropClick");
          }}
        />
      )}
    </MuiDialogTitle>
  );
};

export default DialogTitle;
