import { type ComponentProps, type ReactNode } from "react";
import {
  Divider,
  type DrawerProps,
  Stack,
  type StackProps,
  Typography,
} from "@mui/material";
import CloseIconButton from "@/components/buttons/CloseIconButton";

interface DrawerHeaderProps extends Omit<StackProps, "title"> {
  title?: ReactNode;
  endContent?: ReactNode;
  hideDivider?: boolean;
  onClose?: DrawerProps["onClose"];
}

const DrawerHeader = ({
  title,
  endContent,
  hideDivider,
  onClose: onCloseProp,
  ...props
}: DrawerHeaderProps) => {
  /** Callbacks */

  const onClose: ComponentProps<typeof CloseIconButton>["onClick"] = (
    event
  ) => {
    onCloseProp?.(event, "escapeKeyDown");
  };

  return (
    <>
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
        {!!onCloseProp && (
          <Stack
            direction="row"
            flexGrow={1}
            alignItems="center"
            justifyContent="end"
          >
            {endContent}
            <CloseIconButton onClick={onClose} />
          </Stack>
        )}
      </Stack>
      {!hideDivider && <Divider variant="middle" />}
    </>
  );
};

export default DrawerHeader;
