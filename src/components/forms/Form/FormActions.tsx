import { type ReactNode } from "react";
import {
  Button,
  Fade,
  Stack,
  type ButtonProps,
  type StackProps,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { EMPTY_OBJECT } from "@/constants/utility";

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
  slotProps: {
    resetButton: resetButtonProps,
    submitButton: submitButtonProps,
  } = EMPTY_OBJECT,
  ...props
}: FormActionsProps) => {
  /** Values */

  const {
    formState: { disabled, isDirty, isSubmitting },
  } = useFormContext();

  return (
    <Stack direction="row" spacing={1} justifyContent="flex-end" {...props}>
      {!disableReset && (
        <Fade in={isDirty || resetAsCancel}>
          <Button
            type="reset"
            variant="text"
            color="error"
            disabled={isSubmitting || disabled}
            {...resetButtonProps}
          >
            {resetLabel}
          </Button>
        </Fade>
      )}
      <Button
        type="submit"
        loading={isSubmitting}
        disabled={disabled}
        {...submitButtonProps}
      >
        {submitLabel}
      </Button>
    </Stack>
  );
};

export default FormActions;
