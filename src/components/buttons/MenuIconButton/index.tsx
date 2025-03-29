import {
  type ReactNode,
  type FC,
  useState,
  useRef,
  type MouseEvent,
  type TouchEvent,
  type ComponentProps,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { IconButton, type IconButtonProps } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import OptionMenu from "@/components/modals/OptionMenu";
import { sxUtils } from "@/utils/sx";

interface MenuIconButtonProps extends IconButtonProps {
  options: MenuOption[];
  icon?: ReactNode;
  slotProps?: {
    menu?: Partial<ComponentProps<typeof OptionMenu>>;
  };
}

/**
 * This component renders an `IconButton` with a menu that contains a list of options.
 * @param {MenuIconButtonProps} props
 * @param {MenuOption[]} props.options - An array of options to display in the menu.
 * @param {ReactNode} [props.icon] - The icon to display in the `IconButton`.
 * @param {MenuProps} [props.slotProps.menu] - Props for the `Menu` component.
 * @returns {ReactNode}
 */
const MenuIconButton: FC<MenuIconButtonProps> = ({
  options,
  icon = <MoreVert />,
  slotProps: { menu: menuProps } = {},
  ...props
}: MenuIconButtonProps): ReactNode => {
  const buttonId = useRef(`options-button-${uuidv4()}`);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton
        component="span"
        id={buttonId.current}
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
      <OptionMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        options={options}
        onClose={() => setAnchorEl(null)}
        {...menuProps}
      />
    </>
  );
};

export default MenuIconButton;
