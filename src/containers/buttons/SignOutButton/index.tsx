import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button, type ButtonProps } from "@mui/material";
import { Logout } from "@mui/icons-material";
import ConfirmDialog from "@/components/modals/ConfirmDialog";

interface SignOutButtonProps extends ButtonProps {
  confirm?: boolean;
}

const SignOutButton = ({ confirm, ...props }: SignOutButtonProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  /** Values */

  const navigate = useNavigate();

  /** Callbacks */

  const handleSignOut = () => void navigate({ to: "/sign-out" });

  const handleToggleConfirm = () => {
    setConfirmOpen((prev) => !prev);
  };

  const handleOnClick = () => {
    if (confirm) handleToggleConfirm();
    else handleSignOut();
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        startIcon={<Logout />}
        onClick={handleOnClick}
        {...props}
      >
        Sign Out
      </Button>
      {!!confirm && (
        <ConfirmDialog
          open={confirmOpen}
          title="Sign Out"
          description="Are you sure you want to sign out?"
          confirmButtonText="Sign Out"
          onConfirm={handleSignOut}
          onCancel={handleToggleConfirm}
        />
      )}
    </>
  );
};

export default SignOutButton;
