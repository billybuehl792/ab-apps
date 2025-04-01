import { type FC } from "react";
import {
  ListItemIcon,
  type ListItemIconProps,
  ListItemText,
  type ListItemTextProps,
  MenuItem,
  type MenuItemProps,
  MenuList,
  type MenuListProps,
} from "@mui/material";

interface MenuOptionsListProps extends MenuListProps {
  options: MenuOption[];
  slotProps?: {
    menuItem?: {
      text?: ListItemTextProps;
      icon?: ListItemIconProps;
    } & MenuItemProps;
  };
}

/**
 * This component renders a `MenuList` with a list of selectable options.
 */
const MenuOptionsList: FC<MenuOptionsListProps> = ({
  options,
  slotProps: {
    menuItem: { text: textProps, icon: iconProps, ...itemProps } = {},
  } = {},
  ...props
}) => {
  return (
    <MenuList {...props}>
      {options
        .filter(({ render }) => render !== false)
        .map((item) => (
          <MenuItem
            key={item.id}
            onClick={(event) => item?.onClick(event, item.id)}
            {...itemProps}
          >
            {!!item.icon && (
              <ListItemIcon {...iconProps}>{item.icon}</ListItemIcon>
            )}
            <ListItemText {...textProps}>{item.label}</ListItemText>
          </MenuItem>
        ))}
    </MenuList>
  );
};

export default MenuOptionsList;
