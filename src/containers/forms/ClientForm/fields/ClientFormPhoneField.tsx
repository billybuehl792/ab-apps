import { Controller, useFormContext } from "react-hook-form";

import type { ClientFormValues } from "../types";
import PhoneField from "@/components/fields/PhoneField";
import { ComponentProps } from "react";
import { RegexPattern } from "@/utils/regex";

const ClientFormPhoneField = (props: ComponentProps<typeof PhoneField>) => {
  /** Values */

  const { control } = useFormContext<ClientFormValues>();

  return (
    <Controller
      name="phone"
      control={control}
      rules={{
        required: "Phone number is required",
        validate: {
          isTel: (value) =>
            !!value.match(RegexPattern.PHONE) || "Must be a valid phone number",
        },
      }}
      render={({ field, formState: { errors } }) => (
        <PhoneField
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
          {...props}
          {...field}
        />
      )}
    />
  );
};

export default ClientFormPhoneField;
