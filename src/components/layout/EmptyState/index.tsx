import { type ReactNode, type JSX } from "react";
import { Stack, Typography, type StackProps } from "@mui/material";
import { FolderOff } from "@mui/icons-material";

interface EmptyStateProps extends StackProps {
  icon?: JSX.Element;
  description?: ReactNode;
}

const EmptyState = ({
  icon,
  description = "No data available",
  children,
  ...props
}: EmptyStateProps) => {
  return (
    <Stack
      spacing={1}
      flexGrow={1}
      minHeight={250}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {icon ?? <FolderOff fontSize="large" color="disabled" />}
      {typeof description === "string" ? (
        <Typography color="textDisabled" textAlign="center">
          {description}
        </Typography>
      ) : (
        description
      )}
      {children}
    </Stack>
  );
};

export default EmptyState;
