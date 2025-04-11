import { Link, useLocation, useMatches } from "@tanstack/react-router";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link as MUILink,
  Typography,
  type BreadcrumbsProps as MUIBreadcrumbsProps,
} from "@mui/material";

interface BreadcrumbsProps extends MUIBreadcrumbsProps {
  showRootCrumb?: boolean;
}

const Breadcrumbs = ({ showRootCrumb, ...props }: BreadcrumbsProps) => {
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
    <MUIBreadcrumbs {...props}>
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
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
