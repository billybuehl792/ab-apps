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
import { EMPTY_OBJECT } from "@/constants/utility";

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

  /** Callbacks */

  const onClick: MenuItemProps["onClick"] = (event) => {
    if (option.confirm) {
      event.stopPropagation();
      setConfirmDialogOpen(true);
    } else void option.onClick(event, option.id);
  };

  return (
    <>
      <MenuItem key={option.id} onClick={onClick} {...props}>
        {!!option.icon && (
          <ListItemIcon {...iconProps}>{option.icon}</ListItemIcon>
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
          onConfirm={(event) => {
            void option.onClick(event, option.id);
          }}
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
