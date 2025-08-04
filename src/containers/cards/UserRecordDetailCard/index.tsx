import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Card,
  CardContent,
  type CardProps,
  Divider,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { type UserRecord } from "firebase-admin/auth";
import useUsers from "@/hooks/useUsers";
import UserEmailChip from "@/containers/chips/UserEmailChip";
import UserPermissionsChip from "@/containers/chips/UserPermissionsChip";
import UserCompanyChip from "@/containers/chips/UserCompanyChip";
import EditIconButton from "@/components/buttons/EditIconButton";
import { DateTimeFormat } from "@/store/enums/datetime";

interface UserRecordDetailCardProps extends CardProps {
  user: UserRecord | string;
  editable?: boolean;
}

const UserRecordDetailCard = ({
  user: userProp,
  editable,
  ...props
}: UserRecordDetailCardProps) => {
  /** Values */

  const users = useUsers();
  const userId = typeof userProp === "string" ? userProp : userProp.uid;

  /** Queries */

  const userRecordQuery = useQuery({
    ...users.queries.detail(userId),
    enabled: typeof userProp === "string",
  });

  /** Data */

  const user = typeof userProp === "string" ? userRecordQuery.data : userProp;

  /** Items */

  const details = [
    {
      id: "email",
      label: "Email",
      value: <UserEmailChip user={userProp} />,
    },
    {
      id: "id",
      label: "ID",
      value: <Typography variant="body2">{userId}</Typography>,
    },
    {
      id: "permissions",
      label: "Permissions",
      value: <UserPermissionsChip user={userProp} />,
    },
    {
      id: "company",
      label: "Company",
      value: <UserCompanyChip user={userProp} />,
    },
  ];

  const metadata = [
    {
      id: "lastSignInTime",
      label: "Last Sign In",
      value: user
        ? dayjs(user.metadata.lastSignInTime).format(
            DateTimeFormat.DATETIME_MERIDIEM
          )
        : "-",
    },
    {
      id: "creationTime",
      label: "Created At",
      value: user
        ? dayjs(user.metadata.creationTime).format(
            DateTimeFormat.DATETIME_MERIDIEM
          )
        : "-",
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
            src={user?.photoURL}
            alt={user?.displayName ?? user?.email ?? "User"}
            sx={{ width: 100, height: 100 }}
          />
          <Stack component="span" direction="row" spacing={1}>
            <Typography variant="body1">
              {user?.displayName ?? user?.email ?? "User"}
            </Typography>
            {editable && <EditIconButton size="small" />}
          </Stack>
        </Stack>
        <Stack flexGrow={2} flexShrink={0}>
          <Stack spacing={2} divider={<Divider />}>
            <Stack spacing={1}>
              {details.map((detail) => (
                <Stack
                  key={detail.id}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Typography variant="body2" color="textSecondary">
                    {detail.label}:
                  </Typography>
                  {detail.value}
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
                    <Typography variant="body2">{item.value}</Typography>
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
