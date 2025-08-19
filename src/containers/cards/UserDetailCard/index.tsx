import { useState } from "react";
import { type User } from "firebase/auth";
import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import EditIconButton from "@/components/buttons/EditIconButton";
import UserAvatarUploadIconButton from "@/containers/buttons/UserAvatarUploadIconButton";
import UserDisplayNameFormDrawer from "@/containers/modals/UserDisplayNameFormDrawer";
import UserEmailChip from "@/containers/chips/UserEmailChip";
import PermissionsChip from "@/containers/chips/PermissionsChip";
import CompanyChip from "@/containers/chips/CompanyChip";
import Metadata from "@/components/lists/Metadata";
import type { Profile } from "@/store/types/auth";

interface UserDetailCardProps extends CardProps {
  user: User;
  profile: Profile;
}

const UserDetailCard = ({ user, profile, ...props }: UserDetailCardProps) => {
  const [displayNameFormOpen, setDisplayNameFormOpen] = useState(false);

  /** Values */

  const details = [
    {
      id: "id",
      label: "ID",
      value: <Typography variant="body2">{user.uid}</Typography>,
    },
    {
      id: "email",
      label: "Email",
      value: <UserEmailChip user={user} />,
    },
    {
      id: "permissions",
      label: "Permissions",
      value: <PermissionsChip permissions={profile.permissions} />,
    },
    {
      id: "company",
      label: "Company",
      value: profile.company ? <CompanyChip company={profile.company} /> : "-",
    },
  ];

  /** Callbacks */

  const handleToggleEditDisplayName = () => {
    setDisplayNameFormOpen((prev) => !prev);
  };

  return (
    <Card {...props}>
      <CardContent component={Stack} spacing={2} divider={<Divider />}>
        <Stack spacing={1} alignItems="center">
          <UserAvatarUploadIconButton user={user} />
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1">{user.displayName ?? "-"}</Typography>
            <EditIconButton
              size="small"
              active={displayNameFormOpen}
              onClick={handleToggleEditDisplayName}
            />
          </Stack>
        </Stack>
        <Stack alignItems="center">
          <Metadata items={details} spacing={1} />
        </Stack>
      </CardContent>
      <UserDisplayNameFormDrawer
        open={displayNameFormOpen}
        user={user}
        onClose={handleToggleEditDisplayName}
      />
    </Card>
  );
};

export default UserDetailCard;
