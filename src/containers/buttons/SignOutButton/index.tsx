import { useNavigate } from "@tanstack/react-router";
import { Button, type ButtonProps } from "@mui/material";
import useModal from "@/store/hooks/useModal";
import { Logout } from "@mui/icons-material";

interface SignOutButtonProps extends ButtonProps {
  disableConfirm?: boolean;
}

const SignOutButton = ({ disableConfirm, ...props }: SignOutButtonProps) => {
  /** Values */

  const navigate = useNavigate();
  const { confirm } = useModal();

  /** Callbacks */

  const handleSignOut = () => void navigate({ to: "/sign-out" });

  const handleOnClick = async () => {
    if (disableConfirm) handleSignOut();
    else {
      const confirmed = await confirm({
        title: "Sign Out",
        message: "Are you sure you want to sign out?",
      });
      if (confirmed) handleSignOut();
    }
  };

  return (
    <Button
      variant="text"
      size="small"
      startIcon={<Logout />}
      onClick={() => void handleOnClick()}
      {...props}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
