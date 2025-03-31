import { type FC } from "react";
import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";

const DollarField: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      placeholder="0.00"
      type="number"
      {...props}
      slotProps={{
        ...props?.slotProps,
        input: {
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          ...props?.slotProps?.input,
          inputProps: {
            inputMode: "decimal",
            pattern: "[0-9]*",
            type: "number",
            step: "any",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ...props?.slotProps?.input?.inputProps,
          },
        },
      }}
    />
  );
};

export default DollarField;
