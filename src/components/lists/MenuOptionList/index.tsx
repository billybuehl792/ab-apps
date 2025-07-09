import { type ComponentProps } from "react";
import { MenuList, type MenuListProps } from "@mui/material";

import MenuOptionMenuItem from "@/components/menu-items/MenuOptionMenuItem";
import { EMPTY_OBJECT } from "@/store/constants/utility";

interface MenuOptionListProps extends MenuListProps {
  options: MenuOption[];
  slotProps?: {
    menuItem?: Partial<ComponentProps<typeof MenuOptionMenuItem>>;
  };
}

/**
 * This component renders a `MenuList` with a list of selectable options.
 */
const MenuOptionList = ({
  options,
  slotProps: { menuItem: menuItemProps } = EMPTY_OBJECT,
  ...props
}: MenuOptionListProps) => {
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

export default MenuOptionList;
