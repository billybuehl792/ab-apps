import { type FormEventHandler, type FC } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  Fade,
  FormHelperText,
  Stack,
  TextField,
  type StackProps,
} from "@mui/material";
import { firebaseUtils } from "@/firebase/utils";
import EmailField from "@/components/fields/EmailField";
import { RegexPattern } from "@/utils/regex";
import type { ClientData } from "@/firebase/types";

type FormValues = ClientData;

interface ClientFormProps
  extends Omit<StackProps<"form">, "onSubmit">,
    UseFormProps<FormValues> {
  onSubmit: (data: FormValues) => Promise<void>;
}

const DEFAULT_VALUES: FormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: 0,
};

const ClientForm: FC<ClientFormProps> = ({
  values,
  onSubmit: onSubmitProp,
  ...props
}) => {
  /** Values */

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isDirty, disabled },
  } = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
    values: values ?? DEFAULT_VALUES,
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

  const onReset: FormEventHandler = (event) => {
    event.preventDefault();
    reset();
  };

  return (
    <Stack
      component="form"
      spacing={1}
      onSubmit={onSubmit}
      onReset={onReset}
      {...props}
    >
      <Card component="fieldset">
        <CardContent component={Stack} spacing={1}>
          <Stack component="fieldset" spacing={2}>
            <Stack direction="row" spacing={1}>
              <TextField
                type="text"
                label="First Name"
                error={Boolean(errors.first_name)}
                helperText={errors.first_name?.message}
                fullWidth
                {...register("first_name", {
                  required: "First name is required",
                  maxLength: { value: 128, message: "First name is too long" },
                })}
              />
              <TextField
                type="text"
                label="Last Name"
                error={Boolean(errors.last_name)}
                helperText={errors.last_name?.message}
                fullWidth
                {...register("last_name", {
                  required: "Last name is required",
                  maxLength: { value: 128, message: "Last name is too long" },
                })}
              />
            </Stack>
            <EmailField
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
            <TextField
              type="text"
              label="Address"
              error={Boolean(errors.address)}
              helperText={errors.address?.message}
              {...register("address", {
                required: "Address is required",
                maxLength: { value: 128, message: "Address is too long" },
              })}
            />
            <TextField
              type="tel"
              label="Phone"
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
              {...register("phone", {
                required: "Phone is required",
                maxLength: { value: 16, message: "Phone is too long" },
              })}
            />
          </Stack>
          {!!errors.root && (
            <FormHelperText error>{errors.root.message}</FormHelperText>
          )}
        </CardContent>
      </Card>

      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Fade in={isDirty}>
          <Button
            type="reset"
            variant="text"
            color="error"
            disabled={isSubmitting || disabled}
          >
            Reset
          </Button>
        </Fade>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={!isDirty || disabled}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default ClientForm;
