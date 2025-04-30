import { type FC, type ComponentProps } from "react";
import { useForm, type UseFormProps } from "react-hook-form";

import Form from "@/components/forms/Form";
import UserFormPhotoUrlField from "./fields/UserFormPhotoUrlField";
import UserFormDisplayNameField from "./fields/UserFormDisplayNameField";
import type { UserFormValues } from "./types";

type UserFormProps = Omit<
  ComponentProps<typeof Form<UserFormValues>>,
  "methods"
> &
  UseFormProps<UserFormValues>;

const UserForm: FC<UserFormProps> = (props) => {
  /** Values */

  const methods = useForm<UserFormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    ...props,
  });

  return (
    <Form methods={methods} {...props}>
      <UserFormPhotoUrlField />
      <UserFormDisplayNameField />
    </Form>
  );
};

export default UserForm;
