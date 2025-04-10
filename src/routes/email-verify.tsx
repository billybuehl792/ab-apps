import { useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button, Stack, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

import useAuth from "@/hooks/auth/useAuth";

export const Route = createFileRoute("/email-verify")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: (search.redirect as string) || undefined,
  }),
  beforeLoad: ({ context, search }) => {
    if (!context.auth.user) throw redirect({ to: "/sign-in" });
    else if (context.auth.user.emailVerified)
      throw redirect({ to: search.redirect || "/", replace: true });
  },
});

function RouteComponent() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  /** Values */

  const { user, sendEmailVerification } = useAuth();

  /** Callbacks */

  const handleSendEmailVerification = () => {
    if (user && !user.emailVerified) {
      setIsSending(true);
      sendEmailVerification?.mutate(user, {
        onSettled: () => {
          setIsSent(true);
          setIsSending(true);
        },
      });
    }
  };

  return (
    <Stack spacing={2} p={2}>
      <Typography variant="h5">Email hasn't been verified!</Typography>
      <Typography variant="body2">
        Please verify your email address to access all features of the app.
      </Typography>

      <Stack spacing={1} direction="row" alignItems="center">
        {isSent ? (
          <>
            <Check fontSize="small" color="success" />
            <Typography variant="body2">Verification Email Sent</Typography>
          </>
        ) : (
          <Button loading={isSending} onClick={handleSendEmailVerification}>
            Send Email Verification Link
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
