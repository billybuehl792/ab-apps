import { type FC } from "react";
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
import { addDoc, QueryDocumentSnapshot, updateDoc } from "firebase/firestore";
import { clientCollection } from "@/firebase/collections";
import type { ClientData } from "@/firebase/types";

interface ClientForm
  extends Omit<StackProps, "onSuccess" | "onError">,
    UseFormProps<ClientData> {
  client?: QueryDocumentSnapshot<ClientData>;
  onSuccess?: (docId: string) => void;
  onError?: (error: Error) => void;
}

const ClientForm: FC<ClientForm> = ({
  client,
  onSuccess,
  onError,
  ...props
}) => {
  /** Values */

  const isEditForm = !!client;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, isValid, disabled },
  } = useForm<ClientData>({ values: client?.data(), ...props });

  /** Callbacks */

  const onSubmit: StackProps["onSubmit"] = handleSubmit(async (data) => {
    try {
      if (isEditForm) {
        await updateDoc(client.ref, { ...data });
        onSuccess?.(client.id);
      } else {
        const clientRef = await addDoc(clientCollection, data);
        onSuccess?.(clientRef.id);
      }
    } catch (error) {
      onError?.(error as Error);
    }
  });

  const onReset: StackProps["onReset"] = (event) => {
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
      <Typography variant="h6">
        {isEditForm ? "Edit" : "Create"} Client
      </Typography>

      <Card>
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
              {...register("first_name", {
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
        <Fade in={isEditForm && isDirty}>
          <Button
            type="reset"
            variant="outlined"
            color="error"
            disabled={isSubmitting || disabled}
          >
            Reset
          </Button>
        </Fade>
        <Button
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={!isDirty || !isValid || disabled}
        >
          {isEditForm ? "Update" : "Create"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ClientForm;
