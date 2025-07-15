import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import useAuth from "@/hooks/useAuth";
import { Button, type ButtonProps } from "@mui/material";
import { Logout } from "@mui/icons-material";
import ConfirmDialog from "@/components/modals/ConfirmDialog";

const SignOutButton = (props: ButtonProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  /** Values */

  const router = useRouter();
  const {
    mutations: { signOut },
  } = useAuth();

  /** Callbacks */

  const handleSignOut = () => {
    signOut.mutate(undefined, {
      onSuccess: () => void router.invalidate(),
    });
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        startIcon={<Logout />}
        onClick={() => {
          setConfirmOpen(true);
        }}
        {...props}
      >
        Sign Out
      </Button>
      <ConfirmDialog
        open={confirmOpen}
        title="Sign Out"
        description="Are you sure you want to sign out?"
        confirmButtonText="Sign Out"
        onConfirm={handleSignOut}
        onCancel={() => {
          setConfirmOpen(false);
        }}
      />
    </>
  );
};

export default SignOutButton;
