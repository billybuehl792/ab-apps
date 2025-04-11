import { type ReactNode, type ComponentProps } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  type DialogProps,
} from "@mui/material";

import MaterialForm from "@/containers/forms/MaterialForm";
import DialogTitle from "@/components/modals/DialogTitle";
import { EMPTY_OBJECT } from "@/constants/utility";

interface MaterialFormDialogProps extends Omit<DialogProps, "slotProps"> {
  label?: ReactNode;
  slotProps?: {
    title?: Partial<ComponentProps<typeof DialogTitle>>;
    form?: Partial<ComponentProps<typeof MaterialForm>>;
  } & DialogProps["slotProps"];
}

const MaterialFormDialog = ({
  label = "Material",
  onClose,
  slotProps: { title: titleProps, form: formProps } = EMPTY_OBJECT,
  ...props
}: MaterialFormDialogProps) => {
  return (
    <Dialog fullWidth aria-hidden={false} onClose={onClose} {...props}>
      <DialogTitle label={label} onClose={onClose} {...titleProps} />
      <MaterialForm
        spacing={0}
        {...formProps}
        slotProps={{
          ...formProps?.slotProps,
          fieldset: {
            component: DialogContent,
            ...formProps?.slotProps?.fieldset,
          },
          actions: {
            component: DialogActions,
            ...formProps?.slotProps?.actions,
          },
        }}
      />
    </Dialog>
  );
};

export default MaterialFormDialog;
