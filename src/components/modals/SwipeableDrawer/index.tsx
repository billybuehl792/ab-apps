import { type ReactNode, type ComponentProps } from "react";
import {
  Box,
  type BoxProps,
  SwipeableDrawer as MuiSwipeableDrawer,
  Stack,
  type SwipeableDrawerProps as MuiSwipeableDrawerProps,
  useMediaQuery,
  type StackProps,
} from "@mui/material";
import DrawerHeader from "../DrawerHeader";
import { sxAsArray } from "@/store/utils/sx";
import { EMPTY_OBJECT } from "@/store/constants/utility";
import { APP_BOTTOM_SAFE_AREA_HEIGHT } from "@/store/constants/layout";

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

interface SwipeableDrawerProps
  extends Omit<
    MuiSwipeableDrawerProps,
    "title" | "onOpen" | "onClose" | "slotProps"
  > {
  title?: ReactNode;
  hideHeader?: boolean;
  fullHeight?: boolean;
  onOpen?: VoidFunction;
  onClose?: VoidFunction;
  slotProps?: {
    puller?: ComponentProps<typeof Puller>;
    header?: ComponentProps<typeof DrawerHeader>;
    content?: StackProps;
  } & MuiSwipeableDrawerProps["slotProps"];
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
 * This component is a wrapper around the Mui SwipeableDrawer component.
 * It provides a bottom drawer with a puller and customizable styles.
 */
const SwipeableDrawer = ({
  anchor: anchorProp = "bottom",
  title,
  children,
  fullHeight,
  hideHeader,
  onOpen,
  onClose,
  slotProps: {
    puller: pullerProps,
    header: headerProps,
    content: contentProps,
    ...slotProps
  } = EMPTY_OBJECT,
  ...props
}: SwipeableDrawerProps) => {
  /** Values */

  const isTouch = useMediaQuery("(pointer: coarse)");
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const anchor = isTouch || !isSm ? "bottom" : anchorProp;

  return (
    <MuiSwipeableDrawer
      anchor={anchor}
      disableSwipeToOpen
      disableBackdropTransition={!iOS}
      onOpen={() => onOpen?.()}
      onClose={() => onClose?.()}
      ModalProps={{ keepMounted: false }}
      slotProps={{
        ...slotProps,
        transition: {
          mountOnEnter: true,
          unmountOnExit: true,
          ...(typeof slotProps.transition === "object" && slotProps.transition),
        },
        paper: {
          ...(typeof slotProps.paper === "object" && slotProps.paper),
          sx: [
            isTouch && {
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
      {isTouch && (
        <Stack direction="row" justifyContent="center">
          <Puller {...pullerProps} />
        </Stack>
      )}
      {!hideHeader && (
        <DrawerHeader title={title} onClose={onClose} {...headerProps} />
      )}
      <Stack
        overflow="auto"
        flexGrow={1}
        pb={isTouch ? APP_BOTTOM_SAFE_AREA_HEIGHT / 8 : 0}
        {...contentProps}
      >
        {children}
      </Stack>
    </MuiSwipeableDrawer>
  );
};

export default SwipeableDrawer;
