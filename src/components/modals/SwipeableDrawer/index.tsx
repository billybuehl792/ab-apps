import { type ComponentProps, type FC } from "react";
import {
  Box,
  type BoxProps,
  SwipeableDrawer as MUISwipeableDrawer,
  Stack,
  type SwipeableDrawerProps as MUISwipeableDrawerProps,
} from "@mui/material";
import { sxUtils } from "@/utils/sx";

interface SwipeableDrawerProps
  extends Omit<MUISwipeableDrawerProps, "onOpen" | "onClose" | "slotProps"> {
  fullHeight?: boolean;
  onOpen?: MUISwipeableDrawerProps["onOpen"];
  onClose?: MUISwipeableDrawerProps["onClose"];
  slotProps?: {
    puller?: ComponentProps<typeof Puller>;
  } & MUISwipeableDrawerProps["slotProps"];
}

const Puller: FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={[
      {
        width: 30,
        height: 5,
        borderRadius: 10,
        bgcolor: ({ palette }) => palette.grey[400],
        m: 1,
      },
      ...sxUtils.asArray(props?.sx),
    ]}
  />
);

/**
 * This component is a wrapper around the MUI SwipeableDrawer component.
 * It provides a bottom drawer with a puller and customizable styles.
 */
const SwipeableDrawer: FC<SwipeableDrawerProps> = ({
  children,
  fullHeight,
  onOpen,
  onClose,
  slotProps: { puller: pullerProps, ...slotProps } = {},
  ...props
}) => {
  return (
    <MUISwipeableDrawer
      anchor="bottom"
      onOpen={(event) => onOpen?.(event)}
      onClose={(event) => onClose?.(event)}
      ModalProps={{ keepMounted: false }}
      slotProps={{
        ...slotProps,
        paper: {
          ...slotProps?.paper,
          sx: [
            { height: fullHeight ? "95vh" : "auto" },
            {
              "@media (hover:none)": {
                ["&.MuiDrawer-paperAnchorBottom"]: {
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                },
              },
            },
          ],
        },
      }}
      {...props}
    >
      <Stack
        direction="row"
        justifyContent="center"
        sx={{
          display: "none",
          "@media (hover:none)": {
            display: "flex",
          },
        }}
      >
        <Puller {...pullerProps} />
      </Stack>

      {children}
    </MUISwipeableDrawer>
  );
};

export default SwipeableDrawer;
