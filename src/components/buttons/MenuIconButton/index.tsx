import { type ReactNode, type FC, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  type IconButtonProps,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import type { MenuOption } from "@/types/global";

interface MenuIconButton extends IconButtonProps {
  options: MenuOption[];
  icon?: ReactNode;
}

const MenuIconButton: FC<MenuIconButton> = ({
  options,
  icon = <MoreVert />,
  ...props
}) => {
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
        onMouseDown={(event: Event) => event.stopPropagation()}
        onClick={onClick}
        {...props}
      >
        {icon}
      </IconButton>
      <Menu
        id="menu"
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
      >
        {options
          .filter(({ render }) => render !== false)
          .map(({ id, label, icon, onClick }) => (
            <MenuItem
              key={id}
              onClick={(event) => onClose(() => onClick(id, event))}
            >
              {Boolean(icon) && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default MenuIconButton;
