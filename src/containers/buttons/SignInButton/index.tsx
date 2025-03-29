import { type FC } from "react";
import { Link } from "@tanstack/react-router";
import { Button, type ButtonProps } from "@mui/material";

const SignInButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      component={Link}
      variant="text"
      color="inherit"
      to="/sign-in"
      {...props}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
