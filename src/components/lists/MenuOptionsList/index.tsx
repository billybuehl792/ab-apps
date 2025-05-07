import { type ComponentProps } from "react";
import { MenuList, type MenuListProps } from "@mui/material";

import MenuOptionMenuItem from "@/components/menu-items/MenuOptionMenuItem";
import { EMPTY_OBJECT } from "@/constants/utility";

interface MenuOptionsListProps extends MenuListProps {
  options: MenuOption[];
  slotProps?: {
    menuItem?: Partial<ComponentProps<typeof MenuOptionMenuItem>>;
  };
}

/**
 * This component renders a `MenuList` with a list of selectable options.
 */
const MenuOptionsList = ({
  options,
  slotProps: { menuItem: menuItemProps } = EMPTY_OBJECT,
  ...props
}: MenuOptionsListProps) => {
  return (
    <MenuList {...props}>
      {options
        .filter(({ render }) => render !== false)
        .map((option) => (
          <MenuOptionMenuItem
            key={option.id}
            option={option}
            {...menuItemProps}
          />
        ))}
    </MenuList>
  );
};

export default MenuOptionsList;
