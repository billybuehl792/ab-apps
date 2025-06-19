import { type ComponentProps, type JSX } from "react";
import {
  Button,
  type ButtonProps,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
  type StackProps,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { EMPTY_OBJECT } from "@/constants/utility";
import EmptyState from "../EmptyState";

interface StatusWrapperProps extends StackProps {
  empty?: boolean | string | ComponentProps<typeof EmptyState>;
  error?: null | boolean | string | Error | JSX.Element;
  loading?: null | boolean | string | JSX.Element;
  errorIcon?: JSX.Element;
  loadingIcon?: JSX.Element;
  slotProps?: {
    errorButton?: ButtonProps;
    emptyState?: ComponentProps<typeof EmptyState>;
  };
}

/**
 * This component renders a wrapper for displaying status messages.
 * If the `loading` prop is truthy, it displays a loading spinner.
 * If the `error` prop is truthy, it displays an error message.
 * If the `empty` prop is truthy, it displays an empty state.
 * Otherwise, it renders the children.
 */
const StatusWrapper = ({
  children,
  empty,
  error,
  loading,
  loadingIcon,
  errorIcon,
  slotProps: {
    emptyState: emptyStateProps,
    errorButton: errorButtonProps,
  } = EMPTY_OBJECT,
  ...props
}: StatusWrapperProps) => {
  if (loading)
    return (
      <StatusWrapperContainer {...props}>
        {typeof loading === "boolean" ? (
          (loadingIcon ?? <CircularProgress size="large" color="info" />)
        ) : typeof loading === "string" ? (
          <Typography color="info" noWrap>
            {loading}
          </Typography>
        ) : (
          loading
        )}
      </StatusWrapperContainer>
    );
  else if (error) {
    const errorMessage =
      typeof error === "string"
        ? error
        : error instanceof Error
          ? error.message
          : "Something went wrong...";

    return (
      <StatusWrapperContainer {...props}>
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
      </StatusWrapperContainer>
    );
  } else if (empty) {
    return (
      <StatusWrapperContainer {...props}>
        <EmptyState
          {...(typeof empty === "string" && { text: empty })}
          {...(typeof empty === "object" && { ...empty })}
          {...emptyStateProps}
        />
      </StatusWrapperContainer>
    );
  }
  return children;
};

const StatusWrapperContainer = (props: StackProps) => {
  return (
    <Stack
      spacing={1}
      flexGrow={1}
      minHeight={250}
      alignItems="center"
      justifyContent="center"
      {...props}
    />
  );
};

export default StatusWrapper;
