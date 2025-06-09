import { type ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneField from "@/components/fields/PhoneField";
import { RegexPattern } from "@/utils/regex";
import type { ClientData } from "@/types/firebase";

const ClientFormPhoneField = (props: ComponentProps<typeof PhoneField>) => {
  /** Values */

  const { control } = useFormContext<ClientData>();

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
          label="Phone"
          required
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
