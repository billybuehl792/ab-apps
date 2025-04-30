import { type ComponentProps } from "react";
import { CircularProgress } from "@mui/material";
import { useFormContext } from "react-hook-form";

import IntegerField from "@/components/fields/IntegerField";
import type { VerificationCodeFormValues } from "../types";

const CODE_LENGTH = 6;

const VerificationCodeFormCodeField = (
  props: ComponentProps<typeof IntegerField>
) => {
  /** Values */

  const methods = useFormContext<VerificationCodeFormValues>();

  return (
    <IntegerField
      label="Verification Code"
      type="text"
      autoComplete="one-time-code"
      error={Boolean(methods.formState.errors.code)}
      helperText={methods.formState.errors.code?.message}
      {...props}
      slotProps={{
        input: {
          endAdornment: methods.formState.isSubmitting && (
            <CircularProgress size={16} color="inherit" />
          ),
          ...(typeof props.slotProps?.input === "object" &&
            props.slotProps.input),
        },
      }}
      {...methods.register("code", {
        required: "Code is required",
        minLength: {
          value: CODE_LENGTH,
          message: `Min length is ${String(CODE_LENGTH)}`,
        },
        maxLength: {
          value: CODE_LENGTH,
          message: `Max length is ${String(CODE_LENGTH)}`,
        },
      })}
    />
  );
};

export default VerificationCodeFormCodeField;
