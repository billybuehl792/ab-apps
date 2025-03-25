import { type FormEventHandler, type FC, useState } from "react";
import {
  Button,
  Collapse,
  collapseClasses,
  Dialog,
  DialogActions,
  DialogContent,
  type DialogProps,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useForm, type UseFormProps } from "react-hook-form";
import type { MaterialData } from "@/firebase/types";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

type FormValues = MaterialData;

interface MaterialFormDialog
  extends Omit<DialogProps, "onSubmit">,
    UseFormProps<FormValues> {
  title?: string;
  onSubmit: (data: FormValues) => void;
}

const MaterialFormDialog: FC<MaterialFormDialog> = ({
  title = "Material Editor",
  onClose,
  onSubmit: onSubmitProp,
  ...props
}) => {
  const [showMoreEnabled, setShowMoreEnabled] = useState(false);

  /** Values */

  const {
    register,
    handleSubmit,
    reset,
    formState: { disabled, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>(props);

  /** Callbacks */

  const onSubmit: FormEventHandler = handleSubmit(onSubmitProp);

  const onReset: FormEventHandler = (event) => {
    event.preventDefault();
    reset();
  };

  return (
    <Dialog
      fullWidth
      slotProps={{ paper: { component: "form", onSubmit, onReset } }}
      onClose={onClose}
      {...props}
    >
      <DialogTitle>{title}</DialogTitle>
      <Stack
        component={DialogContent}
        spacing={2}
        dividers
        sx={{ overflow: "visible" }}
      >
        <TextField
          label="Title"
          fullWidth
          disabled={isSubmitting}
          {...register("label")}
        />
        <TextField
          label="Cost / Unit"
          disabled={isSubmitting}
          type="number"
          slotProps={{
            input: {
              inputProps: { min: 0, max: 5000, step: 1 },
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
          {...register("value")}
        />

        <Stack direction="row" justifyContent="center">
          <Button
            size="small"
            endIcon={showMoreEnabled ? <ArrowDropUp /> : <ArrowDropDown />}
            onClick={() => setShowMoreEnabled((prev) => !prev)}
          >
            Show {showMoreEnabled ? "Less" : "More"}
          </Button>
        </Stack>

        <Collapse
          in={showMoreEnabled}
          sx={{
            mt: "0 !important",
            [`.${collapseClasses.wrapperInner}`]: { mt: 2 },
          }}
        >
          <TextField
            label="Description"
            fullWidth
            disabled={isSubmitting}
            {...register("description")}
          />
        </Collapse>
      </Stack>

      <DialogActions>
        <Button
          color="error"
          disabled={isSubmitting}
          onClick={() => onClose?.(new Event("close"), "backdropClick")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={disabled || !isValid || !isDirty}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MaterialFormDialog;
