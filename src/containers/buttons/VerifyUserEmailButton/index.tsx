import { useMutation, useQuery } from "@tanstack/react-query";
import { sendEmailVerification, type User } from "firebase/auth";
import { useSnackbar } from "notistack";
import { Box, Button, type ButtonProps, Tooltip } from "@mui/material";
import { Check, Verified } from "@mui/icons-material";

interface VerifyUserEmailButtonProps extends ButtonProps {
  user: User;
}

const VerifyUserEmailButton = ({
  user,
  size = "small",
  ...props
}: VerifyUserEmailButtonProps) => {
  /** Values */

  const { enqueueSnackbar } = useSnackbar();

  /** Mutations */

  const emailVerificationMutation = useMutation({
    mutationKey: ["sendEmailVerification", user.uid],
    mutationFn: () => sendEmailVerification(user),
    onSuccess: () => {
      enqueueSnackbar("Email verification sent", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Failed to send email verification", {
        variant: "error",
      });
    },
  });

  /** Queries */

  useQuery({
    queryKey: ["isEmailVerified", user.uid],
    queryFn: async () => {
      await user.reload();
      return user.emailVerified;
    },
    initialData: user.emailVerified,
    refetchOnWindowFocus: true,
    enabled: !user.emailVerified && emailVerificationMutation.isSuccess,
  });

  /** Callbacks */

  const handleSendEmailVerification = () => {
    emailVerificationMutation.mutate();
  };

  return (
    <Tooltip title={user.emailVerified ? "Email verified" : null}>
      <Box component="span">
        {user.emailVerified ? (
          <Verified color="primary" fontSize={size} />
        ) : (
          <Button
            variant="text"
            size={size}
            startIcon={emailVerificationMutation.isSuccess ? <Check /> : null}
            loading={emailVerificationMutation.isPending}
            disabled={emailVerificationMutation.isSuccess}
            onClick={handleSendEmailVerification}
            {...props}
          >
            {emailVerificationMutation.isSuccess
              ? "Email Verification Sent"
              : "Verify Email"}
          </Button>
        )}
      </Box>
    </Tooltip>
  );
};

export default VerifyUserEmailButton;
