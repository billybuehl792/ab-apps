import { type FC } from "react";
import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";

const PercentField: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      placeholder="0"
      type="percent"
      {...props}
      slotProps={{
        ...props?.slotProps,
        input: {
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
          ...props?.slotProps?.input,
          inputProps: {
            inputMode: "decimal",
            pattern: "[0-9]*",
            type: "number",
            step: "any",
            max: 100,
            min: 0,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ...props?.slotProps?.input?.inputProps,
          },
        },
      }}
    />
  );
};

export default PercentField;
