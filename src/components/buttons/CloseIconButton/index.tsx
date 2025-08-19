import { type ReactNode } from "react";
import { IconButton, type IconButtonProps } from "@mui/material";
import { Close } from "@mui/icons-material";

interface CloseIconButtonProps extends IconButtonProps {
  icon?: ReactNode;
}

const CloseIconButton = ({ icon, ...props }: CloseIconButtonProps) => {
  return (
    <IconButton component="span" {...props}>
      {icon ?? <Close fontSize="inherit" />}
    </IconButton>
  );
};

export default CloseIconButton;
