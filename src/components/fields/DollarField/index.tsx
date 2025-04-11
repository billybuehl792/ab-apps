import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";

/**
 * This component renders a `TextField` with a type of `number` and
 * restricts the input to only allow numeric values with a dollar sign
 * as a prefix.
 */
const DollarField = (props: TextFieldProps) => {
  /** Callbacks */

  const onKeyDown: TextFieldProps["onKeyDown"] = (event) => {
    if (
      ["Backspace", "Delete", "Tab", "Escape", "Enter", "-", "."].includes(
        event.key
      )
    )
      return;
    else if (isNaN(Number(event.key))) event.preventDefault();
  };

  return (
    <TextField
      placeholder="0.00"
      type="number"
      onKeyDown={onKeyDown}
      {...props}
      slotProps={{
        ...props.slotProps,
        input: {
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          ...(typeof props.slotProps?.input === "object"
            ? props.slotProps.input
            : {}),
          inputProps: {
            inputMode: "decimal",
            pattern: "[0-9]*",
            type: "number",
            step: "any",
            ...(typeof props.slotProps?.input === "object" &&
            "inputProps" in props.slotProps.input
              ? props.slotProps.input.inputProps
              : {}),
          },
        },
      }}
    />
  );
};

export default DollarField;
