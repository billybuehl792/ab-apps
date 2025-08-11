import {
  Avatar,
  Card,
  CardContent,
  type CardProps,
  Divider,
  Grid2 as Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { type UserRecord } from "firebase-admin/auth";
import UserEmailChip from "@/containers/chips/UserEmailChip";
import PermissionsChip from "@/containers/chips/PermissionsChip";
import UserCompanyChip from "@/containers/chips/UserCompanyChip";
import EditIconButton from "@/components/buttons/EditIconButton";
import { DateTimeFormat } from "@/store/enums/datetime";
import type { Permissions } from "@/store/types/auth";

interface UserRecordDetailCardProps extends CardProps {
  user: UserRecord;
  editable?: boolean;
}

const UserRecordDetailCard = ({
  user,
  editable,
  ...props
}: UserRecordDetailCardProps) => {
  /** Values */

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
      value: <UserCompanyChip user={user} />,
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
            {editable && <EditIconButton size="small" />}
          </Stack>
        </Stack>
        <Stack flexGrow={2} flexShrink={0}>
          <Stack spacing={2} divider={<Divider />}>
            <Stack spacing={1}>
              {details.map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Typography variant="body2" color="textSecondary">
                    {item.label}:
                  </Typography>
                  {item.value}
                </Stack>
              ))}
            </Stack>
            <Grid container spacing={1}>
              {metadata.map((item) => (
                <Grid key={item.id} size={{ xs: 6, md: 4 }}>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="textSecondary">
                      {item.label}:
                    </Typography>
                    {item.value}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </CardContent>

      {/* Modals */}
      {editable && <></>}
    </Card>
  );
};

export default UserRecordDetailCard;
