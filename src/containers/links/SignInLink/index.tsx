import { Link } from "@tanstack/react-router";
import {
  Link as MuiLink,
  Typography,
  type LinkProps as MuiLinkProps,
} from "@mui/material";

const SignInLink = (props: MuiLinkProps) => {
  return (
    <MuiLink component={Link} to="/sign-in" underline="none" {...props}>
      <Typography component="span" variant="body2">
        Sign In
      </Typography>
    </MuiLink>
  );
};

export default SignInLink;
