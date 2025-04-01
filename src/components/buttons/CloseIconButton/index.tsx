import {
  type ReactNode,
  type FC,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { Close } from "@mui/icons-material";

interface CloseIconButtonProps extends IconButtonProps {
  icon?: ReactNode;
}

/**
 * This component renders an `IconButton` with a `Close` icon.
 */
const CloseIconButton: FC<CloseIconButtonProps> = ({
  icon = <Close />,
  onClick,
  ...props
}) => {
  return (
    <IconButton
      component="span"
      onMouseDown={(event: MouseEvent) => event.stopPropagation()}
      onTouchStart={(event: TouchEvent) => event.stopPropagation()}
      onClick={(
        event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
      ) => {
        event.stopPropagation();
        onClick?.(event);
      }}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

export default CloseIconButton;
