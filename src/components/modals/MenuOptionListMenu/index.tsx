import { type ComponentProps } from "react";
import { Menu, type MenuProps } from "@mui/material";
import MenuOptionList from "@/components/lists/MenuOptionList";
import { EMPTY_OBJECT } from "@/store/constants/utility";

interface MenuOptionListMenuProps
  extends Omit<MenuProps, "slotProps" | "onClose"> {
  options: MenuOption[];
  disableCloseOnSelect?: boolean;
  onClose?: VoidFunction;
  slotProps?: {
    list?: Partial<ComponentProps<typeof MenuOptionList>>;
  } & MenuProps["slotProps"];
}

/**
 * This component renders a `Menu` with a list of selectable options.
 */
const MenuOptionListMenu = ({
  options,
  disableCloseOnSelect,
  onClose,
  slotProps: { list: listProps, ...slotProps } = EMPTY_OBJECT,
  ...props
}: MenuOptionListMenuProps) => {
  /** Callbacks */

  const onMouseDown: MenuProps["onMouseDown"] = (event) => {
    event.stopPropagation();
  };

  const onTouchStart: MenuProps["onTouchStart"] = (event) => {
    event.stopPropagation();
  };

  const onClick: MenuProps["onClick"] = (event) => {
    event.stopPropagation();
  };

  return (
    <Menu
      id="menu"
      component="div"
      aria-hidden={false}
      disableAutoFocusItem
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onClick={onClick}
      onClose={onClose}
      slotProps={{
        list: { component: "div" },
        ...slotProps,
      }}
      {...props}
    >
      <MenuOptionList
        options={options.map((option) => ({
          ...option,
          onClick: () => {
            if (!disableCloseOnSelect && !option.disableCloseOnSelect)
              onClose?.();

            option.onClick?.();
          },
        }))}
        {...(typeof listProps === "object" ? listProps : EMPTY_OBJECT)}
      />
    </Menu>
  );
};

export default MenuOptionListMenu;
