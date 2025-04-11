import { TextField, type TextFieldProps } from "@mui/material";

const EmailField = (props: TextFieldProps) => {
  return <TextField label="Email" type="email" {...props} />;
};

export default EmailField;
