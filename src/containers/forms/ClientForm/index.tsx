import { type FC, type ComponentProps } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import { Stack } from "@mui/material";

import Form from "@/components/forms/Form";
import ClientFormFirstNameField from "./fields/ClientFormFirstNameField";
import ClientFormLastNameField from "./fields/ClientFormLastNameField";
import ClientFormEmailField from "./fields/ClientFormEmailField";
import ClientFormAddressField from "./fields/ClientFormAddressField";
import ClientFormPhoneField from "./fields/ClientFormPhoneField";
import { Client } from "@/store/types/clients";

export type ClientForm = Omit<Client, "id">;

type ClientFormProps = Omit<
  ComponentProps<typeof Form<ClientForm>>,
  "methods"
> &
  UseFormProps<ClientForm>;

const ClientForm: FC<ClientFormProps> = (props) => {
  /** Values */

  const methods = useForm<ClientForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      archived: false,
      address: {
        place_id: "",
        primary_text: "",
        secondary_text: "",
        text: "",
      },
    },
    ...props,
  });

  return (
    <Form methods={methods} {...props}>
      <Stack direction="row" spacing={2}>
        <ClientFormFirstNameField />
        <ClientFormLastNameField />
      </Stack>
      <ClientFormEmailField />
      <ClientFormAddressField />
      <ClientFormPhoneField />
    </Form>
  );
};

export default ClientForm;
