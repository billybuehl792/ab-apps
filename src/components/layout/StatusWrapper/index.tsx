import { type ComponentProps, type JSX } from "react";
import {
  type ButtonProps,
  CircularProgress,
  Stack,
  Typography,
  type StackProps,
} from "@mui/material";
import EmptyState from "../EmptyState";
import ErrorCard from "@/components/cards/ErrorCard";

interface StatusWrapperProps extends StackProps {
  empty?: boolean | string | ComponentProps<typeof EmptyState>;
  error?: null | boolean | string | Error | JSX.Element;
  loading?: null | boolean | string | JSX.Element;
  loadingDescription?: string | null;
  errorIcon?: JSX.Element;
  loadingIcon?: JSX.Element;
  slotProps?: {
    errorButton?: ButtonProps;
    errorCard?: Partial<ComponentProps<typeof ErrorCard>>;
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
  loadingDescription,
  loadingIcon,
  errorIcon,
  slotProps,
  ...props
}: StatusWrapperProps) => {
  if (loading)
    if (typeof loading === "boolean" || typeof loading === "string")
      return (
        <StatusWrapperContainer {...props}>
          {typeof loading === "boolean"
            ? (loadingIcon ?? <CircularProgress size={40} color="inherit" />)
            : typeof loading === "string" && (
                <Typography color="info" noWrap>
                  {loading}
                </Typography>
              )}
          {loadingDescription && (
            <Typography variant="caption" color="textSecondary" noWrap>
              {loadingDescription}
            </Typography>
          )}
        </StatusWrapperContainer>
      );
    else return loading;
  else if (error) {
    return (
      <StatusWrapperContainer {...props}>
        <ErrorCard
          error={error}
          slotProps={{ errorButton: slotProps?.errorButton }}
          {...slotProps?.errorCard}
        />
      </StatusWrapperContainer>
    );
  } else if (empty) {
    return (
      <StatusWrapperContainer {...props}>
        <EmptyState
          minHeight={undefined}
          {...(typeof empty === "string" && { text: empty })}
          {...(typeof empty === "object" && { ...empty })}
          {...slotProps?.emptyState}
        />
      </StatusWrapperContainer>
    );
  }
  return children;
};

const StatusWrapperContainer = (props: StackProps) => {
  return (
    <Stack
      spacing={2}
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      p={4}
      {...props}
    />
  );
};

export default StatusWrapper;
