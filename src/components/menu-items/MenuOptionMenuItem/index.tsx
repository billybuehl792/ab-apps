import { type ComponentProps, useState } from "react";
import {
  ListItemIcon,
  type ListItemIconProps,
  ListItemText,
  type ListItemTextProps,
  MenuItem,
  type MenuItemProps,
} from "@mui/material";

import ConfirmDialog from "@/components/modals/ConfirmDialog";
import { sxAsArray } from "@/store/utils/sx";
import { EMPTY_OBJECT } from "@/store/constants/utility";

interface MenuOptionMenuItemProps extends MenuItemProps {
  option: MenuOption;
  slotProps?: {
    text?: ListItemTextProps;
    icon?: ListItemIconProps;
    confirmDialog?: Partial<ComponentProps<typeof ConfirmDialog>>;
  };
}

const MenuOptionMenuItem = ({
  option,
  slotProps: {
    text: textProps,
    icon: iconProps,
    confirmDialog: confirmDialogProps,
  } = EMPTY_OBJECT,
  ...props
}: MenuOptionMenuItemProps) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  /** Values */

  const color = option.color ? `${option.color}.main` : undefined;

  /** Callbacks */

  const onClick: MenuItemProps["onClick"] = () => {
    if (option.confirm) setConfirmDialogOpen(true);
    else option.onClick?.();
  };

  return (
    <>
      <MenuItem
        selected={option.selected}
        disabled={option.disabled}
        onClick={onClick}
        {...props}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sx={[{ color }, ...sxAsArray(props.sx)]}
      >
        {!!option.icon && (
          <ListItemIcon
            {...iconProps}
            sx={[
              { svg: { color } },
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              ...sxAsArray(iconProps?.sx),
            ]}
          >
            {option.icon}
          </ListItemIcon>
        )}
        <ListItemText {...textProps}>{option.label}</ListItemText>
      </MenuItem>
      {!!option.confirm && (
        <ConfirmDialog
          open={confirmDialogOpen}
          title={option.label}
          description={
            typeof option.confirm === "string" ? option.confirm : undefined
          }
          onConfirm={option.onClick}
          onCancel={() => {
            setConfirmDialogOpen(false);
          }}
          {...confirmDialogProps}
        />
      )}
    </>
  );
};

export default MenuOptionMenuItem;
