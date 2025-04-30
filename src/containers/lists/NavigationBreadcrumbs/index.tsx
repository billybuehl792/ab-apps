import { Link, useLocation, useMatches } from "@tanstack/react-router";
import {
  Breadcrumbs,
  Link as MUILink,
  Typography,
  type BreadcrumbsProps,
} from "@mui/material";

interface NavigationBreadcrumbsProps extends BreadcrumbsProps {
  showRootCrumb?: boolean;
}

const NavigationBreadcrumbs = ({
  showRootCrumb,
  ...props
}: NavigationBreadcrumbsProps) => {
  /** Values */

  const { pathname } = useLocation();
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.loaderData?.crumb)
    .map(({ loaderData, pathname }) => ({
      href: pathname,
      label: loaderData?.crumb,
    }));

  if (crumbs.length <= 1 && !showRootCrumb) return;
  return (
    <Breadcrumbs {...props}>
      {crumbs.map((crumb) =>
        crumb.href === pathname ? (
          <Typography key={crumb.href}>{crumb.label}</Typography>
        ) : (
          <MUILink
            key={crumb.href}
            component={Link}
            to={crumb.href}
            underline="none"
          >
            {crumb.label}
          </MUILink>
        )
      )}
    </Breadcrumbs>
  );
};

export default NavigationBreadcrumbs;
