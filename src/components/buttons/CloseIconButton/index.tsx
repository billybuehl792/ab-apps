import { type ReactNode, type FC } from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { Close } from "@mui/icons-material";

interface CloseIconButton extends Omit<IconButtonProps, "onClick"> {
  icon?: ReactNode;
  onClick?: (event: CloseEvent, reason: "escapeKeyDown") => void;
}

/**
 * This component renders an `IconButton` with a `Close` icon.
 * @param {CloseIconButton} props
 * @param {ReactNode} [props.icon] - The icon to display in the `IconButton`.
 * @returns {ReactNode}
 */
const CloseIconButton: FC<CloseIconButton> = ({
  size = "small",
  icon = <Close fontSize={size} />,
  onClick: onClickProp,
  ...props
}: CloseIconButton): ReactNode => {
  /** Callbacks */

  const onClick: IconButtonProps["onClick"] = (event) => {
    event.stopPropagation();
    onClickProp?.(new CloseEvent("close"), "escapeKeyDown");
  };

  return (
    <IconButton
      component="span"
      size={size}
      onMouseDown={(event: Event) => event.stopPropagation()}
      onClick={onClick}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

export default CloseIconButton;
