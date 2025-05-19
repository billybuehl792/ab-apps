import { type ComponentProps } from "react";
import { useMediaQuery } from "@mui/material";

import SwipeableDrawer from "@/components/modals/SwipeableDrawer";
import UserDisplayNameForm from "@/containers/forms/UserDisplayNameForm";
import { EMPTY_OBJECT } from "@/constants/utility";

interface UserDisplayNameFormDrawerProps
  extends Omit<ComponentProps<typeof SwipeableDrawer>, "slotProps"> {
  slotProps?: {
    form?: Partial<ComponentProps<typeof UserDisplayNameForm>>;
  } & ComponentProps<typeof SwipeableDrawer>["slotProps"];
}

const UserDisplayNameFormDrawer = ({
  slotProps: { form: formProps, ...slotProps } = EMPTY_OBJECT,
  ...props
}: UserDisplayNameFormDrawerProps) => {
  /** Values */

  const isMobile = useMediaQuery("(pointer: coarse)");
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <SwipeableDrawer
      title="Edit Display Name"
      anchor={isMobile || !isSm ? "bottom" : "right"}
      slotProps={slotProps}
      {...props}
    >
      <UserDisplayNameForm
        overflow="auto"
        flexGrow={1}
        minWidth={isSm ? 400 : undefined}
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

export default UserDisplayNameFormDrawer;
