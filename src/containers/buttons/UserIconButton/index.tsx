import { type ComponentProps } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Avatar } from "@mui/material";
import { Logout, Person } from "@mui/icons-material";
import useAuth from "@/store/hooks/useAuth";
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";
import useConfirm from "@/store/hooks/useConfirm";

const UserIconButton = (
  props: Partial<ComponentProps<typeof MenuOptionsIconButton>>
) => {
  /** Values */

  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { confirm } = useConfirm();

  const userName = auth.user?.displayName ?? auth.user?.email ?? "User";
  const photoURL = auth.user?.photoURL ?? "";

  /** Options */

  const options: MenuOption[] = [
    {
      id: "profile",
      label: "Profile",
      selected: location.pathname === "/app/profile",
      icon: <Person />,
      link: { to: "/app/profile" },
    },
    {
      id: "signOut",
      label: "Sign Out",
      icon: <Logout />,
      onClick: () =>
        void confirm({
          title: "Sign Out",
          message: "Are you sure you want to sign out?",
        }).then((confirmed) => confirmed && void navigate({ to: "/sign-out" })),
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
