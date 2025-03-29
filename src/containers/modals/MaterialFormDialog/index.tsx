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
  Typography,
} from "@mui/material";
import { useForm, type UseFormProps } from "react-hook-form";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import MenuIconButton from "@/components/buttons/MenuIconButton";
import CloseIconButton from "@/components/buttons/CloseIconButton";
import type { MaterialData } from "@/firebase/types";

type FormValues = MaterialData;

interface MaterialFormDialogProps
  extends Omit<DialogProps, "onSubmit">,
    UseFormProps<FormValues> {
  title?: string;
  options?: MenuOption[];
  onSubmit: (data: FormValues) => void;
}

const DEFAULT_VALUES: FormValues = {
  label: "",
  value: 0,
  description: "",
};

const MaterialFormDialog: FC<MaterialFormDialogProps> = ({
  title = "Material",
  values,
  options,
  onClose,
  onSubmit: onSubmitProp,
  onTransitionExited: onTransitionExitedProp,
  ...props
}) => {
  const [showMoreEnabled, setShowMoreEnabled] = useState(false);

  /** Values */

  const {
    register,
    handleSubmit,
    reset,
    formState: { disabled, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
    values: values ?? DEFAULT_VALUES,
    ...props,
  });

  /** Callbacks */

  const onSubmit: FormEventHandler = handleSubmit(onSubmitProp);

  const onReset: FormEventHandler = (event) => {
    event.preventDefault();
    reset();
  };

  const onTransitionExited: DialogProps["onTransitionExited"] = () => {
    reset(DEFAULT_VALUES);
    setShowMoreEnabled(false);
    onTransitionExitedProp?.();
  };

  return (
    <Dialog
      fullWidth
      aria-hidden={false}
      slotProps={{
        paper: { component: "form", onSubmit, onReset },
      }}
      onClose={onClose}
      onTransitionExited={onTransitionExited}
      {...props}
    >
      <DialogTitle
        component={Stack}
        direction="row"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} alignItems="center" width="100%">
          <Typography variant="inherit" noWrap>
            {title}
          </Typography>
          {!!options && <MenuIconButton options={options} />}
        </Stack>
        <CloseIconButton onClick={onClose} />
      </DialogTitle>

      <Stack component={DialogContent} spacing={2} dividers>
        <TextField
          label="Title"
          fullWidth
          {...register("label", { required: "Material title is required." })}
        />
        <TextField
          label="Cost / Unit"
          type="number"
          slotProps={{
            input: {
              inputProps: { min: 0, max: 5000, step: 1 },
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
          {...register("value", {
            required: "Material cost is required.",
            valueAsNumber: true,
          })}
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
