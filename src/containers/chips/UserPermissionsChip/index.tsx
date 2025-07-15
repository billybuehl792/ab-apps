import { type ComponentProps, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chip, Skeleton, type ChipProps } from "@mui/material";
import { type User } from "firebase/auth";
import useUsers from "@/hooks/useUsers";
import UserPermissionsFormDrawer from "@/containers/modals/UserPermissionsFormDrawer";

const UserPermissionsChip = (props: ChipProps & { user: User }) => {
  const [modalOpen, setModalOpen] = useState(false);

  /** Values */

  const { queries: userQueries, mutations: userMutations } = useUsers();

  /** Queries */

  const permissionsQuery = useQuery(userQueries.permissions(props.user.uid));

  /** Callbacks */

  const handleSubmit: ComponentProps<
    typeof UserPermissionsFormDrawer
  >["onSubmit"] = (data) => {
    if (data.role === permissionsQuery.data?.role) {
      setModalOpen(false);
      return;
    }

    userMutations.updatePermissions.mutate(
      {
        user: props.user,
        permissions: { role: data.role },
      },
      {
        onSuccess: () => {
          setModalOpen(false);
        },
      }
    );
  };

  return (
    <>
      <Chip
        label={
          permissionsQuery.isLoading ? (
            <Skeleton variant="text" width={60} />
          ) : (
            (permissionsQuery.data?.role ?? "-")
          )
        }
        size="small"
        color="info"
        variant="filled"
        disabled={permissionsQuery.isLoading}
        onClick={() => {
          setModalOpen(true);
        }}
        {...props}
      />

      {/* Modals */}
      <UserPermissionsFormDrawer
        open={modalOpen}
        {...(permissionsQuery.isSuccess && { values: permissionsQuery.data })}
        onSubmit={handleSubmit}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
};

export default UserPermissionsChip;
