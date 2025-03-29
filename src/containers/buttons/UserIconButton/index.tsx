import { type FC, type ComponentProps } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Avatar } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import MenuIconButton from "@/components/buttons/MenuIconButton";

const UserIconButton: FC<Partial<ComponentProps<typeof MenuIconButton>>> = (
  props
) => {
  /** Values */

  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  const userName = user?.displayName ?? user?.email ?? "user";

  const options: MenuOption[] = [
    {
      id: "signIn",
      label: "Sign In",
      render: !user,
      onClick: () => navigate({ to: "/sign-in" }),
    },
    {
      id: "signOut",
      label: "Sign Out",
      render: !!user,
      onClick: async () =>
        await signOut?.mutateAsync(undefined, {
          onSuccess: () => router.invalidate(),
        }),
    },
  ];

  return (
    <MenuIconButton
      options={options}
      icon={<Avatar alt={userName} src={user?.photoURL || ""} />}
      {...props}
    />
  );
};

export default UserIconButton;
