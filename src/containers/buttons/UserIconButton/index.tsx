import { type ComponentProps } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Avatar } from "@mui/material";
import { Login, Logout, Person } from "@mui/icons-material";

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
  const isAuthenticated = !!user;

  /** Options */

  const unauthenticatedOptions: MenuOption[] = [
    {
      id: "signIn",
      label: "Sign In",
      icon: <Login />,
      onClick: () => void navigate({ to: "/sign-in" }),
    },
  ];

  const authenticatedOptions: MenuOption[] = [
    {
      id: "profile",
      label: "Profile",
      icon: <Person />,
      onClick: () => void navigate({ to: "/app/profile" }),
    },
    {
      id: "signOut",
      label: "Sign Out",
      icon: <Logout />,
      onClick: () =>
        void signOut?.mutateAsync(undefined, {
          onSuccess: () => void router.invalidate(),
        }),
    },
  ];

  return (
    <MenuOptionsIconButton
      options={isAuthenticated ? authenticatedOptions : unauthenticatedOptions}
      icon={<Avatar alt={userName} src={user?.photoURL || ""} />}
      slotProps={{ menu: { title: "Account" } }}
      {...props}
    />
  );
};

export default UserIconButton;
