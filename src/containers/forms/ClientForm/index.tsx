import { type FC, type FormEvent } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  Fade,
  Stack,
  TextField,
  Typography,
  type StackProps,
} from "@mui/material";
import type { ClientData } from "@/firebase/types";

type FormValues = ClientData;

interface ClientFormProps
  extends Omit<StackProps, "onSubmit">,
    UseFormProps<FormValues> {
  title?: string;
  onSubmit: (data: FormValues) => void;
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
  title = "Client",
  values,
  onSubmit,
  ...props
}) => {
  /** Values */

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, isValid, disabled },
  } = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
    values: values ?? DEFAULT_VALUES,
    ...props,
  });

  return (
    <Stack
      component="form"
      spacing={1}
      onSubmit={handleSubmit(onSubmit)}
      onReset={(event: FormEvent) => {
        event.preventDefault();
        reset();
      }}
      {...props}
    >
      <Typography variant="h6">{title}</Typography>

      <Card component="fieldset" variant="outlined">
        <CardContent component={Stack} spacing={1}>
          <Stack direction="row" spacing={1}>
            <TextField
              type="text"
              label="First Name"
              {...register("first_name", {
                required: true,
                maxLength: 128,
                disabled,
              })}
            />
            <TextField
              type="text"
              label="Last Name"
              {...register("last_name", {
                required: true,
                maxLength: 128,
                disabled,
              })}
            />
          </Stack>
          <TextField
            type="email"
            label="Email"
            {...register("email", { required: true, maxLength: 128, disabled })}
          />
          <TextField
            type="text"
            label="Address"
            {...register("address", {
              required: true,
              maxLength: 130,
              disabled,
            })}
          />
          <TextField
            type="tel"
            label="Phone"
            {...register("phone", { required: true, maxLength: 16, disabled })}
          />
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
          variant="outlined"
          loading={isSubmitting}
          disabled={!isDirty || !isValid || disabled}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default ClientForm;
