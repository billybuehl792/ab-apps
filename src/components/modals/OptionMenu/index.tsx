import { type FC } from "react";
import {
  Menu,
  MenuItem,
  type MenuProps,
  type ListItemIconProps,
  ListItemText,
  type ListItemTextProps,
  ListItemIcon,
} from "@mui/material";

interface OptionMenuProps extends Omit<MenuProps, "slotProps"> {
  options: MenuOption[];
  disableCloseOnSelect?: boolean;
  slotProps?: {
    menuItem?: {
      text?: ListItemTextProps;
      icon?: ListItemIconProps;
    };
  } & MenuProps["slotProps"];
}

/**
 * This component renders a `Menu` with a list of selectable options.
 * @param {OptionMenuProps} props - The props for the `OptionMenu` component.
 * @param {MenuOption[]} props.options - An array of options to display in the menu.
 * @param {boolean} [props.disableCloseOnSelect] - If true, the menu will not close when an option is selected.
 * @param {Object} [props.slotProps] - Additional props for customizing the menu and its items.
 * @param {Object} [props.slotProps.menuItem] - Props for customizing individual menu items.
 * @param {ListItemTextProps} [props.slotProps.menuItem.text] - Props for the `ListItemText` component.
 * @param {ListItemIconProps} [props.slotProps.menuItem.icon] - Props for the `ListItemIcon` component.
 * @returns {React.JSX.Element} The rendered `OptionMenu` component.
 */
const OptionMenu: FC<OptionMenuProps> = ({
  options,
  disableCloseOnSelect: keepOpen,
  onClose,
  slotProps: {
    menuItem: {
      icon: listItemIconProps,
      text: listItemTextProps,
      ...menuItemProps
    } = {},
    ...slotProps
  } = {},
  ...props
}: OptionMenuProps): React.JSX.Element => {
  return (
    <Menu
      id="menu"
      aria-hidden={false}
      disableAutoFocusItem
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
      onTouchStart={(event) => event.stopPropagation()}
      onClose={onClose}
      slotProps={slotProps}
      {...props}
    >
      {options
        .filter(({ render }) => render !== false)
        .map(({ id, label, icon, disableCloseOnSelect, onClick }) => (
          <MenuItem
            key={id}
            onClick={(event) => {
              onClick(event, id);
              if (!disableCloseOnSelect && !keepOpen)
                onClose?.(new Event("close"), "backdropClick");
            }}
            {...menuItemProps}
          >
            {Boolean(icon) && (
              <ListItemIcon {...listItemIconProps}>{icon}</ListItemIcon>
            )}
            <ListItemText {...listItemTextProps}>{label}</ListItemText>
          </MenuItem>
        ))}
    </Menu>
  );
};

export default OptionMenu;
