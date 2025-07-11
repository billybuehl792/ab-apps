import { type ComponentProps } from "react";
import { MenuList, type MenuListProps } from "@mui/material";
import MenuOptionMenuItem from "@/components/menu-items/MenuOptionMenuItem";

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
  slotProps,
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
            {...slotProps?.menuItem}
          />
        ))}
    </MenuList>
  );
};

export default MenuOptionList;
