import { type ComponentProps, type FC } from "react";
import { Menu, type MenuProps } from "@mui/material";
import MenuOptionsList from "@/components/lists/MenuOptionsList";

interface MenuOptionsMenuProps extends Omit<MenuProps, "slotProps"> {
  options: MenuOption[];
  disableCloseOnSelect?: boolean;
  slotProps?: {
    list?: ComponentProps<typeof MenuOptionsList>;
  } & MenuProps["slotProps"];
}

/**
 * This component renders a `Menu` with a list of selectable options.
 */
const MenuOptionsMenu: FC<MenuOptionsMenuProps> = ({
  options,
  disableCloseOnSelect,
  onClose,
  slotProps: { list: listProps, ...slotProps } = {},
  ...props
}) => {
  return (
    <Menu
      id="menu"
      component="div"
      aria-hidden={false}
      disableAutoFocusItem
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
      onTouchStart={(event) => event.stopPropagation()}
      onClose={onClose}
      slotProps={{
        list: { component: "div", disablePadding: true },
        ...slotProps,
      }}
      {...props}
    >
      <MenuOptionsList
        options={options.map((option) => ({
          ...option,
          onClick: (event) => {
            option.onClick?.(event, option.id);
            if (!disableCloseOnSelect && !option.disableCloseOnSelect)
              onClose?.(event, "backdropClick");
          },
        }))}
        {...listProps}
      />
    </Menu>
  );
};

export default MenuOptionsMenu;
