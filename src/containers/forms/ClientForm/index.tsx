import { type FC, type ComponentProps } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import { Stack } from "@mui/material";

import Form from "@/components/forms/Form";
import ClientFormFirstNameField from "./fields/ClientFormFirstNameField";
import ClientFormLastNameField from "./fields/ClientFormLastNameField";
import ClientFormEmailField from "./fields/ClientFormEmailField";
import ClientFormAddressField from "./fields/ClientFormAddressField";
import ClientFormPhoneField from "./fields/ClientFormPhoneField";
import { CLIENT_FORM_DEFAULT_VALUES } from "./constants";
import type { ClientFormValues } from "./types";

type ClientFormProps = Omit<
  ComponentProps<typeof Form<ClientFormValues>>,
  "methods"
> &
  UseFormProps<ClientFormValues>;

const ClientForm: FC<ClientFormProps> = (props) => {
  /** Values */

  const methods = useForm<ClientFormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: CLIENT_FORM_DEFAULT_VALUES,
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
