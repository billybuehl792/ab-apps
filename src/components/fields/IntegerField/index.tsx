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
        input: {
          inputProps: {
            inputMode: "numeric",
            pattern: "[0-9]*",
            step: "1",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ...props?.slotProps?.input?.inputProps,
          },
        },
      }}
    />
  );
};

export default IntegerField;
