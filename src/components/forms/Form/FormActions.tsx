import { type ReactNode } from "react";
import {
  Button,
  Stack,
  type ButtonProps,
  type StackProps,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

interface FormActionsProps extends StackProps {
  submitLabel?: ReactNode;
  resetLabel?: ReactNode;
  disableReset?: boolean;
  resetAsCancel?: boolean;
  slotProps?: {
    submitButton?: ButtonProps;
    resetButton?: ButtonProps;
  };
}

const FormActions = ({
  resetAsCancel,
  submitLabel = "Submit",
  resetLabel = resetAsCancel ? "Cancel" : "Reset",
  disableReset,
  slotProps,
  ...props
}: FormActionsProps) => {
  /** Values */

  const { formState } = useFormContext();

  return (
    <Stack direction="row-reverse" spacing={1} {...props}>
      <Button
        type="submit"
        loading={formState.isSubmitting}
        disabled={formState.disabled}
        {...slotProps?.submitButton}
      >
        {submitLabel}
      </Button>
      {!disableReset && (
        <Button
          type="reset"
          variant="text"
          color="error"
          disabled={
            formState.isSubmitting ||
            formState.disabled ||
            (!resetAsCancel && !formState.isDirty)
          }
          {...slotProps?.resetButton}
        >
          {resetLabel}
        </Button>
      )}
    </Stack>
  );
};

export default FormActions;
