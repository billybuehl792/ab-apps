import { useLocation, useMatches, useNavigate } from "@tanstack/react-router";
import { Breadcrumbs, Link, type BreadcrumbsProps } from "@mui/material";

const NavigationBreadcrumbs = (props: BreadcrumbsProps) => {
  /** Values */

  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const crumbs = matches
    .filter((match) => match.loaderData?.crumb)
    .map(({ loaderData, pathname }) => ({
      href: pathname,
      label: loaderData?.crumb,
    }));

  /** Callbacks */

  const handleCrumbClick = (to: string) => void navigate({ to });

  return (
    <Breadcrumbs {...props}>
      {crumbs.map((crumb) => (
        <Link
          key={crumb.href}
          component="button"
          variant="body2"
          underline="none"
          color={pathname === crumb.href ? "textPrimary" : "inherit"}
          fontWeight={pathname === crumb.href ? "bold" : "normal"}
          onClick={() => {
            handleCrumbClick(crumb.href);
          }}
          sx={{ cursor: "pointer", verticalAlign: "inherit" }}
        >
          {crumb.label}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default NavigationBreadcrumbs;
