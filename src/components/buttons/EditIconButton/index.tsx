import {
  type ReactNode,
  type FC,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { Edit } from "@mui/icons-material";

interface EditIconButtonProps extends IconButtonProps {
  icon?: ReactNode;
}

/**
 * This component renders an `IconButton` with an `Edit` icon.
 */
const EditIconButton: FC<EditIconButtonProps> = ({
  icon = <Edit />,
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

export default EditIconButton;
