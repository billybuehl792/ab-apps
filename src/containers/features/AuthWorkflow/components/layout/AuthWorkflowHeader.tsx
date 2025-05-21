import {
  Breadcrumbs,
  Link,
  Stack,
  type StackProps,
  Typography,
} from "@mui/material";

import useAuthWorkflow from "../../hooks/useAuthWorkflow";

const AuthWorkflowHeader = (props: StackProps) => {
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
    <Stack {...props}>
      {multiFactorResolver ? (
        <Breadcrumbs>
          <Link
            component="button"
            variant="h6"
            underline="none"
            onClick={handleResetWorkflow}
          >
            Sign In
          </Link>
          <Typography variant="h6">Multi-Factor Authentication</Typography>
        </Breadcrumbs>
      ) : (
        <Typography variant="h6">Sign In</Typography>
      )}
    </Stack>
  );
};

export default AuthWorkflowHeader;
