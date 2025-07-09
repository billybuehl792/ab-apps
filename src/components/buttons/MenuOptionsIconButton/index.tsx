import { type ReactNode, useState, type ComponentProps } from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import MenuOptionListModal from "@/components/modals/MenuOptionListModal";
import { EMPTY_OBJECT } from "@/store/constants/utility";

const DEFAULT_ICON = <MoreVert />;

interface MenuOptionsIconButtonProps extends IconButtonProps<"span"> {
  options: MenuOption[];
  icon?: ReactNode;
  slotProps?: {
    menu?: Partial<ComponentProps<typeof MenuOptionListModal>>;
  };
}

/**
 * This component renders an `IconButton` with a menu or drawer containing a list of options.
 */
const MenuOptionsIconButton = ({
  options,
  title = "Options",
  icon = DEFAULT_ICON,
  onClick: onClickProp,
  slotProps: { menu: menuProps } = EMPTY_OBJECT,
  ...props
}: MenuOptionsIconButtonProps) => {
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
      <IconButton
        component="span"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={onClick}
        {...props}
      >
        {icon}
      </IconButton>
      {includeMenu && (
        <MenuOptionListModal
          title={title}
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

export default MenuOptionsIconButton;
