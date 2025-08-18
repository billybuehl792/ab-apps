import { Menu, type MenuProps } from "@mui/material";
import MenuOptionMenuItem from "@/components/menu-items/MenuOptionMenuItem";

interface MenuOptionListMenuProps extends Omit<MenuProps, "slotProps"> {
  options: MenuOption[];
  disableCloseOnSelect?: boolean;
  onClose?: VoidFunction;
}

/**
 * This component renders a `Menu` with a list of selectable options.
 */
const MenuOptionListMenu = ({
  options,
  disableCloseOnSelect,
  onClose,
  ...props
}: MenuOptionListMenuProps) => {
  return (
    <Menu id="menu" component="div" onClose={onClose} {...props}>
      {options
        .filter(({ render }) => render !== false)
        .map(({ onClick, ...option }) => (
          <MenuOptionMenuItem
            key={option.id}
            option={option}
            onClick={() => {
              if (!disableCloseOnSelect || !option.disableCloseOnSelect)
                onClose?.();
              onClick?.();
            }}
          />
        ))}
    </Menu>
  );
};

export default MenuOptionListMenu;
