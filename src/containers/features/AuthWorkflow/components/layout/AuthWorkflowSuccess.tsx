import { Box, Stack, Typography, type StackProps } from "@mui/material";
import { type User } from "firebase/auth";

const AuthWorkflowSuccess = ({
  user,
  ...props
}: StackProps & { user: User }) => {
  return (
    <Stack {...props}>
      <Typography variant="body1">
        {" Welcome, "}
        <Box component="span" fontWeight={600}>
          {user.displayName || user.email}
        </Box>
        !
      </Typography>
    </Stack>
  );
};

export default AuthWorkflowSuccess;
