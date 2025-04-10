import { type FC, type ComponentProps } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import { Card, CardContent, Stack } from "@mui/material";

import Form from "@/components/forms/Form";
import ClientFormFirstNameField from "./fields/ClientFormFirstNameField";
import ClientFormLastNameField from "./fields/ClientFormLastNameField";
import ClientFormEmailField from "./fields/ClientFormEmailField";
import ClientFormAddressField from "./fields/ClientFormAddressField";
import ClientFormPhoneField from "./fields/ClientFormPhoneField";
import type { ClientData } from "@/types/firebase";

type ClientFormProps = Omit<
  ComponentProps<typeof Form<ClientData>>,
  "methods"
> &
  UseFormProps<ClientData>;

const ClientForm: FC<ClientFormProps> = ({ slotProps, ...props }) => {
  /** Values */

  const methods = useForm<ClientData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    ...props,
  });

  return (
    <Form
      methods={methods}
      slotProps={{ fieldset: { component: Card }, ...slotProps }}
      {...props}
    >
      <CardContent component={Stack} spacing={2}>
        <Stack direction="row" spacing={2}>
          <ClientFormFirstNameField />
          <ClientFormLastNameField />
        </Stack>
        <ClientFormEmailField />
        <ClientFormAddressField />
        <ClientFormPhoneField />
      </CardContent>
    </Form>
  );
};

export default ClientForm;
