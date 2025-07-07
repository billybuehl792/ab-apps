import { Chip, Stack, type StackProps, Typography } from "@mui/material";
import type { Permissions } from "@/types/auth";

const UserDetailCardPermissions = ({
  permissions,
  ...props
}: StackProps & { permissions: Permissions | null }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      color="white"
      {...props}
    >
      <Typography variant="body2">Level:</Typography>
      <Chip
        label={permissions?.role.toCapitalized() ?? "-"}
        size="small"
        color="info"
        variant="filled"
      />
    </Stack>
  );
};

export default UserDetailCardPermissions;
