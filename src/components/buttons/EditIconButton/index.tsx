import { type ReactNode } from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { Edit } from "@mui/icons-material";

const DEFAULT_ICON = <Edit />;

interface EditIconButtonProps extends IconButtonProps {
  icon?: ReactNode;
}

/**
 * This component renders an `IconButton` with an `Edit` icon.
 */
const EditIconButton = ({
  icon = DEFAULT_ICON,
  onClick: onClickProp,
  ...props
}: EditIconButtonProps) => {
  /** Callbacks */

  const onMouseDown: IconButtonProps["onMouseDown"] = (event) => {
    event.stopPropagation();
  };

  const onTouchStart: IconButtonProps["onTouchStart"] = (event) => {
    event.stopPropagation();
  };

  const onClick: IconButtonProps["onClick"] = (event) => {
    event.stopPropagation();
    onClickProp?.(event);
  };

  return (
    <IconButton
      component="span"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onClick={onClick}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

export default EditIconButton;
