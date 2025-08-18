import { type FormEventHandler, type ComponentProps } from "react";
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { FormHelperText, Stack, type StackProps } from "@mui/material";
import FormActions from "./FormActions";
import { getErrorMessage } from "@/store/utils/error";

interface FormProps<T extends FieldValues = FieldValues, R = unknown, E = Error>
  extends Omit<StackProps<"form">, "onSubmit" | "onError"> {
  methods: UseFormReturn<T, unknown, T>;
  showRootError?: boolean;
  onSubmit: (data: T) => R | Promise<R>;
  onSuccess?: (res: R) => void | Promise<void>;
  onError?: (error: E) => void | Promise<void>;
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
const Form = <T extends FieldValues = FieldValues, R = unknown, E = Error>({
  methods,
  children,
  showRootError,
  onSubmit: onSubmitProp,
  onSuccess,
  onError,
  onReset: onResetProp,
  slotProps,
  ...props
}: FormProps<T, R, E>) => {
  /** Callbacks */

  const onSubmit = methods.handleSubmit(async (formData) => {
    try {
      const res = await onSubmitProp(formData);
      await onSuccess?.(res);
    } catch (error) {
      methods.setError("root", { message: getErrorMessage(error as Error) });
      await onError?.(error as E);
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
        noValidate
        spacing={2}
        onSubmit={onSubmit}
        onReset={onReset}
        {...props}
      >
        <Stack spacing={2} {...slotProps?.fieldset}>
          {children}
          {showRootError && !!methods.formState.errors.root && (
            <FormHelperText error>
              {methods.formState.errors.root.message}
            </FormHelperText>
          )}
        </Stack>
        <FormActions {...slotProps?.actions} />
      </Stack>
    </FormProvider>
  );
};

export default Form;
