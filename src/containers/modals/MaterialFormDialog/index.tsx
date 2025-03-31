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
import MenuOptionsIconButton from "@/components/buttons/MenuOptionsIconButton";
import CloseIconButton from "@/components/buttons/CloseIconButton";
import type { MaterialData } from "@/firebase/types";
import DollarField from "@/components/fields/DollarField";

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
          {!!options && <MenuOptionsIconButton options={options} />}
        </Stack>
        <CloseIconButton onClick={onClose} />
      </DialogTitle>

      <Stack component={DialogContent} spacing={2} dividers>
        <TextField
          label="Title"
          fullWidth
          {...register("label", { required: "Material title is required." })}
        />
        <DollarField
          label="Cost / Unit"
          slotProps={{
            input: {
              inputProps: { min: 0, max: 5000 },
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
          {...register("value", {
            required: "Material cost is required.",
            valueAsNumber: true,
            validate: {
              positive: (value) =>
                value > 0 || "Material cost must be positive.",
              max: (value) =>
                value <= 5000 || "Material cost must be less than $5000.",
            },
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
