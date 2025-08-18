import { type User } from "firebase/auth";
import { Stack, type StackProps, Tooltip, Typography } from "@mui/material";
import { NewReleases, Verified } from "@mui/icons-material";
import { type UserRecord } from "firebase-admin/auth";

const UserEmailChip = ({
  user,
  ...props
}: StackProps & { user: User | UserRecord }) => {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center" {...props}>
      <Typography variant="caption" lineHeight={1}>
        {user.email}
      </Typography>
      <Tooltip
        title={user.emailVerified ? "Email verified" : "Email not verified"}
      >
        {user.emailVerified ? (
          <Verified fontSize="small" color="primary" />
        ) : (
          <NewReleases fontSize="small" color="warning" />
        )}
      </Tooltip>
    </Stack>
  );
};

export default UserEmailChip;
