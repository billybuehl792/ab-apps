import { type ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

import PasswordField from "@/components/fields/PasswordField";
import type { SignInForm } from "..";

const MAX_LENGTH = 128;
const MIN_LENGTH = 12;

const SignInFormPasswordField = (
  props: ComponentProps<typeof PasswordField>
) => {
  /** Values */

  const { formState, register } = useFormContext<SignInForm>();

  return (
    <PasswordField
      label="Password"
      required
      autoComplete="current-password"
      error={Boolean(formState.errors.password)}
      helperText={formState.errors.password?.message}
      {...register("password", {
        required: "Password is required",
        minLength: {
          value: MIN_LENGTH,
          message: `Min length is ${String(MIN_LENGTH)}`,
        },
        maxLength: {
          value: MAX_LENGTH,
          message: `Max length is ${String(MAX_LENGTH)}`,
        },
      })}
      {...props}
    />
  );
};

export default SignInFormPasswordField;
