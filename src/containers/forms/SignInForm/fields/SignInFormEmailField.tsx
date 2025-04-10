import { type ComponentProps, type FC } from "react";
import { useFormContext } from "react-hook-form";
import EmailField from "@/components/fields/EmailField";
import { RegexPattern } from "@/lib/utils/regex";
import type { ClientData } from "@/types/firebase";

const MAX_LENGTH = 128;

const SignInFormEmailField: FC<ComponentProps<typeof EmailField>> = (props) => {
  /** Values */

  const {
    formState: { errors },
    register,
  } = useFormContext<ClientData>();

  return (
    <EmailField
      autoComplete="email"
      error={Boolean(errors.email)}
      helperText={errors.email?.message}
      {...register("email", {
        required: "Email is required",
        maxLength: {
          value: MAX_LENGTH,
          message: `Max length is ${MAX_LENGTH}`,
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
