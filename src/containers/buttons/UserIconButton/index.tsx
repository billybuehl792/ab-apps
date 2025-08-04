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
  const location = useLocation();
  const auth = useAuth();

  const userName = auth.user?.displayName ?? auth.user?.email ?? "User";
  const photoURL = auth.user?.photoURL ?? "";

  /** Options */

  const options: MenuOption[] = [
    {
      id: "profile",
      label: "Profile",
      selected: location.pathname === "/app/profile",
      icon: <Person />,
      onClick: () => void navigate({ to: "/app/profile" }),
    },
    {
      id: "signOut",
      label: "Sign Out",
      icon: <Logout />,
      confirm: "Are you sure you want to sign out?",
      onClick: () => void navigate({ to: "/sign-out" }),
    },
  ];

  return (
    <MenuOptionsIconButton
      options={options}
      icon={<Avatar src={photoURL} />}
      slotProps={{ menu: { title: userName } }}
      {...props}
    />
  );
};

export default UserIconButton;
