import { type ComponentProps } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import { TextField } from "@mui/material";
import Form from "@/components/forms/Form";

const MAX_LENGTH = 24;

type FormValues = { displayName: string };
type UserDisplayNameFormProps = Omit<
  ComponentProps<typeof Form<FormValues>>,
  "methods"
> &
  UseFormProps<FormValues>;

const UserDisplayNameForm = (props: UserDisplayNameFormProps) => {
  /** Values */

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: { displayName: "" },
    ...props,
  });

  return (
    <Form methods={methods} {...props}>
      <TextField
        label="Display Name"
        required
        error={Boolean(methods.formState.errors.displayName)}
        helperText={methods.formState.errors.displayName?.message}
        {...methods.register("displayName", {
          required: "Display Name is required",
          maxLength: {
            value: MAX_LENGTH,
            message: `Max length is ${String(MAX_LENGTH)}`,
          },
        })}
      />
    </Form>
  );
};

export default UserDisplayNameForm;
