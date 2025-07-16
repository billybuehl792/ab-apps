import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chip, Skeleton, type ChipProps } from "@mui/material";
import { type User } from "firebase/auth";
import useUsers from "@/hooks/useUsers";
import UserPermissionsFormDrawer from "@/containers/modals/UserPermissionsFormDrawer";
import { AuthRoleLabel } from "@/store/constants/auth";

const UserPermissionsChip = ({
  user,
  ...props
}: ChipProps & { user: User | string }) => {
  const [modalOpen, setModalOpen] = useState(false);

  /** Values */

  const users = useUsers();
  const userId = typeof user === "string" ? user : user.uid;

  /** Queries */

  const permissionsQuery = useQuery(users.queries.permissions(userId));

  const hasRole = !!permissionsQuery.data?.role;
  const role = permissionsQuery.data?.role
    ? AuthRoleLabel[permissionsQuery.data.role]
    : "None";

  /** Callbacks */

  const handleToggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
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
        onClick={handleToggleModal}
        sx={{ opacity: hasRole ? 1 : 0.5 }}
        {...props}
      />

      {/* Modals */}
      <UserPermissionsFormDrawer
        open={modalOpen}
        user={user}
        onClose={handleToggleModal}
      />
    </>
  );
};

export default UserPermissionsChip;
