import { type ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

import EmailField from "@/components/fields/EmailField";
import { RegexPattern } from "@/utils/regex";
import type { ClientFormValues } from "../types";

const MAX_LENGTH = 128;

const ClientFormEmailField = (props: ComponentProps<typeof EmailField>) => {
  /** Values */

  const {
    formState: { errors },
    register,
  } = useFormContext<ClientFormValues>();

  return (
    <EmailField
      label="Email"
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

export default ClientFormEmailField;
