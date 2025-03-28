import { type FC } from "react";
import {
  Box,
  type BoxProps,
  ListItemIcon,
  type ListItemIconProps,
  ListItemText,
  type ListItemTextProps,
  MenuItem,
  MenuList,
  type MenuListProps,
  Stack,
  SwipeableDrawer,
  type SwipeableDrawerProps,
} from "@mui/material";
import { sxUtils } from "@/utils/sx";

interface OptionDrawerProps
  extends Omit<Partial<SwipeableDrawerProps>, "slotProps"> {
  options: MenuOption[];
  fullHeight?: boolean;
  disableCloseOnSelect?: boolean;
  slotProps?: {
    container?: MenuListProps;
    menuItem?: {
      text?: ListItemTextProps;
      icon?: ListItemIconProps;
    };
  } & SwipeableDrawerProps["slotProps"];
}

const Puller: FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={[
      {
        width: 30,
        height: 5,
        borderRadius: 10,
        bgcolor: ({ palette }) => palette.grey[400],
        m: 1,
      },
      ...sxUtils.asArray(props?.sx),
    ]}
  />
);

/**
 * This component renders a `SwipeableDrawer` with a list of selectable options.
 * @param {OptionDrawerProps} props - The props for the `OptionDrawer` component.
 * @param {MenuOption[]} props.options - An array of options to display in the drawer.
 * @param {boolean} [props.fullHeight] - If true, the drawer will take up most of the screen height.
 * @param {boolean} [props.disableCloseOnSelect] - If true, the drawer will not close when an option is selected.
 * @param {Object} [props.slotProps] - Additional props for customizing the drawer and its contents.
 * @param {MenuListProps} [props.slotProps.container] - Props for the `MenuList` component.
 * @param {Object} [props.slotProps.menuItem] - Props for customizing individual menu items.
 * @param {ListItemTextProps} [props.slotProps.menuItem.text] - Props for the `ListItemText` component.
 * @param {ListItemIconProps} [props.slotProps.menuItem.icon] - Props for the `ListItemIcon` component.
 * @returns {React.JSX.Element} The rendered `OptionDrawer` component.
 */
const OptionDrawer: FC<OptionDrawerProps> = ({
  options,
  fullHeight,
  disableCloseOnSelect: keepOpen,
  onClose: onCloseProp,
  slotProps: {
    container: containerProps,
    menuItem: {
      icon: listItemIconProps,
      text: listItemTextProps,
      ...menuItemProps
    } = {},
    ...slotProps
  } = {},
  ...props
}: OptionDrawerProps): React.JSX.Element => {
  /** Callbacks */

  const onClose: SwipeableDrawerProps["onClose"] = (event) =>
    onCloseProp?.(event);

  return (
    <SwipeableDrawer
      anchor="bottom"
      onOpen={() => null}
      onClose={onClose}
      ModalProps={{ keepMounted: false }}
      slotProps={slotProps}
      sx={{ height: fullHeight ? "95vh" : "auto" }}
      {...props}
    >
      <Stack direction="row" justifyContent="center">
        <Puller />
      </Stack>

      <MenuList {...containerProps}>
        {options
          .filter(({ render }) => render !== false)
          .map(({ id, label, icon, disableCloseOnSelect, onClick }) => (
            <MenuItem
              key={id}
              onClick={(event) => {
                onClick(event, id);
                if (!disableCloseOnSelect && !keepOpen) onClose?.(event);
              }}
              {...menuItemProps}
            >
              {Boolean(icon) && (
                <ListItemIcon {...listItemIconProps}>{icon}</ListItemIcon>
              )}
              <ListItemText {...listItemTextProps}>{label}</ListItemText>
            </MenuItem>
          ))}
      </MenuList>
    </SwipeableDrawer>
  );
};

export default OptionDrawer;
