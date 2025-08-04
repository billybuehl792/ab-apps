import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button, type ButtonProps } from "@mui/material";
import { Logout } from "@mui/icons-material";
import ConfirmDialog from "@/components/modals/ConfirmDialog";

const SignOutButton = (props: ButtonProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  /** Values */

  const navigate = useNavigate();

  /** Callbacks */

  const handleSignOut = () => void navigate({ to: "/sign-out", replace: true });

  const handleToggleConfirm = () => {
    setConfirmOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        startIcon={<Logout />}
        onClick={handleToggleConfirm}
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
        onCancel={handleToggleConfirm}
      />
    </>
  );
};

export default SignOutButton;
