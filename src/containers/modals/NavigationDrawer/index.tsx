import { type ComponentProps } from "react";

import NavigationList from "@/containers/lists/NavigationList";
import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import { APP_TITLE } from "@/constants/layout";
import { EMPTY_OBJECT } from "@/constants/utility";

interface NavigationDrawerProps extends ComponentProps<typeof SwipeableDrawer> {
  slotProps?: {
    nav?: ComponentProps<typeof NavigationList>;
  } & ComponentProps<typeof SwipeableDrawer>["slotProps"];
}

const NavigationDrawer = ({
  onClose,
  slotProps: { nav: navProps, ...slotProps } = EMPTY_OBJECT,
  ...props
}: NavigationDrawerProps) => {
  return (
    <SwipeableDrawer
      title={APP_TITLE}
      fullHeight
      onClose={onClose}
      slotProps={slotProps}
      {...props}
    >
      <NavigationList component="nav" {...navProps} />
    </SwipeableDrawer>
  );
};

export default NavigationDrawer;
