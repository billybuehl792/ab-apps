import { type ComponentProps } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import type { UserCredential } from "firebase/auth";

import Form from "@/components/forms/Form";
import SignInFormPasswordField from "./fields/SignInFormPasswordField";
import SignInFormEmailField from "./fields/SignInFormEmailField";
import { SIGN_IN_FORM_DEFAULT_VALUES } from "./constants";
import type { SignInFormValues } from "./types";

type SignInFormProps = Omit<
  ComponentProps<typeof Form<SignInFormValues, UserCredential>>,
  "methods"
> &
  UseFormProps<SignInFormValues>;

const SignInForm = (props: SignInFormProps) => {
  /** Values */

  const methods = useForm<SignInFormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: SIGN_IN_FORM_DEFAULT_VALUES,
    ...props,
  });

  return (
    <Form
      methods={methods}
      showRootError
      {...props}
      slotProps={{
        ...props.slotProps,
        actions: {
          submitLabel: "Sign In",
          disableReset: true,
          ...props.slotProps?.actions,
        },
      }}
    >
      <SignInFormEmailField fullWidth />
      <SignInFormPasswordField fullWidth />
    </Form>
  );
};

export default SignInForm;
