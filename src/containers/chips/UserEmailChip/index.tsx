import { useQuery } from "@tanstack/react-query";
import { type User } from "firebase/auth";
import { Chip, Skeleton, Tooltip, type ChipProps } from "@mui/material";
import { NewReleases, Verified } from "@mui/icons-material";
import useUsers from "@/hooks/useUsers";
import { type UserRecord } from "firebase-admin/auth";

const UserEmailChip = ({
  user: userProp,
  ...props
}: ChipProps & { user: User | UserRecord | string }) => {
  /** Values */

  const users = useUsers();
  const userId = typeof userProp === "string" ? userProp : userProp.uid;

  /** Queries */

  const userQuery = useQuery(users.queries.detail(userId));
  const user = typeof userProp === "string" ? userQuery.data : userProp;

  return (
    <Chip
      label={
        userQuery.isLoading ? (
          <Skeleton variant="text" width={60} />
        ) : (
          (user?.email ?? "No Email")
        )
      }
      icon={
        <Tooltip
          title={user?.emailVerified ? "Email Verified" : "Email Not Verified"}
        >
          {user?.emailVerified ? (
            <Verified fontSize="small" />
          ) : (
            <NewReleases fontSize="small" />
          )}
        </Tooltip>
      }
      variant="outlined"
      size="small"
      sx={{ opacity: user?.emailVerified ? 1 : 0.5 }}
      {...props}
    />
  );
};

export default UserEmailChip;
