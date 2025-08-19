import {
  Avatar,
  Card,
  CardContent,
  type CardProps,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { type UserRecord } from "firebase-admin/auth";
import Metadata from "@/components/lists/Metadata";
import UserEmailChip from "@/containers/chips/UserEmailChip";
import PermissionsChip from "@/containers/chips/PermissionsChip";
import CompanyChip from "@/containers/chips/CompanyChip";
import { DateTimeFormat } from "@/store/enums/datetime";
import type { Permissions } from "@/store/types/auth";

interface UserRecordDetailCardProps extends CardProps {
  user: UserRecord;
}

const UserRecordDetailCard = ({
  user,
  ...props
}: UserRecordDetailCardProps) => {
  /** Values */

  const companyId = String(user.customClaims?.companyId ?? "");
  const role = (user.customClaims?.role ?? null) as Permissions["role"];
  const displayName = user.displayName ?? user.email ?? "User";

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
      value: <PermissionsChip permissions={{ role }} />,
    },
    {
      id: "company",
      label: "Company",
      value: <CompanyChip company={companyId} />,
    },
  ];

  const metadata = [
    {
      id: "creationTime",
      label: "Created",
      value: (
        <Tooltip
          title={dayjs(user.metadata.creationTime).format(
            DateTimeFormat.DATETIME_MERIDIEM
          )}
        >
          <Typography variant="body2" width="fit-content">
            {dayjs(user.metadata.creationTime).fromNow()}
          </Typography>
        </Tooltip>
      ),
    },
    {
      id: "lastSignInTime",
      label: "Last Sign In",
      value: (
        <Tooltip
          title={dayjs(user.metadata.lastSignInTime).format(
            DateTimeFormat.DATETIME_MERIDIEM
          )}
        >
          <Typography variant="body2" width="fit-content">
            {dayjs(user.metadata.lastSignInTime).fromNow()}
          </Typography>
        </Tooltip>
      ),
    },
  ];

  return (
    <Card {...props}>
      <CardContent
        component={Stack}
        direction="row"
        spacing={2}
        flexWrap="wrap"
        useFlexGap
      >
        <Stack spacing={1} flexGrow={1} alignItems="center">
          <Avatar
            src={user.photoURL}
            alt={displayName}
            sx={{ width: 100, height: 100 }}
          />
          <Stack component="span" direction="row" spacing={1}>
            <Typography variant="body1">{displayName}</Typography>
          </Stack>
        </Stack>
        <Stack flexGrow={2}>
          <Stack spacing={2} divider={<Divider />}>
            <Metadata items={details} spacing={1} />
            <Metadata
              items={metadata}
              direction="row"
              spacing={4}
              slotProps={{
                item: { direction: "column" },
              }}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserRecordDetailCard;
