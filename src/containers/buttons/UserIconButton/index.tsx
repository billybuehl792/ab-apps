import { type ComponentProps } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { Avatar } from "@mui/material";
import { Logout, Person } from "@mui/icons-material";
import { useSnackbar } from "notistack";

import { auth } from "@/config/firebase";
import useAuth from "@/hooks/auth/useAuth";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";

const UserIconButton = (
  props: Partial<ComponentProps<typeof MenuOptionsIconButton>>
) => {
  /** Values */

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const userName = user?.displayName ?? user?.email ?? "User";

  /** Mutations */

  const signOutMutation = useMutation({
    mutationKey: ["signOut"],
    mutationFn: () => signOut(auth),
    onSuccess: () => {
      enqueueSnackbar("Signed out", { variant: "success" });
      void navigate({ to: "/sign-in" });
    },
    onError: (error) => {
      enqueueSnackbar(`Error signing out: ${error.message}`, {
        variant: "error",
      });
    },
  });

  /** Options */

  const options: MenuOption[] = [
    {
      id: "account",
      label: "Account",
      icon: <Person />,
      onClick: () => void navigate({ to: "/app/account" }),
    },
    {
      id: "signOut",
      label: "Sign Out",
      icon: <Logout />,
      onClick: () => {
        signOutMutation.mutate();
      },
    },
  ];

  return (
    <MenuOptionsIconButton
      options={options}
      icon={<Avatar src={user?.photoURL ?? ""} />}
      slotProps={{ menu: { title: userName } }}
      {...props}
    />
  );
};

export default UserIconButton;
