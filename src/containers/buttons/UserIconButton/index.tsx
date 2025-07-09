import { type ComponentProps } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Avatar } from "@mui/material";
import { Logout, Person } from "@mui/icons-material";
import useAuth from "@/hooks/useAuth";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";

const UserIconButton = (
  props: Partial<ComponentProps<typeof MenuOptionsIconButton>>
) => {
  /** Values */

  const navigate = useNavigate();
  const {
    user,
    mutations: { signOut },
  } = useAuth();

  const userName = user?.displayName ?? user?.email ?? "User";

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
        signOut.mutate(undefined, {
          onSuccess: () => void navigate({ to: "/sign-in" }),
        });
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
