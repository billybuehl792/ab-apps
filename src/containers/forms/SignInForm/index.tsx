import { type FC } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  FormHelperText,
  Stack,
  type StackProps,
} from "@mui/material";
import PasswordField from "@/components/fields/PasswordField";
import EmailField from "@/components/fields/EmailField";
import { RegexPattern } from "@/utils/regex";
import { firebaseUtils } from "@/firebase/utils";

type FormValues = { email: string; password: string };

interface SignInFormProps
  extends Omit<StackProps<"form">, "onSubmit">,
    UseFormProps<FormValues> {
  onSubmit: (data: FormValues) => Promise<void>;
}

const DEFAULT_VALUES: FormValues = { email: "", password: "" };

const SignInForm: FC<SignInFormProps> = ({
  values,
  onSubmit: onSubmitProp,
  ...props
}) => {
  /** Values */

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, disabled, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
    values: values ?? DEFAULT_VALUES,
    shouldFocusError: true,
    ...props,
  });

  /** Callbacks */

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await onSubmitProp(formData);
    } catch (error) {
      setError("root", {
        message: firebaseUtils.getErrorMessage(error as Error),
      });
    }
  });

  return (
    <Stack component="form" spacing={1} onSubmit={onSubmit} {...props}>
      <Card>
        <CardContent component={Stack} spacing={2}>
          <Stack component="fieldset" spacing={2}>
            <EmailField
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                maxLength: { value: 128, message: "Email is too long" },
                pattern: {
                  value: RegexPattern.EMAIL,
                  message: "Invalid email",
                },
              })}
            />
            <PasswordField
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password is too short" },
                maxLength: { value: 128, message: "Password is too long" },
              })}
            />
          </Stack>
          {!!errors.root && (
            <FormHelperText error>{errors.root.message}</FormHelperText>
          )}
        </CardContent>
      </Card>

      <Stack direction="row" justifyContent="flex-end">
        <Button type="submit" loading={isSubmitting} disabled={disabled}>
          Sign In
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignInForm;
