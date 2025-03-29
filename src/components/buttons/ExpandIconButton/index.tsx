import {
  type ReactNode,
  type FC,
  type MouseEvent,
  type TouchEvent,
  useState,
} from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface ExpandIconButtonProps extends Omit<IconButtonProps, "onChange"> {
  expanded?: boolean;
  expandedIcon?: ReactNode;
  collapsedIcon?: ReactNode;
  onChange?: (expanded: boolean, event: MouseEvent | TouchEvent) => void;
}

/**
 * This component renders an expandable `IconButton` that toggles between two states.
 * @param {ExpandIconButtonProps} props - The props for the component.
 * @param {boolean} [props.expanded=false] - The initial expanded state of the button.
 * @param {ReactNode} [props.expandedIcon=<ExpandLess />] - The icon to display when expanded.
 * @param {ReactNode} [props.collapsedIcon=<ExpandMore />] - The icon to display when collapsed.
 * @param {function} [props.onChange] - Callback fired when the expanded state changes.
 * @returns {ReactNode} The rendered `IconButton` component.
 */
const ExpandIconButton: FC<ExpandIconButtonProps> = ({
  expanded: expandedProp,
  expandedIcon = <ExpandLess />,
  collapsedIcon = <ExpandMore />,
  onChange: onChangeProp,
  ...props
}: ExpandIconButtonProps): ReactNode => {
  const [expanded, setExpanded] = useState(expandedProp);

  /** Callbacks */

  const onChange = (event: MouseEvent, value: boolean) => {
    event.stopPropagation();

    setExpanded(value);
    onChangeProp?.(value, event);
  };

  return (
    <IconButton
      component="span"
      onMouseDown={(event: MouseEvent) => event.stopPropagation()}
      onTouchStart={(event: TouchEvent) => event.stopPropagation()}
      onClick={(event: MouseEvent) => onChange(event, !expanded)}
      {...props}
    >
      {expanded ? expandedIcon : collapsedIcon}
    </IconButton>
  );
};

export default ExpandIconButton;
