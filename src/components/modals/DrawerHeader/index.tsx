import { type ReactNode, type FC } from "react";
import {
  type DrawerProps,
  Stack,
  type StackProps,
  Typography,
} from "@mui/material";
import CloseIconButton from "@/components/buttons/CloseIconButton";

interface DrawerHeaderProps extends Omit<StackProps, "title"> {
  title?: ReactNode;
  endContent?: ReactNode;
  onClose?: DrawerProps["onClose"];
}

const DrawerHeader: FC<DrawerHeaderProps> = ({
  title,
  endContent,
  onClose,
  ...props
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      px={2}
      py={1}
      {...props}
    >
      {!!title &&
        (typeof title === "string" ? (
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        ) : (
          title
        ))}
      {!!onClose && (
        <Stack
          direction="row"
          flexGrow={1}
          alignItems="center"
          justifyContent="end"
        >
          {endContent}
          <CloseIconButton
            onClick={(event) => onClose(event, "escapeKeyDown")}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default DrawerHeader;
