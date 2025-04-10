import { ComponentProps, type FC } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import { TextField } from "@mui/material";
import type { UserCredential } from "firebase/auth";

import Form from "@/components/forms/Form";

type FormValues = { code: string };
type VerificationCodeFormProps = Omit<
  ComponentProps<typeof Form<FormValues, UserCredential>>,
  "methods"
> &
  UseFormProps<FormValues>;

const CODE_LENGTH = 6;

const VerificationCodeForm: FC<VerificationCodeFormProps> = (props) => {
  /** Values */

  const methods = useForm<FormValues>(props);
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <Form methods={methods} disableReset {...props}>
      <TextField
        error={Boolean(errors.code)}
        helperText={errors.code?.message}
        {...register("code", {
          required: "Code is required",
          minLength: {
            value: CODE_LENGTH,
            message: `Min length is ${CODE_LENGTH}`,
          },
          maxLength: {
            value: CODE_LENGTH,
            message: `Max length is ${CODE_LENGTH}`,
          },
        })}
      />
    </Form>
  );
};

export default VerificationCodeForm;
