import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          ":last-child": {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          ["& .MuiDrawer-paperAnchorBottom"]: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: () => ({
          position: "relative",
          height: "100%",
          [theme.breakpoints.up("xs")]: {
            minHeight: "unset",
          },
          [theme.breakpoints.up("sm")]: {
            minHeight: "unset",
          },
        }),
      },
    },
  },
});
