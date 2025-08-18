import { Link, useLocation, useMatches } from "@tanstack/react-router";
import {
  Breadcrumbs,
  Link as MuiLink,
  type BreadcrumbsProps,
} from "@mui/material";

const NavigationBreadcrumbs = (props: BreadcrumbsProps) => {
  /** Values */

  const matches = useMatches();
  const location = useLocation();

  const crumbs = matches
    .filter((match) => match.loaderData?.crumb)
    .map(({ loaderData, pathname }) => ({
      href: pathname,
      label: loaderData?.crumb,
      disabled: `${location.pathname}/` === pathname,
      selected: location.pathname === pathname,
    }));

  return (
    <Breadcrumbs {...props}>
      {crumbs.map((crumb, index) => (
        <MuiLink
          key={crumb.href}
          component={Link}
          to={crumb.href}
          variant="body2"
          underline="none"
          color="inherit"
          style={{ verticalAlign: "inherit" }}
          {...((crumb.selected || crumb.disabled) && {
            component: "span",
            to: undefined,
          })}
          {...(index === crumbs.length - 1 && {
            color: "textPrimary",
            fontWeight: "bold",
          })}
        >
          {crumb.label}
        </MuiLink>
      ))}
    </Breadcrumbs>
  );
};

export default NavigationBreadcrumbs;
