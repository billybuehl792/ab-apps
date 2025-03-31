import {
  type ReactNode,
  type FC,
  useState,
  type MouseEvent,
  type TouchEvent,
  type ComponentProps,
  useId,
} from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import OptionsMenu from "@/components/modals/OptionsMenu";
import { sxUtils } from "@/utils/sx";

interface MenuOptionsIconButtonProps extends IconButtonProps {
  options: MenuOption[];
  icon?: ReactNode;
  slotProps?: {
    menu?: Partial<ComponentProps<typeof OptionsMenu>>;
  };
}

/**
 * This component renders an `IconButton` with a menu that contains a list of options.
 * @param {MenuOptionsIconButtonProps} props
 * @param {MenuOption[]} props.options - An array of options to display in the menu.
 * @param {ReactNode} [props.icon] - The icon to display in the `IconButton`.
 * @param {MenuProps} [props.slotProps.menu] - Props for the `Menu` component.
 * @returns {ReactNode}
 */
const MenuOptionsIconButton: FC<MenuOptionsIconButtonProps> = ({
  options,
  icon = <MoreVert />,
  slotProps: { menu: menuProps } = {},
  ...props
}: MenuOptionsIconButtonProps): ReactNode => {
  const buttonId = useId();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton
        component="span"
        id={buttonId}
        onMouseDown={(event: MouseEvent) => event.stopPropagation()}
        onTouchStart={(event: TouchEvent) => event.stopPropagation()}
        onClick={(event: MouseEvent) => {
          event.stopPropagation();
          setAnchorEl(event.currentTarget as HTMLElement);
        }}
        {...props}
        sx={[
          { visibility: anchorEl ? "visible !important" : undefined },
          ...sxUtils.asArray(props?.sx),
        ]}
      >
        {icon}
      </IconButton>
      <OptionsMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        options={options}
        onClose={() => setAnchorEl(null)}
        {...menuProps}
      />
    </>
  );
};

export default MenuOptionsIconButton;
