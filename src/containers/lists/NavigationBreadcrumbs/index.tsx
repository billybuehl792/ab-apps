import { Link, useLocation, useMatches } from "@tanstack/react-router";
import {
  Breadcrumbs,
  LinkProps as MuiLinkProps,
  Link as MuiLink,
  type BreadcrumbsProps,
} from "@mui/material";

import { EMPTY_OBJECT } from "@/constants/utility";

interface NavigationBreadcrumbsProps
  extends Omit<BreadcrumbsProps, "slotProps"> {
  hideRootCrumb?: boolean;
  slotProps?: {
    crumb?: MuiLinkProps;
  } & BreadcrumbsProps["slotProps"];
}

const NavigationBreadcrumbs = ({
  hideRootCrumb,
  slotProps: { crumb: crumbProps, ...slotProps } = EMPTY_OBJECT,
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

  if (hideRootCrumb && crumbs.length <= 1) return;
  return (
    <Breadcrumbs slotProps={slotProps} {...props}>
      {crumbs.map((crumb) => (
        <MuiLink
          key={crumb.href}
          component={Link}
          to={crumb.href}
          underline="none"
          color={pathname === crumb.href ? "textPrimary" : "inherit"}
          disabled={pathname === crumb.href}
          {...crumbProps}
        >
          {crumb.label}
        </MuiLink>
      ))}
    </Breadcrumbs>
  );
};

export default NavigationBreadcrumbs;
