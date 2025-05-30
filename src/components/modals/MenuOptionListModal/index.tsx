import { type ReactNode, type ComponentProps } from "react";
import { useMediaQuery, type MenuProps } from "@mui/material";

import MenuOptionListDrawer from "../MenuOptionListDrawer";
import MenuOptionListMenu from "../MenuOptionListMenu";
import { EMPTY_OBJECT } from "@/constants/utility";

interface MenuOptionListModalProps {
  anchorEl?: MenuProps["anchorEl"];
  open: boolean;
  options: MenuOption[];
  disableCloseOnSelect?: boolean;
  title?: ReactNode;
  onClose: VoidFunction;
  slotProps?: {
    drawer?: Partial<ComponentProps<typeof MenuOptionListDrawer>>;
    menu?: Partial<ComponentProps<typeof MenuOptionListMenu>>;
  };
}

/**
 * This component renders either `MenuOptionListMenu` (desktop) or a
 * `MenuOptionListDrawer` (mobile) with a list of selectable options.
 */
const MenuOptionListModal = ({
  anchorEl,
  open,
  options,
  disableCloseOnSelect,
  title = "Options",
  onClose,
  slotProps: { drawer: drawerProps, menu: menuProps } = EMPTY_OBJECT,
}: MenuOptionListModalProps) => {
  /** Values */

  const isTouch = useMediaQuery("(pointer: coarse)");

  return isTouch ? (
    <MenuOptionListDrawer
      title={title}
      open={open}
      options={options}
      disableCloseOnSelect={disableCloseOnSelect}
      onClose={onClose}
      {...drawerProps}
    />
  ) : (
    <MenuOptionListMenu
      anchorEl={anchorEl}
      open={Boolean(open)}
      options={options}
      disableCloseOnSelect={disableCloseOnSelect}
      onClose={onClose}
      {...menuProps}
    />
  );
};

export default MenuOptionListModal;
