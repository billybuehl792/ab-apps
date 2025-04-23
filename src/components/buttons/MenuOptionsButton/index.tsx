import { useState, type ComponentProps } from "react";
import {
  type ButtonProps,
  useMediaQuery,
  type IconButtonProps,
  Button,
} from "@mui/material";

import MenuOptionsMenu from "@/components/modals/MenuOptionsMenu";
import MenuOptionsDrawer from "@/components/modals/MenuOptionsDrawer";
import { EMPTY_OBJECT } from "@/constants/utility";

interface MenuOptionsButtonProps extends ButtonProps {
  options: MenuOption[];
  slotProps?: {
    drawer?: Partial<ComponentProps<typeof MenuOptionsDrawer>>;
    menu?: Partial<ComponentProps<typeof MenuOptionsMenu>>;
  };
}

/**
 * This component renders a `Button` with a menu or drawer containing a list of options.
 */
const MenuOptionsButton = ({
  options,
  onClick: onClickProp,
  slotProps: { drawer: drawerProps, menu: menuProps } = EMPTY_OBJECT,
  ...props
}: MenuOptionsButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /** Values */

  const isMobile = useMediaQuery("(pointer: coarse)");
  const includeMenu = !onClickProp;

  /** Callbacks */

  const onMouseDown: IconButtonProps["onMouseDown"] = (event) => {
    event.stopPropagation();
  };

  const onTouchStart: IconButtonProps["onTouchStart"] = (event) => {
    event.stopPropagation();
  };

  const onClick: IconButtonProps["onClick"] = (event) => {
    event.stopPropagation();
    if (includeMenu) setAnchorEl(event.currentTarget);
    else onClickProp(event);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={onClick}
        {...props}
      />
      {includeMenu &&
        (isMobile ? (
          <MenuOptionsDrawer
            open={Boolean(anchorEl)}
            options={options}
            onClose={onMenuClose}
            {...drawerProps}
          />
        ) : (
          <MenuOptionsMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            options={options}
            onClose={onMenuClose}
            {...menuProps}
          />
        ))}
    </>
  );
};

export default MenuOptionsButton;
