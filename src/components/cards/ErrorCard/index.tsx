import { type ReactNode, type JSX } from "react";
import {
  Card,
  CardContent,
  type CardContentProps,
  type CardProps,
  Stack,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { EMPTY_OBJECT } from "@/constants/utility";

interface ErrorCardProps extends CardProps {
  message?: ReactNode;
  error?: Error;
  icon?: JSX.Element;
  slotProps?: {
    cardContent?: CardContentProps;
  };
}

const ErrorCard = ({
  children,
  error,
  icon,
  message,
  slotProps: { cardContent: cardContentProps } = EMPTY_OBJECT,
  ...props
}: ErrorCardProps) => {
  /** Values */

  const content =
    children ?? message ?? error?.message ?? "Something went wrong...";

  return (
    <Card {...props}>
      <CardContent
        component={Stack}
        spacing={1}
        alignItems="center"
        {...cardContentProps}
      >
        {icon ?? <ErrorOutline fontSize="large" color="error" />}
        {typeof content === "string" ? (
          <Typography variant="body2">{content}</Typography>
        ) : (
          content
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorCard;
