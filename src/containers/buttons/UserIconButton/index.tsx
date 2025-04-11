import { type ComponentProps } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Avatar } from "@mui/material";

import useAuth from "@/hooks/auth/useAuth";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";

const UserIconButton = (
  props: Partial<ComponentProps<typeof MenuOptionsIconButton>>
) => {
  /** Values */

  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  const userName = user?.displayName ?? user?.email ?? "user";

  /** Callbacks */

  const handleSignIn = async () => {
    await navigate({ to: "/sign-in" });
  };

  const handleSignOut = async () => {
    await signOut?.mutateAsync(undefined, {
      onSuccess: () => void router.invalidate(),
    });
  };

  /** Options */

  const options: MenuOption[] = [
    {
      id: "signIn",
      label: "Sign In",
      render: !user,
      onClick: handleSignIn,
    },
    {
      id: "signOut",
      label: "Sign Out",
      render: !!user,
      onClick: handleSignOut,
    },
  ];

  return (
    <MenuOptionsIconButton
      options={options}
      icon={<Avatar alt={userName} src={user?.photoURL || ""} />}
      {...props}
    />
  );
};

export default UserIconButton;
