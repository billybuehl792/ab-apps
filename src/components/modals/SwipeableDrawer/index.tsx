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
  hideHeader?: boolean;
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...sxAsArray(props.sx),
    ]}
  />
);

/**
 * This component is a wrapper around the MUI SwipeableDrawer component.
 * It provides a bottom drawer with a puller and customizable styles.
 */
const SwipeableDrawer = ({
  anchor = "bottom",
  title,
  children,
  fullHeight,
  hideHeader,
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

  const isMobile = useMediaQuery("(pointer: coarse)");

  return (
    <MUISwipeableDrawer
      anchor={anchor}
      disableSwipeToOpen
      onOpen={(event) => onOpen?.(event)}
      onClose={(event) => onClose?.(event)}
      ModalProps={{ keepMounted: false }}
      slotProps={{
        ...slotProps,
        transition: {
          mountOnEnter: true,
          unmountOnExit: true,
          ...(typeof slotProps.transition === "object"
            ? slotProps.transition
            : EMPTY_OBJECT),
        },
        paper: {
          ...(typeof slotProps.paper === "object"
            ? slotProps.paper
            : EMPTY_OBJECT),
          sx: [
            isMobile && {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
            anchor === "bottom" && {
              height: fullHeight ? "95vh" : "auto",
            },
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
      {!hideHeader && (
        <DrawerHeader title={title} onClose={onClose} {...headerProps} />
      )}
      {children}
    </MUISwipeableDrawer>
  );
};

export default SwipeableDrawer;
