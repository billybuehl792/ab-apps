import { ComponentProps, type FC } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import type { UserCredential } from "firebase/auth";

import type { SignInFormValues } from "./types";
import SignInFormPasswordField from "./fields/SignInFormPasswordField";
import SignInFormEmailField from "./fields/SignInFormEmailField";
import Form from "@/components/forms/Form";

type SignInFormProps = Omit<
  ComponentProps<typeof Form<SignInFormValues, UserCredential>>,
  "methods"
> &
  UseFormProps<SignInFormValues>;

const SignInForm: FC<SignInFormProps> = (props) => {
  /** Values */

  const methods = useForm<SignInFormValues>(props);

  return (
    <Form methods={methods} showRootError {...props}>
      <SignInFormEmailField fullWidth />
      <SignInFormPasswordField fullWidth />
    </Form>
  );
};

export default SignInForm;
