import { type ComponentProps } from "react";
import NavigationList from "@/containers/lists/NavigationList";
import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import { APP_TITLE } from "@/store/constants/layout";

const NavigationDrawer = (props: ComponentProps<typeof SwipeableDrawer>) => {
  return (
    <SwipeableDrawer title={APP_TITLE} fullHeight {...props}>
      <NavigationList component="nav" />
    </SwipeableDrawer>
  );
};

export default NavigationDrawer;
