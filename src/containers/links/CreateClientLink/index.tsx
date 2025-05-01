import { Link } from "@tanstack/react-router";
import {
  Link as MuiLink,
  Stack,
  Typography,
  type LinkProps as MuiLinkProps,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const CreateClientLink = (props: MuiLinkProps) => {
  return (
    <MuiLink
      component={Link}
      to="/clients/create"
      color="primary"
      underline="none"
      {...props}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Add color="primary" fontSize="small" />
        <Typography component="span" variant="body2">
          Client
        </Typography>
      </Stack>
    </MuiLink>
  );
};

export default CreateClientLink;
