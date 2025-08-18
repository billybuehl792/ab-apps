import { type ReactNode } from "react";
import { Divider, Stack, Typography, type StackProps } from "@mui/material";

interface PageHeaderProps extends Omit<StackProps, "title"> {
  title?: ReactNode;
  endContent?: ReactNode;
  disableDivider?: boolean;
}

const PageHeader = ({
  title,
  endContent,
  disableDivider,
  ...props
}: PageHeaderProps) => {
  return (
    <Stack position="relative" p={2} {...props}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        height={24}
      >
        {typeof title === "string" ? (
          <Typography variant="body2" fontWeight="bold">
            {title}
          </Typography>
        ) : (
          title
        )}
        {endContent}
      </Stack>
      {!disableDivider && (
        <Divider
          variant="inset"
          sx={{ position: "absolute", bottom: 0, left: 0, right: 0, mx: 2 }}
        />
      )}
    </Stack>
  );
};

export default PageHeader;
