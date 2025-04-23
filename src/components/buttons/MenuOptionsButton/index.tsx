import { useState, type ComponentProps } from "react";
import { type ButtonProps, type IconButtonProps, Button } from "@mui/material";

import MenuOptionsModal from "@/components/modals/MenuOptionsModal";
import { EMPTY_OBJECT } from "@/constants/utility";

interface MenuOptionsButtonProps extends ButtonProps {
  options: MenuOption[];
  slotProps?: {
    menu?: Partial<ComponentProps<typeof MenuOptionsModal>>;
  };
}

/**
 * This component renders a `Button` with a menu or drawer containing a list of options.
 */
const MenuOptionsButton = ({
  options,
  onClick: onClickProp,
  slotProps: { menu: menuProps } = EMPTY_OBJECT,
  ...props
}: MenuOptionsButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /** Values */

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
      {includeMenu && (
        <MenuOptionsModal
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          options={options}
          onClose={onMenuClose}
          {...menuProps}
        />
      )}
    </>
  );
};

export default MenuOptionsButton;
