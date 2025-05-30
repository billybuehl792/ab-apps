import { useMutation, useQuery } from "@tanstack/react-query";
import { sendEmailVerification, type User } from "firebase/auth";
import { useSnackbar } from "notistack";
import {
  Button,
  Stack,
  Tooltip,
  Typography,
  type StackProps,
} from "@mui/material";
import { Check, NewReleases, Verified } from "@mui/icons-material";

interface UserDetailCardEmailProps extends StackProps {
  user: User;
}

const UserDetailCardEmail = ({ user, ...props }: UserDetailCardEmailProps) => {
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
  });

  /** Callbacks */

  const handleSendEmailVerification = () => {
    emailVerificationMutation.mutate();
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center" {...props}>
      <Typography variant="body2" fontWeight={600}>
        {user.email}
      </Typography>
      <Tooltip
        title={user.emailVerified ? "Email verified" : "Email not verified"}
      >
        {user.emailVerified ? (
          <Verified fontSize="small" color="primary" />
        ) : (
          <NewReleases fontSize="small" color="warning" />
        )}
      </Tooltip>
      {!user.emailVerified && (
        <Button
          variant="text"
          size="small"
          startIcon={emailVerificationMutation.isSuccess ? <Check /> : null}
          loading={emailVerificationMutation.isPending}
          disabled={emailVerificationMutation.isSuccess}
          onClick={handleSendEmailVerification}
          sx={{ minWidth: 0, lineHeight: "inherit" }}
        >
          {emailVerificationMutation.isSuccess
            ? "Email Verification Sent"
            : "Verify"}
        </Button>
      )}
    </Stack>
  );
};

export default UserDetailCardEmail;
