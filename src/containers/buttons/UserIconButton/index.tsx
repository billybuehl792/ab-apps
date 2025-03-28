import { type FC, type ComponentProps } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Avatar } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import MenuIconButton from "@/components/buttons/MenuIconButton";

const UserIconButton: FC<Partial<ComponentProps<typeof MenuIconButton>>> = ({
  size = "small",
  ...props
}) => {
  /** Values */

  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  const userName = user?.displayName ?? user?.email ?? "user";
  const avatarSize = size === "small" ? 30 : 40;

  const options: MenuOption[] = [
    {
      id: "signIn",
      render: !user,
      label: "Sign In",
      onClick: () => navigate({ to: "/sign-in" }),
    },
    {
      id: "singOut",
      render: !!user,
      label: "Sign Out",
      onClick: async () =>
        await signOut?.mutateAsync(undefined, {
          onSuccess: () => router.invalidate(),
        }),
    },
  ];

  return (
    <MenuIconButton
      size={size}
      options={options}
      icon={
        <Avatar
          alt={userName}
          src={user?.photoURL || ""}
          sx={{ width: avatarSize, height: avatarSize }}
        />
      }
      {...props}
    />
  );
};

export default UserIconButton;
