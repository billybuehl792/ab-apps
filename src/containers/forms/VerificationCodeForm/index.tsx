import { type ComponentProps } from "react";
import { useForm, type UseFormProps } from "react-hook-form";

import Form from "@/components/forms/Form";
import VerificationCodeFormCodeField from "./fields/VerificationCodeFormCodeField";
import type { UserCredential } from "firebase/auth";

export type VerificationCodeFormValues = {
  code: string;
};

type VerificationCodeFormProps = Omit<
  ComponentProps<typeof Form<VerificationCodeFormValues, UserCredential>>,
  "methods"
> &
  UseFormProps<VerificationCodeFormValues>;

const VerificationCodeForm = (props: VerificationCodeFormProps) => {
  /** Values */

  const methods = useForm<VerificationCodeFormValues>(props);

  return (
    <Form
      methods={methods}
      showRootError
      {...props}
      slotProps={{ actions: { disableReset: true }, ...props.slotProps }}
    >
      <VerificationCodeFormCodeField />
    </Form>
  );
};

export default VerificationCodeForm;
