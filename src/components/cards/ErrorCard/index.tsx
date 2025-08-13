import { type ReactNode, type JSX } from "react";
import {
  Button,
  type ButtonProps,
  Card,
  CardContent,
  type CardContentProps,
  type CardProps,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

interface ErrorCardProps extends CardProps {
  error: boolean | string | Error | JSX.Element;
  description?: ReactNode;
  icon?: JSX.Element;
  errorButton?: ButtonProps;
  slotProps?: {
    cardContent?: CardContentProps;
    errorButton?: ButtonProps;
  };
}

const ErrorCard = ({
  children,
  error = "Something went wrong...",
  description,
  icon,
  errorButton,
  slotProps,
  ...props
}: ErrorCardProps) => {
  /** Values */

  const message =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : typeof error === "boolean"
          ? "An unexpected error occurred."
          : undefined;

  const content =
    children ||
    (typeof error !== "string" &&
      typeof error !== "boolean" &&
      !(error instanceof Error) &&
      error);

  return (
    <Card {...props}>
      <CardContent
        component={Stack}
        spacing={1}
        alignItems="center"
        maxWidth="200"
        {...slotProps?.cardContent}
      >
        {message ? (
          <>
            {icon ?? <ErrorOutline fontSize="large" color="error" />}
            <Typography
              component="span"
              color="error"
              textAlign="center"
              sx={{ wordBreak: "break-word" }}
            >
              {message}
            </Typography>
          </>
        ) : (
          content
        )}
        {!!description && (
          <>
            <Divider sx={{ width: "100%" }} />
            {description}
          </>
        )}
        {(!!errorButton || !!slotProps?.errorButton) && (
          <Button
            children="Retry"
            {...errorButton}
            {...slotProps?.errorButton}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorCard;
