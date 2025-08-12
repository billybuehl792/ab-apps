import { Link } from "@tanstack/react-router";
import {
  ListItemIcon,
  type ListItemIconProps,
  ListItemText,
  type ListItemTextProps,
  MenuItem,
  type MenuItemProps,
} from "@mui/material";
import { sxAsArray } from "@/store/utils/sx";

interface MenuOptionMenuItemProps extends MenuItemProps {
  option: MenuOption;
  slotProps?: {
    text?: ListItemTextProps;
    icon?: ListItemIconProps;
  };
}

const MenuOptionMenuItem = ({
  option,
  slotProps,
  ...props
}: MenuOptionMenuItemProps) => {
  /** Values */

  const color = option.color ? `${option.color}.main` : undefined;

  return (
    <MenuItem
      selected={option.selected}
      disabled={option.disabled}
      onClick={option.onClick}
      {...(!!option.link && {
        component: Link,
        ...option.link,
      })}
      {...props}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sx={[{ color }, ...sxAsArray(props.sx)]}
    >
      {!!option.icon && (
        <ListItemIcon
          {...slotProps?.icon}
          sx={[
            { svg: { color } },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ...sxAsArray(slotProps?.icon?.sx),
          ]}
        >
          {option.icon}
        </ListItemIcon>
      )}
      <ListItemText
        primary={option.label}
        secondary={option.description}
        {...slotProps?.text}
      />
    </MenuItem>
  );
};

export default MenuOptionMenuItem;
