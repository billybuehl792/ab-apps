import { type ReactNode } from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { Add } from "@mui/icons-material";

const DEFAULT_ICON = <Add />;

interface AddIconButtonProps extends IconButtonProps {
  icon?: ReactNode;
}

/**
 * This component renders an `IconButton` with an `Add` icon.
 */
const AddIconButton = ({
  icon = DEFAULT_ICON,
  onClick: onClickProp,
  ...props
}: AddIconButtonProps) => {
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

export default AddIconButton;
