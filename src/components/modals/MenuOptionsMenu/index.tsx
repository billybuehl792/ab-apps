import { type ComponentProps, type FC } from "react";
import { Menu, type MenuProps } from "@mui/material";
import MenuOptionsList from "@/components/lists/MenuOptionsList";
import { EMPTY_OBJECT } from "@/constants/utility";

interface MenuOptionsMenuProps extends Omit<MenuProps, "slotProps"> {
  options: MenuOption[];
  disableCloseOnSelect?: boolean;
  slotProps?: {
    list?: Partial<ComponentProps<typeof MenuOptionsList>>;
  } & MenuProps["slotProps"];
}

/**
 * This component renders a `Menu` with a list of selectable options.
 */
const MenuOptionsMenu: FC<MenuOptionsMenuProps> = ({
  options,
  disableCloseOnSelect,
  onClose,
  slotProps: { list: listProps, ...slotProps } = EMPTY_OBJECT,
  ...props
}: MenuOptionsMenuProps) => {
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
        list: { component: "div", disablePadding: true },
        ...slotProps,
      }}
      {...props}
    >
      <MenuOptionsList
        options={options.map((option) => ({
          ...option,
          onClick: (event) => {
            void option.onClick(event, option.id);
            if (!disableCloseOnSelect && !option.disableCloseOnSelect)
              onClose?.(event, "backdropClick");
          },
        }))}
        {...(typeof listProps === "object" ? listProps : EMPTY_OBJECT)}
      />
    </Menu>
  );
};

export default MenuOptionsMenu;
