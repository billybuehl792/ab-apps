import { type ReactNode, useState, type ComponentProps } from "react";
import { IconButton, useMediaQuery, type IconButtonProps } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import MenuOptionsMenu from "@/components/modals/MenuOptionsMenu";
import MenuOptionsDrawer from "@/components/modals/MenuOptionsDrawer";
import { EMPTY_OBJECT } from "@/constants/utility";

const DEFAULT_ICON = <MoreVert />;

interface MenuOptionsIconButtonProps extends IconButtonProps<"span"> {
  options: MenuOption[];
  icon?: ReactNode;
  slotProps?: {
    menu?: Partial<ComponentProps<typeof MenuOptionsMenu>>;
  };
}

/**
 * This component renders an `IconButton` with a menu that contains a list of options.
 */
const MenuOptionsIconButton = ({
  options,
  icon = DEFAULT_ICON,
  onClick: onClickProp,
  slotProps: { menu: menuProps } = EMPTY_OBJECT,
  ...props
}: MenuOptionsIconButtonProps) => {
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
      <IconButton
        component="span"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={onClick}
        {...props}
      >
        {icon}
      </IconButton>
      {includeMenu &&
        (isMobile ? (
          <MenuOptionsDrawer
            open={Boolean(anchorEl)}
            options={options}
            onClose={onMenuClose}
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

export default MenuOptionsIconButton;
