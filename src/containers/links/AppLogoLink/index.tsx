import { useLocation, useNavigate } from "@tanstack/react-router";
import { type TypographyProps, Link, LinkProps } from "@mui/material";
import { APP_TITLE } from "@/store/constants/layout";

const AppLogoLink = (props: TypographyProps<typeof Link>) => {
  /** Values */

  const navigate = useNavigate();
  const { pathname } = useLocation();

  /** Callbacks */

  const handleOnClick: LinkProps["onClick"] = () => {
    if (pathname === "/app") return;
    void navigate({ to: "/app" });
  };

  return (
    <Link
      component="button"
      variant="h6"
      underline="none"
      noWrap
      style={{
        color: "inherit",
        fontFamily: "monospace",
        textDecoration: "none",
        fontWeight: 700,
      }}
      onClick={handleOnClick}
      {...props}
    >
      {APP_TITLE}
    </Link>
  );
};

export default AppLogoLink;
