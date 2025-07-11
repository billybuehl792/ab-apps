import { type ComponentProps, useState, type ReactNode } from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ConfirmDialog from "@/components/modals/ConfirmDialog";

const DEFAULT_ICON = <Delete />;

interface DeleteIconButtonProps extends IconButtonProps {
  icon?: ReactNode;
  confirm?:
    | boolean
    | Pick<ComponentProps<typeof ConfirmDialog>, "title" | "description">;
  slotProps?: {
    confirmDialog?: Omit<
      ComponentProps<typeof ConfirmDialog>,
      "open" | "onConfirm" | "onCancel"
    >;
  };
}

/**
 * This component renders an `IconButton` with an `Edit` icon.
 */
const DeleteIconButton = ({
  icon = DEFAULT_ICON,
  confirm,
  onClick: onClickProp,
  slotProps,
  ...props
}: DeleteIconButtonProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  /** Callbacks */

  const onMouseDown: IconButtonProps["onMouseDown"] = (event) => {
    event.stopPropagation();
  };

  const onTouchStart: IconButtonProps["onTouchStart"] = (event) => {
    event.stopPropagation();
  };

  const onClick: IconButtonProps["onClick"] = (event) => {
    event.stopPropagation();

    if (confirm) setConfirmOpen(true);
    else onClickProp?.(event);
  };

  const handleConfirm: ComponentProps<typeof ConfirmDialog>["onConfirm"] = (
    event
  ) => {
    setConfirmOpen(false);
    onClickProp?.(event);
  };

  const handleCancel: ComponentProps<typeof ConfirmDialog>["onCancel"] = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <IconButton
        component="span"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={onClick}
        {...props}
      >
        {icon}
      </IconButton>
      {confirm && (
        <ConfirmDialog
          open={confirmOpen}
          {...(typeof confirm === "object" ? confirm : null)}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          {...slotProps?.confirmDialog}
        />
      )}
    </>
  );
};

export default DeleteIconButton;
