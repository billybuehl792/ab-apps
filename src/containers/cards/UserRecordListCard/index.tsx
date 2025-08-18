import { Link } from "@tanstack/react-router";
import { type UserRecord } from "firebase-admin/auth";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  type CardProps,
  Stack,
  Typography,
} from "@mui/material";
import Metadata from "@/components/lists/Metadata";
import UserEmailChip from "@/containers/chips/UserEmailChip";
import PermissionsChip from "@/containers/chips/PermissionsChip";
import type { Permissions } from "@/store/types/auth";

interface UserRecordListCardProps extends CardProps {
  user: UserRecord;
}

const AVATAR_HEIGHT = 32;

const UserRecordListCard = ({ user, ...props }: UserRecordListCardProps) => {
  /** Values */

  const companyId = String(user.customClaims?.companyId ?? "-");
  const role = (user.customClaims?.role ?? null) as Permissions["role"];

  const metadata = [
    { id: "email", label: "Email", value: <UserEmailChip user={user} /> },
    { id: "companyId", label: "Company ID", value: companyId },
  ];

  return (
    <Card {...props}>
      <CardActionArea
        LinkComponent={Link}
        href={`/app/admin/users/${user.uid}`}
      >
        <CardContent component={Stack} direction="row" spacing={2}>
          <Avatar
            src={user.photoURL}
            alt={user.displayName}
            sx={{ width: AVATAR_HEIGHT, height: AVATAR_HEIGHT }}
          />
          <Stack spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              height={AVATAR_HEIGHT}
            >
              <Typography variant="body1" noWrap>
                {user.displayName}
              </Typography>
              <PermissionsChip permissions={{ role }} />
            </Stack>

            <Metadata items={metadata} variant="caption" />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserRecordListCard;
