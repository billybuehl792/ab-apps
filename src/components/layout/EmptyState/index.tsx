import { type JSX } from "react";
import { Stack, Typography, type StackProps } from "@mui/material";
import { FolderOff } from "@mui/icons-material";

interface EmptyStateProps extends StackProps {
  icon?: JSX.Element;
  text?: string | JSX.Element;
}

/**
 * This component renders an empty state with an optional icon and text.
 */
const EmptyState = ({
  icon,
  text = "No data available",
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
      {typeof text === "string" ? (
        <Typography color="textDisabled" textAlign="center">
          {text}
        </Typography>
      ) : (
        text
      )}
      {children}
    </Stack>
  );
};

export default EmptyState;
