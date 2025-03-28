import { type FC } from "react";
import { TextField, type TextFieldProps } from "@mui/material";

const EmailField: FC<TextFieldProps> = (props) => {
  return <TextField label="Email" type="email" {...props} />;
};

export default EmailField;
