import { type ComponentProps } from "react";

import MaterialForm from "@/containers/forms/MaterialForm";
import { EMPTY_OBJECT } from "@/constants/utility";
import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import { useMediaQuery } from "@mui/material";

interface MaterialFormDrawerProps
  extends Omit<ComponentProps<typeof SwipeableDrawer>, "slotProps"> {
  slotProps?: {
    form?: Partial<ComponentProps<typeof MaterialForm>>;
  } & ComponentProps<typeof SwipeableDrawer>["slotProps"];
}

const MaterialFormDrawer = ({
  slotProps: { form: formProps, ...slotProps } = EMPTY_OBJECT,
  ...props
}: MaterialFormDrawerProps) => {
  /** Values */

  const isMobile = useMediaQuery("(pointer: coarse)");
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <SwipeableDrawer
      anchor={isMobile || !isMd ? "bottom" : "right"}
      slotProps={slotProps}
      {...props}
    >
      <MaterialForm
        overflow="auto"
        flexGrow={1}
        minWidth={400}
        {...formProps}
        slotProps={{
          fieldset: { flexGrow: 1, p: 2, ...formProps?.slotProps?.fieldset },
          actions: {
            direction: "column",
            position: "sticky",
            bottom: 0,
            px: 2,
            bgcolor: ({ palette }) => palette.background.paper,
            zIndex: 1,
            ...formProps?.slotProps?.actions,
          },
        }}
      />
    </SwipeableDrawer>
  );
};

export default MaterialFormDrawer;
