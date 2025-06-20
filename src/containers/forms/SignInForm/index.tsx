import { type ComponentProps } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import type { UserCredential } from "firebase/auth";

import Form from "@/components/forms/Form";
import SignInFormPasswordField from "./fields/SignInFormPasswordField";
import SignInFormEmailField from "./fields/SignInFormEmailField";

export type SignInFormValues = { email: string; password: string };

type SignInFormProps = Omit<
  ComponentProps<typeof Form<SignInFormValues, UserCredential>>,
  "methods"
> &
  UseFormProps<SignInFormValues>;

const SignInForm = ({ onError, ...props }: SignInFormProps) => {
  /** Values */

  const methods = useForm<SignInFormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
    ...props,
  });

  /** Callbacks */

  const handleOnError: SignInFormProps["onError"] = (error) => {
    methods.resetField("password", { keepError: true });
    void onError?.(error);
  };

  return (
    <Form
      methods={methods}
      showRootError
      onError={handleOnError}
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
