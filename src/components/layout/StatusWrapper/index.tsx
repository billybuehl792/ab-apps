import { type JSX } from "react";
import {
  Button,
  ButtonProps,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
  type StackProps,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { EMPTY_OBJECT } from "@/constants/utility";

interface StatusWrapperProps extends StackProps {
  error?: null | boolean | string | Error | JSX.Element;
  loading?: null | boolean | string | JSX.Element;
  errorIcon?: JSX.Element;
  loadingIcon?: JSX.Element;
  slotProps?: {
    errorButton?: ButtonProps;
  };
}

/**
 * This component renders a wrapper for displaying status messages.
 * If the `loading` prop is truthy, it displays a loading spinner.
 * If the `error` prop is truthy, it displays an error message.
 * Otherwise, it renders the children.
 */
const StatusWrapper = ({
  children,
  error,
  loading,
  loadingIcon,
  errorIcon,
  slotProps: { errorButton: errorButtonProps } = EMPTY_OBJECT,
  ...props
}: StatusWrapperProps) => {
  if (loading)
    return (
      <Stack
        spacing={1}
        flexGrow={1}
        minHeight={250}
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        {typeof loading === "boolean" ? (
          (loadingIcon ?? <CircularProgress size="large" color="info" />)
        ) : typeof loading === "string" ? (
          <Typography color="info" noWrap>
            {loading}
          </Typography>
        ) : (
          loading
        )}
      </Stack>
    );
  else if (error) {
    const errorMessage =
      typeof error === "string"
        ? error
        : error instanceof Error
          ? error.message
          : "Something went wrong...";

    return (
      <Stack
        spacing={1}
        flexGrow={1}
        minHeight={250}
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        {typeof error === "boolean" ||
        typeof error === "string" ||
        error instanceof Error ? (
          <>
            {errorIcon ?? <ErrorOutline fontSize="large" color="error" />}
            <Tooltip title={errorMessage}>
              <Typography color="error" noWrap>
                {errorMessage}
              </Typography>
            </Tooltip>
          </>
        ) : (
          error
        )}
        {!!errorButtonProps && (
          <Button color="error" variant="outlined" {...errorButtonProps} />
        )}
      </Stack>
    );
  }
  return children;
};

export default StatusWrapper;
