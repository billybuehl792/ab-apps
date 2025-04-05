import {
  type ReactNode,
  type FC,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { Add } from "@mui/icons-material";

interface AddIconButtonProps extends IconButtonProps {
  icon?: ReactNode;
}

/**
 * This component renders an `IconButton` with an `Add` icon.
 */
const AddIconButton: FC<AddIconButtonProps> = ({
  size,
  icon = <Add fontSize={size} />,
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

export default AddIconButton;
