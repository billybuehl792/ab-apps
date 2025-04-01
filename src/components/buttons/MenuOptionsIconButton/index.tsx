import {
  type ReactNode,
  type FC,
  useState,
  type MouseEvent,
  type TouchEvent,
  type ComponentProps,
} from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import MenuOptionsMenu from "@/components/modals/MenuOptionsMenu";
import { sxUtils } from "@/utils/sx";

interface MenuOptionsIconButtonProps extends IconButtonProps {
  options: MenuOption[];
  icon?: ReactNode;
  slotProps?: {
    menu?: Partial<ComponentProps<typeof MenuOptionsMenu>>;
  };
}

/**
 * This component renders an `IconButton` with a menu that contains a list of options.
 */
const MenuOptionsIconButton: FC<MenuOptionsIconButtonProps> = ({
  options,
  icon = <MoreVert />,
  onClick,
  slotProps: { menu: menuProps } = {},
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /** Callbacks */

  return (
    <>
      <IconButton
        component="span"
        onMouseDown={(event: MouseEvent) => event.stopPropagation()}
        onTouchStart={(event: TouchEvent) => event.stopPropagation()}
        onClick={(
          event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
          event.stopPropagation();

          if (onClick) onClick(event);
          else setAnchorEl(event.currentTarget);
        }}
        {...props}
        sx={[
          { visibility: anchorEl ? "visible !important" : undefined },
          ...sxUtils.asArray(props?.sx),
        ]}
      >
        {icon}
      </IconButton>
      {!onClick && (
        <MenuOptionsMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          options={options}
          onClose={() => setAnchorEl(null)}
          {...menuProps}
        />
      )}
    </>
  );
};

export default MenuOptionsIconButton;
