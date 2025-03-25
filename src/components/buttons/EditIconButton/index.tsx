import { type ReactNode, type FC } from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { Edit } from "@mui/icons-material";

interface EditIconButton extends IconButtonProps {
  icon?: ReactNode;
}

/**
 * This component renders an `IconButton` with an edit icon.
 * @param {EditIconButton} props
 * @param {ReactNode} [props.icon] - The icon to display in the `IconButton`.
 * @returns {ReactNode}
 */
const EditIconButton: FC<EditIconButton> = ({
  size = "small",
  icon = <Edit fontSize="small" />,
  onClick: onClickProp,
  ...props
}: EditIconButton): ReactNode => {
  /** Callbacks */

  const onClick: IconButtonProps["onClick"] = (event) => {
    event.stopPropagation();
    onClickProp?.(event);
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

export default EditIconButton;
