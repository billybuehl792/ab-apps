import { type ComponentProps } from "react";

import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import MenuOptionsList from "@/components/lists/MenuOptionsList";
import { EMPTY_OBJECT } from "@/constants/utility";
import { SwipeableDrawerProps } from "@mui/material";

interface MenuOptionsDrawerProps
  extends Omit<Partial<ComponentProps<typeof SwipeableDrawer>>, "slotProps"> {
  options: MenuOption[];
  fullHeight?: boolean;
  disableCloseOnSelect?: boolean;
  slotProps?: {
    list?: ComponentProps<typeof MenuOptionsList>;
  } & ComponentProps<typeof SwipeableDrawer>["slotProps"];
}

/**
 * This component renders a `SwipeableDrawer` with a list of selectable options.
 */
const MenuOptionsDrawer = ({
  options,
  disableCloseOnSelect,
  onClose,
  slotProps: { list: listProps, ...slotProps } = EMPTY_OBJECT,
  ...props
}: MenuOptionsDrawerProps) => {
  /** Callbacks */

  const onMouseDown: SwipeableDrawerProps["onMouseDown"] = (event) => {
    event.stopPropagation();
  };

  const onClick: SwipeableDrawerProps["onClick"] = (event) => {
    event.stopPropagation();
  };

  return (
    <SwipeableDrawer
      title="Options"
      onMouseDown={onMouseDown}
      onClick={onClick}
      onClose={onClose}
      slotProps={slotProps}
      {...props}
    >
      <MenuOptionsList
        options={options.map((option) => ({
          ...option,
          onClick: (event) => {
            void option.onClick(event, option.id);
            if (!disableCloseOnSelect && !option.disableCloseOnSelect)
              onClose?.(event);
          },
        }))}
        {...listProps}
      />
    </SwipeableDrawer>
  );
};

export default MenuOptionsDrawer;
