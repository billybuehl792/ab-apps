import { type ComponentProps } from "react";

import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import MenuOptionList from "@/components/lists/MenuOptionList";
import { EMPTY_OBJECT } from "@/constants/utility";
import { useMediaQuery } from "@mui/material";
import { sxAsArray } from "@/utils/sx";

interface MenuOptionListDrawerProps
  extends Omit<Partial<ComponentProps<typeof SwipeableDrawer>>, "slotProps"> {
  options: MenuOption[];
  disableCloseOnSelect?: boolean;
  slotProps?: {
    list?: Partial<ComponentProps<typeof MenuOptionList>>;
  } & ComponentProps<typeof SwipeableDrawer>["slotProps"];
}

/**
 * This component renders a `SwipeableDrawer` with a list of selectable options.
 */
const MenuOptionListDrawer = ({
  options,
  disableCloseOnSelect,
  title = "Options",
  onClose,
  slotProps: { list: listProps, ...slotProps } = EMPTY_OBJECT,
  ...props
}: MenuOptionListDrawerProps) => {
  /** Values */

  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <SwipeableDrawer
      title={title}
      anchor={isSm ? "right" : "bottom"}
      onClose={onClose}
      slotProps={slotProps}
      {...props}
    >
      <MenuOptionList
        options={options.map((option) => ({
          ...option,
          onClick: () => {
            option.onClick?.();
            if (!disableCloseOnSelect && !option.disableCloseOnSelect)
              onClose?.();
          },
        }))}
        {...listProps}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sx={[{ minWidth: 300 }, ...sxAsArray(listProps?.sx)]}
      />
    </SwipeableDrawer>
  );
};

export default MenuOptionListDrawer;
