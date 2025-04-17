import { type FC, type ComponentProps } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import { Card, CardContent, Divider, Stack } from "@mui/material";

import Form from "@/components/forms/Form";
import UserFormPhotoUrlField from "./fields/UserFormPhotoUrlField";
import UserFormDisplayNameField from "./fields/UserFormDisplayNameField";
import type { UserFormValues } from "./types";

type UserFormProps = Omit<
  ComponentProps<typeof Form<UserFormValues>>,
  "methods"
> &
  UseFormProps<UserFormValues>;

const UserForm: FC<UserFormProps> = ({ slotProps, ...props }) => {
  /** Values */

  const methods = useForm<UserFormValues>({
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
      <CardContent
        component={Stack}
        spacing={2}
        divider={<Divider variant="inset" />}
      >
        <UserFormPhotoUrlField />
        <UserFormDisplayNameField />
      </CardContent>
    </Form>
  );
};

export default UserForm;
