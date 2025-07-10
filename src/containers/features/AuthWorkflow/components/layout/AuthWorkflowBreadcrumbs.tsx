import {
  Breadcrumbs,
  type BreadcrumbsProps,
  Link,
  Typography,
} from "@mui/material";
import useAuthWorkflow from "../../hooks/useAuthWorkflow";

const AuthWorkflowBreadcrumbs = (props: BreadcrumbsProps) => {
  /** Values */

  const {
    multiFactorResolver,
    setMultiFactorResolver,
    setMultiFactorHint,
    setMultiFactorVerificationId,
  } = useAuthWorkflow();

  /** Callbacks */

  const handleResetWorkflow = () => {
    setMultiFactorResolver(null);
    setMultiFactorHint(null);
    setMultiFactorVerificationId(null);
  };

  return (
    <Breadcrumbs {...props}>
      <Link
        component={multiFactorResolver ? "button" : Typography}
        variant="h6"
        underline="none"
        color={multiFactorResolver ? undefined : "textPrimary"}
        onClick={multiFactorResolver ? handleResetWorkflow : undefined}
      >
        Sign In
      </Link>
      {Boolean(multiFactorResolver) && (
        <Typography variant="h6">Multi-Factor Authentication</Typography>
      )}
    </Breadcrumbs>
  );
};

export default AuthWorkflowBreadcrumbs;
