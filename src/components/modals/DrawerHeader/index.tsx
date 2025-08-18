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
  onClose?: DrawerProps["onClose"];
}

const DrawerHeader = ({
  title,
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
        py={1.5}
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
        {!!onCloseProp && <CloseIconButton onClick={onClose} />}
      </Stack>
      <Divider variant="middle" />
    </>
  );
};

export default DrawerHeader;
