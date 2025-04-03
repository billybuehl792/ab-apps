import { type ReactNode, type FC } from "react";
import {
  type DialogProps,
  DialogTitle as MUIDialogTitle,
  Stack,
  type DialogTitleProps as MUIDialogTitleProps,
} from "@mui/material";
import CloseIconButton from "@/components/buttons/CloseIconButton";

interface DialogTitleProps extends MUIDialogTitleProps {
  label?: ReactNode;
  onClose?: DialogProps["onClose"];
}

/**
 * This component renders a `DialogTitle` with a close button.
 * It is a wrapper around the MUI `DialogTitle` component.
 */
const DialogTitle: FC<DialogTitleProps> = ({
  label,
  children,
  onClose,
  ...props
}) => {
  return (
    <MUIDialogTitle
      component={Stack}
      direction="row"
      justifyContent="space-between"
      {...props}
    >
      {label || children}
      {!!onClose && (
        <CloseIconButton
          onClick={(event) => onClose?.(event, "backdropClick")}
        />
      )}
    </MUIDialogTitle>
  );
};

export default DialogTitle;
