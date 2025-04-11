import { type ReactNode, type ComponentProps } from "react";
import {
  Box,
  type BoxProps,
  SwipeableDrawer as MUISwipeableDrawer,
  Stack,
  type SwipeableDrawerProps as MUISwipeableDrawerProps,
  useMediaQuery,
} from "@mui/material";

import DrawerHeader from "../DrawerHeader";
import { sxAsArray } from "@/utils/sx";
import { EMPTY_OBJECT } from "@/constants/utility";

interface SwipeableDrawerProps
  extends Omit<
    MUISwipeableDrawerProps,
    "title" | "onOpen" | "onClose" | "slotProps"
  > {
  title?: ReactNode;
  fullHeight?: boolean;
  onOpen?: MUISwipeableDrawerProps["onOpen"];
  onClose?: MUISwipeableDrawerProps["onClose"];
  slotProps?: {
    puller?: ComponentProps<typeof Puller>;
    header?: ComponentProps<typeof DrawerHeader>;
  } & MUISwipeableDrawerProps["slotProps"];
}

const Puller = (props: BoxProps) => (
  <Box
    {...props}
    sx={[
      {
        width: 30,
        height: 5,
        borderRadius: 10,
        bgcolor: ({ palette }) => palette.grey[400],
        mt: 1,
        mb: 0.25,
      },
      ...sxAsArray(props?.sx),
    ]}
  />
);

/**
 * This component is a wrapper around the MUI SwipeableDrawer component.
 * It provides a bottom drawer with a puller and customizable styles.
 */
const SwipeableDrawer = ({
  title,
  children,
  fullHeight,
  onOpen,
  onClose,
  slotProps: {
    puller: pullerProps,
    header: headerProps,
    ...slotProps
  } = EMPTY_OBJECT,
  ...props
}: SwipeableDrawerProps) => {
  /** Values */

  const isMobile = useMediaQuery("(hover: none)");

  return (
    <MUISwipeableDrawer
      anchor="bottom"
      onOpen={(event) => onOpen?.(event)}
      onClose={(event) => onClose?.(event)}
      ModalProps={{ keepMounted: false }}
      slotProps={{
        ...slotProps,
        paper: {
          ...(typeof slotProps.paper === "object"
            ? slotProps.paper
            : EMPTY_OBJECT),
          sx: [
            isMobile && {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
            { height: fullHeight ? "95vh" : "auto" },
          ],
        },
      }}
      {...props}
    >
      {isMobile && (
        <Stack direction="row" justifyContent="center">
          <Puller {...pullerProps} />
        </Stack>
      )}
      {Boolean(title) && (
        <DrawerHeader title={title} onClose={onClose} {...headerProps} />
      )}
      {children}
    </MUISwipeableDrawer>
  );
};

export default SwipeableDrawer;
