import { type ComponentProps, useState, type FC, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  type ListItemButtonProps,
  ListItemIcon,
  type ListItemIconProps,
  ListItemText,
  type ListItemTextProps,
  type ListItemProps,
  type ListProps,
  Typography,
} from "@mui/material";

import ExpandIconButton from "@/components/buttons/ExpandIconButton";
import { sxAsArray } from "@/lib/utils/sx";

interface NestedListProps extends ListProps {
  items: ListItem[];
  slotProps?: {
    item?: Partial<ComponentProps<typeof NestedListItem>>;
  };
}

interface NestedListItemProps extends ListItemProps {
  item: ListItem;
  indent?: number;
  slotProps?: {
    button: ListItemButtonProps;
    icon?: ListItemIconProps;
    text?: ListItemTextProps;
  } & ListItemProps["slotProps"];
}

const NestedList: FC<NestedListProps> = ({
  items,
  slotProps: { item: itemProps } = {},
  ...props
}) => {
  return (
    <List disablePadding dense {...props}>
      {items
        .filter(({ render }) => render !== false)
        .map((item) => (
          <NestedListItem key={item.id} item={item} {...itemProps} />
        ))}
    </List>
  );
};

const NestedListItem: FC<NestedListItemProps> = ({
  item,
  indent = 2,
  slotProps: {
    button: buttonProps,
    icon: iconProps,
    text: textProps,
    ...slotProps
  } = {},
  ...props
}) => {
  const [expanded, setExpanded] = useState(false);

  /** Values */

  const hasChildren =
    item.items?.some(({ render }) => render !== false) ?? false;

  /** Effects */

  useEffect(() => {
    setExpanded(!!item.expanded);
  }, [item.expanded]);

  return (
    <>
      <ListItem
        disablePadding
        {...(hasChildren && {
          secondaryAction: (
            <ExpandIconButton
              expanded={item.expanded || expanded}
              onChange={(value) => setExpanded(value)}
            />
          ),
        })}
        {...slotProps}
        {...props}
      >
        <ListItemButton
          selected={item.selected}
          disabled={item.disabled}
          {...(!!item.to && { component: Link, to: item.to })}
          onClick={(event) => item?.onClick?.(event, item.id)}
          {...buttonProps}
          sx={[{ pl: indent }, ...sxAsArray(buttonProps?.sx)]}
        >
          {!!item?.icon && (
            <ListItemIcon
              {...iconProps}
              sx={[{ minWidth: 36 }, ...sxAsArray(iconProps?.sx)]}
            >
              {item.icon}
            </ListItemIcon>
          )}
          <ListItemText {...textProps}>
            <Typography
              variant="body2"
              fontWeight={item.selected ? 600 : 500}
              noWrap
            >
              {item.label}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>

      {hasChildren && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <NestedList
            component="div"
            items={item.items ?? []}
            slotProps={{ item: { indent: indent + 2 } }}
          />
        </Collapse>
      )}
    </>
  );
};

export default NestedList;
