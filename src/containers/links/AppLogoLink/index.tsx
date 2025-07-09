import { Link } from "@tanstack/react-router";
import { Typography, type TypographyProps } from "@mui/material";
import { APP_TITLE } from "@/store/constants/layout";

const AppLogoLink = (props: TypographyProps<typeof Link>) => {
  return (
    <Typography
      component={Link}
      to="/"
      variant="h6"
      noWrap
      style={{
        color: "inherit",
        fontFamily: "monospace",
        textDecoration: "none",
        fontWeight: 700,
      }}
      {...props}
    >
      {APP_TITLE}
    </Typography>
  );
};

export default AppLogoLink;
