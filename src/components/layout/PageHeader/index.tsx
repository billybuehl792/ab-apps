import { type ReactNode } from "react";
import {
  Container,
  type ContainerProps,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

interface PageHeaderProps extends Omit<ContainerProps, "title"> {
  title?: ReactNode;
  endContent?: ReactNode;
  bottomContent?: ReactNode;
}

const PageHeader = ({
  title,
  endContent,
  bottomContent,
  ...props
}: PageHeaderProps) => {
  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        position: "sticky",
        top: 0,
        bgcolor: ({ palette }) => palette.background.paper,
        zIndex: ({ zIndex }) => zIndex.appBar,
      }}
      {...props}
    >
      <Stack p={2}>
        <Stack spacing={1}>
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
          {bottomContent}
        </Stack>
        <Divider
          variant="inset"
          sx={{ position: "absolute", bottom: 0, left: 0, right: 0, mx: 2 }}
        />
      </Stack>
    </Container>
  );
};

export default PageHeader;
