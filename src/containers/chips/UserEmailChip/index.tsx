import { useQuery } from "@tanstack/react-query";
import { type User } from "firebase/auth";
import {
  Skeleton,
  Stack,
  type StackProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { NewReleases, Verified } from "@mui/icons-material";
import useUsers from "@/hooks/useUsers";
import { type UserRecord } from "firebase-admin/auth";

const UserEmailChip = ({
  user: userProp,
  ...props
}: StackProps & { user: User | UserRecord | string }) => {
  /** Values */

  const users = useUsers();
  const userId = typeof userProp === "string" ? userProp : userProp.uid;

  /** Queries */

  const userQuery = useQuery({
    ...users.queries.detail(userId),
    enabled: typeof userProp === "string",
  });
  const user = typeof userProp === "string" ? userQuery.data : userProp;

  return (
    <Stack direction="row" spacing={1} alignItems="center" {...props}>
      {userQuery.isLoading ? (
        <Skeleton variant="text" width={100} />
      ) : (
        <Typography variant="caption">{user?.email}</Typography>
      )}
      <Tooltip
        title={user?.emailVerified ? "Email verified" : "Email not verified"}
      >
        {user?.emailVerified ? (
          <Verified fontSize="small" color="primary" />
        ) : (
          <NewReleases fontSize="small" color="warning" />
        )}
      </Tooltip>
    </Stack>
  );
};

export default UserEmailChip;
