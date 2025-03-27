import { type ReactNode, type FC, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  IconButton,
  ListItemIcon,
  type ListItemIconProps,
  ListItemText,
  type ListItemTextProps,
  Menu,
  MenuItem,
  type MenuItemProps,
  type MenuProps,
  type IconButtonProps,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import type { MenuOption } from "@/types/global";
import { sxUtils } from "@/utils/sx";

interface MenuIconButton extends IconButtonProps {
  options: MenuOption[];
  icon?: ReactNode;
  slotProps?: {
    menu?: MenuProps;
    menuItem?: {
      text?: ListItemTextProps;
      icon?: ListItemIconProps;
    } & MenuItemProps;
  };
}

/**
 * This component renders an `IconButton` with a menu that contains a list of options.
 * @param {MenuIconButton} props
 * @param {MenuOption[]} props.options - An array of options to display in the menu.
 * @param {ReactNode} [props.icon] - The icon to display in the `IconButton`.
 * @param {MenuProps} [props.slotProps.menu] - Props for the `Menu` component.
 * @param {MenuItemProps} [props.slotProps.menuItem] - Props for the `MenuItem` component.
 * @param {ListItemTextProps} [props.slotProps.menuItem.text] - Props for the `ListItemText` component.
 * @param {ListItemIconProps} [props.slotProps.menuItem.icon] - Props for the `ListItemIcon` component.
 * @returns {ReactNode}
 */
const MenuIconButton: FC<MenuIconButton> = ({
  options,
  size = "small",
  icon = <MoreVert fontSize={size} />,
  slotProps: {
    menu: menuProps,
    menuItem: {
      text: listItemTextProps,
      icon: listItemIconProps,
      ...menuItemProps
    } = {},
  } = {},
  ...props
}: MenuIconButton): ReactNode => {
  const buttonId = useRef(`options-button-${uuidv4()}`);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /** Callbacks */

  const onClick: IconButtonProps["onClick"] = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const onClose = (callback?: VoidFunction) => {
    callback?.();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        component="span"
        id={buttonId.current}
        size={size}
        onMouseDown={(event: Event) => event.stopPropagation()}
        onClick={onClick}
        {...props}
        sx={[
          { visibility: anchorEl ? "visible !important" : undefined },
          ...sxUtils.asArray(props?.sx),
        ]}
      >
        {icon}
      </IconButton>
      <Menu
        id="menu"
        aria-hidden={false}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          list: {
            "aria-labelledby": buttonId.current,
          },
        }}
        {...menuProps}
      >
        {options
          .filter(({ render }) => render !== false)
          .map(({ id, label, icon, onClick }) => (
            <MenuItem
              key={id}
              onClick={(event) => onClose(() => onClick(event, id))}
              {...menuItemProps}
            >
              {Boolean(icon) && (
                <ListItemIcon {...listItemIconProps}>{icon}</ListItemIcon>
              )}
              <ListItemText {...listItemTextProps}>{label}</ListItemText>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default MenuIconButton;
