import { type ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

import EmailField from "@/components/fields/EmailField";
import { RegexPattern } from "@/utils/regex";
import { ClientData } from "@/types/firebase";

const MAX_LENGTH = 128;

const ClientFormEmailField = (props: ComponentProps<typeof EmailField>) => {
  /** Values */

  const { formState, register } = useFormContext<ClientData>();

  return (
    <EmailField
      label="Email"
      required
      error={Boolean(formState.errors.email)}
      helperText={formState.errors.email?.message}
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
