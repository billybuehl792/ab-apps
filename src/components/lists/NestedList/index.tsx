import { type ComponentProps, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  type ListItemProps,
  type ListProps,
  Typography,
} from "@mui/material";
import ExpandIconButton from "@/components/buttons/ExpandIconButton";

interface NestedListProps extends ListProps {
  items: ListItem[];
  slotProps?: {
    item?: Partial<ComponentProps<typeof NestedListItem>>;
  };
}

interface NestedListItemProps extends ListItemProps {
  item: ListItem;
  indent?: number;
}

const NestedList = ({ items, slotProps, ...props }: NestedListProps) => {
  return (
    <List disablePadding dense {...props}>
      {items
        .filter(({ render }) => render !== false)
        .map((item) => (
          <NestedListItem key={item.id} item={item} {...slotProps?.item} />
        ))}
    </List>
  );
};

const NestedListItem = ({
  item,
  indent = 2,
  ...props
}: NestedListItemProps) => {
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
              onChange={(value) => {
                setExpanded(value);
              }}
            />
          ),
        })}
        {...props}
      >
        <ListItemButton
          selected={item.selected}
          disabled={item.disabled}
          {...(item.link && { LinkComponent: Link, ...item.link })}
          onClick={item.onClick}
        >
          {!!item.icon && (
            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
          )}
          <ListItemText>
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
