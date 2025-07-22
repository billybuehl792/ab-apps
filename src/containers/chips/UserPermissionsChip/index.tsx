import { useQuery } from "@tanstack/react-query";
import { Chip, Skeleton, type ChipProps } from "@mui/material";
import { type User } from "firebase/auth";
import { type UserRecord } from "firebase-admin/auth";
import useUsers from "@/hooks/useUsers";
import { AuthRoleLabel } from "@/store/constants/auth";
import { sxAsArray } from "@/store/utils/sx";

const UserPermissionsChip = ({
  user,
  ...props
}: ChipProps & { user: User | UserRecord | string }) => {
  /** Values */

  const users = useUsers();
  const userId = typeof user === "string" ? user : user.uid;

  /** Queries */

  const permissionsQuery = useQuery(users.queries.permissions(userId));

  const hasRole = !!permissionsQuery.data?.role;
  const role = permissionsQuery.data?.role
    ? AuthRoleLabel[permissionsQuery.data.role]
    : "None";

  return (
    <Chip
      label={
        permissionsQuery.isLoading ? (
          <Skeleton variant="text" width={60} />
        ) : (
          role
        )
      }
      size="small"
      variant={hasRole ? "filled" : "outlined"}
      disabled={permissionsQuery.isLoading}
      {...props}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sx={[{ opacity: hasRole ? 1 : 0.5 }, ...sxAsArray(props.sx)]}
    />
  );
};

export default UserPermissionsChip;
