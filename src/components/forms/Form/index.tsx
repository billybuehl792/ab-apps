import { type FormEventHandler, type ComponentProps } from "react";
import { type FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { FormHelperText, Stack, type StackProps } from "@mui/material";

import FormActions from "./FormActions";
import { getErrorMessage } from "@/lib/utils/error";

interface FormProps<T extends FieldValues, R = void>
  extends Omit<StackProps<"form">, "onSubmit" | "onError">,
    Pick<
      ComponentProps<typeof FormActions>,
      "submitLabel" | "resetLabel" | "disableReset" | "resetAsCancel"
    > {
  methods: UseFormReturn<T, unknown, T>;
  showRootError?: boolean;
  onSubmit?: (data: T) => Promise<R | undefined>;
  onSuccess?: (res: Awaited<R>) => void;
  onError?: (error: Error) => void;
  slotProps?: {
    fieldset?: StackProps;
    actions?: Partial<ComponentProps<typeof FormActions>>;
  };
}

/**
 * This component is a wrapper around the `react-hook-form` library
 * that provides a form structure with a submit and reset button.
 * It uses the `useFormContext` hook to access the form methods and state.
 */
const Form = <T extends FieldValues, R = void>({
  methods,
  children,
  submitLabel,
  resetLabel,
  disableReset,
  resetAsCancel,
  showRootError,
  onSubmit: onSubmitProp,
  onSuccess,
  onError,
  onReset: onResetProp,
  slotProps: { fieldset: fieldsetProps, actions: actionsProps } = {},
  ...props
}: FormProps<T, R>) => {
  /** Callbacks */

  const onSubmit = methods.handleSubmit(async (formData) => {
    try {
      const res = await onSubmitProp?.(formData);
      if (res) onSuccess?.(res);
    } catch (error) {
      methods.setError("root", {
        message: getErrorMessage(error as Error),
      });

      onError?.(error as Error);
    }
  });

  const onReset: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onResetProp?.(event);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        spacing={2}
        onSubmit={onSubmit}
        onReset={onReset}
        {...props}
      >
        <Stack component="fieldset" spacing={2} {...fieldsetProps}>
          {children}
          {showRootError && !!methods.formState.errors.root && (
            <FormHelperText error>
              {methods.formState.errors.root.message}
            </FormHelperText>
          )}
        </Stack>
        <FormActions
          submitLabel={submitLabel}
          resetLabel={resetLabel}
          disableReset={disableReset}
          resetAsCancel={resetAsCancel}
          {...actionsProps}
        />
      </Stack>
    </FormProvider>
  );
};

export default Form;
