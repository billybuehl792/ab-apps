import { type ReactNode, type FormEventHandler } from "react";
import { type FieldValues, useFormContext } from "react-hook-form";
import { Button, Fade, Stack, type StackProps } from "@mui/material";
import { firebaseUtils } from "@/firebase/utils";

interface FormProps<T extends FieldValues>
  extends Omit<StackProps<"form">, "onSubmit">,
    Pick<FormActionsProps, "submitLabel" | "resetLabel" | "disableReset"> {
  onSubmit?: (data: T) => Promise<void>;
  slotProps?: {
    fieldset?: StackProps;
    actions?: Partial<FormActionsProps>;
  };
}

interface FormActionsProps extends StackProps {
  submitLabel?: ReactNode;
  resetLabel?: ReactNode;
  disableReset?: boolean;
}

/**
 * This component is a wrapper around the `react-hook-form` library
 * that provides a form structure with a submit and reset button.
 * It uses the `useFormContext` hook to access the form methods and state.
 */
const Form = <T extends FieldValues>({
  children,
  submitLabel,
  resetLabel,
  disableReset,
  onSubmit: onSubmitProp,
  slotProps: { fieldset: fieldsetProps, actions: actionsProps } = {},
  ...props
}: FormProps<T>) => {
  /** Values */

  const methods = useFormContext<T>();

  /** Callbacks */

  const onSubmit = methods.handleSubmit(async (formData) => {
    try {
      await onSubmitProp?.(formData);
    } catch (error) {
      methods.setError("root", {
        message: firebaseUtils.getErrorMessage(error as Error),
      });
    }
  });

  const onReset: FormEventHandler = (event) => {
    event.preventDefault();
    methods.reset();
  };

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={onSubmit}
      onReset={onReset}
      {...props}
    >
      <Stack component="fieldset" spacing={2} {...fieldsetProps}>
        {children}
      </Stack>
      <FormActions
        submitLabel={submitLabel}
        resetLabel={resetLabel}
        disableReset={disableReset}
        {...actionsProps}
      />
    </Stack>
  );
};

const FormActions = ({
  submitLabel = "Submit",
  resetLabel = "Reset",
  disableReset,
  ...props
}: FormActionsProps) => {
  /** Values */

  const {
    formState: { disabled, isDirty, isSubmitting },
  } = useFormContext();

  return (
    <Stack direction="row" spacing={1} justifyContent="flex-end" {...props}>
      {!disableReset && (
        <Fade in={isDirty}>
          <Button
            type="reset"
            variant="text"
            color="error"
            disabled={isSubmitting || disabled}
          >
            {resetLabel}
          </Button>
        </Fade>
      )}
      <Button
        type="submit"
        loading={isSubmitting}
        disabled={!isDirty || disabled}
      >
        {submitLabel}
      </Button>
    </Stack>
  );
};

export default Form;
