import { type ComponentProps, type FC } from "react";
import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import MenuOptionsList from "@/components/lists/MenuOptionsList";

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
const MenuOptionsDrawer: FC<MenuOptionsDrawerProps> = ({
  options,
  disableCloseOnSelect,
  onClose,
  slotProps: { list: listProps, ...slotProps } = {},
  ...props
}) => {
  return (
    <SwipeableDrawer onClose={onClose} slotProps={slotProps} {...props}>
      <MenuOptionsList
        options={options.map((option) => ({
          ...option,
          onClick: (event) => {
            option.onClick?.(event, option.id);
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
