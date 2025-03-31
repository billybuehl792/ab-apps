import { type FC } from "react";
import { TextField, type TextFieldProps } from "@mui/material";

const IntegerField: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      type="number"
      placeholder="0"
      onKeyDown={(event) => {
        if (["Backspace", "Delete", "Tab", "Escape", "-"].includes(event.key))
          return;
        else if (isNaN(Number(event.key))) event.preventDefault();
      }}
      {...props}
      slotProps={{
        ...props?.slotProps,
        htmlInput: {
          type: "number",
          step: "1",
          pattern: "[0-9]*",
          ...props?.slotProps?.htmlInput,
        },
      }}
    />
  );
};

export default IntegerField;
