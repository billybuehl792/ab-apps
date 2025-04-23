import { type ReactNode, type ComponentProps } from "react";

import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import MenuOptionsList from "@/components/lists/MenuOptionsList";
import { EMPTY_OBJECT } from "@/constants/utility";

interface MenuOptionsDrawerProps
  extends Omit<Partial<ComponentProps<typeof SwipeableDrawer>>, "slotProps"> {
  title?: ReactNode;
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
  title = "Options",
  onClose,
  slotProps: { list: listProps, ...slotProps } = EMPTY_OBJECT,
  ...props
}: MenuOptionsDrawerProps) => {
  /** Callbacks */

  const onMouseDown: MenuOptionsDrawerProps["onMouseDown"] = (event) => {
    event.stopPropagation();
  };

  const onClick: MenuOptionsDrawerProps["onClick"] = (event) => {
    event.stopPropagation();
  };

  return (
    <SwipeableDrawer
      title={title}
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
