import { type ComponentProps } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Avatar } from "@mui/material";
import { Logout, Person } from "@mui/icons-material";
import useAuth from "@/hooks/useAuth";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";

const UserIconButton = (
  props: Partial<ComponentProps<typeof MenuOptionsIconButton>>
) => {
  /** Values */

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    user,
    mutations: { signOut },
  } = useAuth();

  const userName = user?.displayName ?? user?.email ?? "User";

  /** Options */

  const options: MenuOption[] = [
    {
      id: "profile",
      label: "Profile",
      selected: pathname === "/app/profile",
      icon: <Person />,
      onClick: () => void navigate({ to: "/app/profile" }),
    },
    {
      id: "signOut",
      label: "Sign Out",
      icon: <Logout />,
      confirm: "Are you sure you want to sign out?",
      onClick: signOut.mutate,
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
