import { type ReactNode } from "react";
import {
  Stack,
  Typography,
  TypographyProps,
  type StackProps,
} from "@mui/material";

interface MetaDataProps extends StackProps {
  items: { id: string; label: string; value: ReactNode }[];
  variant?: TypographyProps["variant"];
  slotProps?: {
    item?: StackProps;
    label?: TypographyProps;
    value?: TypographyProps;
  };
}

const Metadata = ({
  items,
  variant = "body2",
  slotProps,
  ...props
}: MetaDataProps) => {
  /** Values */

  const itemDirection = slotProps?.item?.direction ?? "row";
  const showSeparator = Boolean(
    itemDirection === "row" || itemDirection === "row-reverse"
  );

  return (
    <Stack {...props}>
      {items.map((item) => (
        <Stack
          key={item.id}
          direction={itemDirection}
          spacing={1}
          {...slotProps?.item}
        >
          <Typography
            variant={variant}
            color="textSecondary"
            {...slotProps?.label}
          >
            {item.label}
            {showSeparator && ":"}
          </Typography>
          {typeof item.value === "string" ? (
            <Typography
              variant={variant}
              color="textPrimary"
              {...slotProps?.value}
            >
              {item.value}
            </Typography>
          ) : (
            item.value
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default Metadata;
