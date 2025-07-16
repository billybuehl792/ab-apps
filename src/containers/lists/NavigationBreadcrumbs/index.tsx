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
          color="inherit"
          onClick={() => {
            handleCrumbClick(crumb.href);
          }}
          style={{ verticalAlign: "inherit" }}
          {...(pathname === crumb.href && {
            color: "textPrimary",
            fontWeight: "bold",
            onClick: undefined,
            sx: { cursor: "default" },
          })}
        >
          {crumb.label}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default NavigationBreadcrumbs;
