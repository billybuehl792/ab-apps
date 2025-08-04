import { Box as MuiBox, type BoxProps, styled } from "@mui/material";

const Box = styled(MuiBox)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
}));

const FullScreen = (props: BoxProps) => {
  return <Box {...props} />;
};

export default FullScreen;
