import { type ComponentProps, type FC } from "react";

import NavigationList from "@/containers/lists/NavigationList";
import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import { APP_TITLE } from "@/constants/layout";

interface NavigationDrawerProps extends ComponentProps<typeof SwipeableDrawer> {
  slotProps?: {
    nav?: ComponentProps<typeof NavigationList>;
  } & ComponentProps<typeof SwipeableDrawer>["slotProps"];
}

const NavigationDrawer: FC<NavigationDrawerProps> = ({
  onClose,
  slotProps: { nav: navProps, ...slotProps } = {},
  ...props
}) => {
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
