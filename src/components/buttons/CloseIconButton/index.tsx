import {
  type ReactNode,
  type FC,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { Close } from "@mui/icons-material";

interface CloseIconButtonProps extends Omit<IconButtonProps, "onClick"> {
  icon?: ReactNode;
  onClick?: (event: CloseEvent, reason: "escapeKeyDown") => void;
}

/**
 * This component renders an `IconButton` with a `Close` icon.
 * @param {CloseIconButtonProps} props
 * @param {ReactNode} [props.icon] - The icon to display in the `IconButton`.
 * @returns {ReactNode}
 */
const CloseIconButton: FC<CloseIconButtonProps> = ({
  size = "small",
  icon = <Close fontSize={size} />,
  onClick: onClickProp,
  ...props
}: CloseIconButtonProps): ReactNode => {
  /** Callbacks */

  const onClick: IconButtonProps["onClick"] = (event) => {
    event.stopPropagation();
    onClickProp?.(new CloseEvent("close"), "escapeKeyDown");
  };

  return (
    <IconButton
      component="span"
      size={size}
      onMouseDown={(event: MouseEvent) => event.stopPropagation()}
      onTouchStart={(event: TouchEvent) => event.stopPropagation()}
      onClick={onClick}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

export default CloseIconButton;
