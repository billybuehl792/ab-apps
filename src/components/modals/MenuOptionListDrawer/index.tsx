import { type ComponentProps } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MenuList, useMediaQuery } from "@mui/material";
import { theme } from "@/store/config/theme";
import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import MenuOptionMenuItem from "@/components/menu-items/MenuOptionMenuItem";

interface MenuOptionListDrawerProps
  extends Partial<ComponentProps<typeof SwipeableDrawer>> {
  options: MenuOption[];
  disableCloseOnSelect?: boolean;
}

/**
 * This component renders a `SwipeableDrawer` with a list of selectable options.
 */
const MenuOptionListDrawer = ({
  options,
  disableCloseOnSelect,
  title = "Options",
  onClose,
  ...props
}: MenuOptionListDrawerProps) => {
  /** Values */

  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const navigate = useNavigate();

  /** Callbacks */

  const handleMenuItemClicked = (option: MenuOption) => {
    if (option.link) void navigate(option.link);
    else if (option.onClick) option.onClick();
  };

  return (
    <SwipeableDrawer
      title={title}
      anchor={isSm ? "right" : "bottom"}
      onClose={onClose}
      {...props}
    >
      <MenuList sx={{ minWidth: 300 }}>
        {options
          .filter(({ render }) => render !== false)
          .map(({ onClick, link, ...option }) => (
            <MenuOptionMenuItem
              key={option.id}
              option={option}
              onClick={() => {
                if (!disableCloseOnSelect || !option.disableCloseOnSelect) {
                  onClose?.();
                  setTimeout(() => {
                    handleMenuItemClicked({ link, onClick, ...option });
                  }, theme.transitions.duration.leavingScreen);
                } else handleMenuItemClicked({ link, onClick, ...option });
              }}
            />
          ))}
      </MenuList>
    </SwipeableDrawer>
  );
};

export default MenuOptionListDrawer;
