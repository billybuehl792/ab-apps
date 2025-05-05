import { type ComponentProps } from "react";
import { useMediaQuery } from "@mui/material";

import MaterialForm from "@/containers/forms/MaterialForm";
import { EMPTY_OBJECT } from "@/constants/utility";
import SwipeableDrawer from "@/components/modals/SwipeableDrawer";

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
        minWidth={isMd ? 400 : undefined}
        onSubmit={() => null}
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
            slotProps: {
              submitButton: { size: "large" },
              resetButton: { size: "large" },
              ...formProps?.slotProps?.actions?.slotProps,
            },
          },
        }}
      />
    </SwipeableDrawer>
  );
};

export default MaterialFormDrawer;
