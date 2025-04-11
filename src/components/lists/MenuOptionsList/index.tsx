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

import { EMPTY_OBJECT } from "@/constants/utility";

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
const MenuOptionsList = ({
  options,
  slotProps: {
    menuItem: { text: textProps, icon: iconProps, ...itemProps } = {},
  } = EMPTY_OBJECT,
  ...props
}: MenuOptionsListProps) => {
  return (
    <MenuList {...props}>
      {options
        .filter(({ render }) => render !== false)
        .map((item) => (
          <MenuItem
            key={item.id}
            onClick={(event) => {
              void item.onClick(event, item.id);
            }}
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
