import { Stack, type StackProps, Typography } from "@mui/material";
import { type User } from "firebase/auth";
import UserPermissionsChip from "@/containers/chips/UserPermissionsChip";

const UserDetailCardPermissions = ({
  user,
  ...props
}: StackProps & { user: User }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      color="white"
      {...props}
    >
      <Typography variant="body2">Permissions:</Typography>
      <UserPermissionsChip user={user} />
    </Stack>
  );
};

export default UserDetailCardPermissions;
