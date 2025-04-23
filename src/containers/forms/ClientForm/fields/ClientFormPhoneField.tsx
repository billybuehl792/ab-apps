import { Controller, useFormContext } from "react-hook-form";
import {
  matchIsValidTel,
  MuiTelInput,
  type MuiTelInputProps,
} from "mui-tel-input";
import type { ClientData } from "@/types/firebase";

const ClientFormPhoneField = (props: MuiTelInputProps) => {
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
            matchIsValidTel(value, { onlyCountries: ["US"] }) ||
            "Must be a valid phone number",
        },
      }}
      render={({
        field: { ref, value, ...fieldProps },
        formState: { errors },
      }) => (
        <MuiTelInput
          {...fieldProps}
          label="Phone"
          inputRef={ref}
          value={value}
          helperText={errors.phone?.message}
          error={Boolean(errors.phone)}
          defaultCountry="US"
          onlyCountries={["US"]}
          disableDropdown
          {...props}
          forceCallingCode
        />
      )}
    />
  );
};

export default ClientFormPhoneField;
