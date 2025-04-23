import { ReactEventHandler, type ReactNode, type ComponentProps } from "react";
import { useMediaQuery, type MenuProps } from "@mui/material";

import MenuOptionsDrawer from "../MenuOptionsDrawer";
import MenuOptionsMenu from "../MenuOptionsMenu";
import { EMPTY_OBJECT } from "@/constants/utility";

interface MenuOptionsModalProps {
  anchorEl?: MenuProps["anchorEl"];
  open: boolean;
  options: MenuOption[];
  disableCloseOnSelect?: boolean;
  title?: ReactNode;
  onClose: ReactEventHandler<CloseEvent>;
  slotProps?: {
    drawer?: Partial<ComponentProps<typeof MenuOptionsDrawer>>;
    menu?: Partial<ComponentProps<typeof MenuOptionsMenu>>;
  };
}

/**
 * This component renders either `MenuOptionsMenu` (desktop) or a
 * `MenuOptionsDrawer` (mobile) with a list of selectable options.
 */
const MenuOptionsModal = ({
  anchorEl,
  open,
  options,
  disableCloseOnSelect,
  title = "Options",
  onClose,
  slotProps: { drawer: drawerProps, menu: menuProps } = EMPTY_OBJECT,
}: MenuOptionsModalProps) => {
  /** Values */

  const isMobile = useMediaQuery("(pointer: coarse)");

  return isMobile ? (
    <MenuOptionsDrawer
      open={open}
      options={options}
      title={title}
      fullHeight
      disableCloseOnSelect={disableCloseOnSelect}
      onClose={onClose}
      {...drawerProps}
    />
  ) : (
    <MenuOptionsMenu
      anchorEl={anchorEl}
      open={Boolean(open)}
      options={options}
      disableCloseOnSelect={disableCloseOnSelect}
      onClose={onClose}
      {...menuProps}
    />
  );
};

export default MenuOptionsModal;
