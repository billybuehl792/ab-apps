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
 * @param {EditIconButtonProps} props
 * @param {ReactNode} [props.icon] - The icon to display in the `IconButton`.
 * @returns {ReactNode}
 */
const EditIconButton: FC<EditIconButtonProps> = ({
  icon = <Edit />,
  onClick: onClickProp,
  ...props
}: EditIconButtonProps): ReactNode => {
  /** Callbacks */

  const onClick: IconButtonProps["onClick"] = (event) => {
    event.stopPropagation();
    onClickProp?.(event);
  };

  return (
    <IconButton
      component="span"
      onMouseDown={(event: MouseEvent) => event.stopPropagation()}
      onTouchStart={(event: TouchEvent) => event.stopPropagation()}
      onClick={onClick}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

export default EditIconButton;
