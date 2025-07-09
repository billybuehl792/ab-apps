import { type ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

import EmailField from "@/components/fields/EmailField";
import { RegexPattern } from "@/store/utils/regex";
import type { SignInForm } from "..";

const MAX_LENGTH = 128;

const SignInFormEmailField = (props: ComponentProps<typeof EmailField>) => {
  /** Values */

  const {
    formState: { errors },
    register,
  } = useFormContext<SignInForm>();

  return (
    <EmailField
      label="Email"
      autoComplete="email"
      required
      error={Boolean(errors.email)}
      helperText={errors.email?.message}
      {...register("email", {
        required: "Email is required",
        maxLength: {
          value: MAX_LENGTH,
          message: `Max length is ${String(MAX_LENGTH)}`,
        },
        pattern: {
          value: RegexPattern.EMAIL,
          message: "Invalid email",
        },
      })}
      {...props}
    />
  );
};

export default SignInFormEmailField;
