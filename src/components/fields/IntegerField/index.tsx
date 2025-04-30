import { TextField, type TextFieldProps } from "@mui/material";

/**
 * This component renders a `TextField` with a type of `number` and
 * restricts the input to only allow numeric values.
 */
const IntegerField = (props: TextFieldProps) => {
  return (
    <TextField
      type="number"
      {...props}
      slotProps={{
        ...props.slotProps,
        input: {
          inputProps: {
            inputMode: "numeric",
            pattern: "[0-9]*",
            step: "1",
            ...(typeof props.slotProps?.input === "object" &&
              "inputProps" in props.slotProps.input &&
              props.slotProps.input.inputProps),
          },
        },
      }}
    />
  );
};

export default IntegerField;
