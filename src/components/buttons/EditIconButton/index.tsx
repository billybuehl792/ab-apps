import { IconButton, type IconButtonProps } from "@mui/material";
import { Edit, EditOff } from "@mui/icons-material";

interface EditIconButtonProps extends IconButtonProps {
  active?: boolean;
}

/**
 * This component renders an `IconButton` with an `Edit` icon.
 */
const EditIconButton = ({
  active,
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
      {active ? (
        <EditOff fontSize={props.size} />
      ) : (
        <Edit fontSize={props.size} />
      )}
    </IconButton>
  );
};

export default EditIconButton;
