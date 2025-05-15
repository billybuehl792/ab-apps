import { type ComponentProps } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Avatar } from "@mui/material";
import { Logout, Person } from "@mui/icons-material";

import useAuth from "@/hooks/auth/useAuth";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";

const UserIconButton = (
  props: Partial<ComponentProps<typeof MenuOptionsIconButton>>
) => {
  /** Values */

  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  const userName = user?.displayName ?? user?.email ?? "User";

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
      onClick: () =>
        void signOut?.mutateAsync(undefined, {
          onSuccess: () => void router.invalidate(),
        }),
    },
  ];

  return (
    <MenuOptionsIconButton
      options={options}
      icon={<Avatar alt={userName} src={user?.photoURL || ""} />}
      slotProps={{ menu: { title: userName } }}
      {...props}
    />
  );
};

export default UserIconButton;
