import {
  InputAdornment,
  TextField,
  Typography,
  type TextFieldProps,
} from "@mui/material";

/**
 * This component renders a `TextField` with a type of `tel` and
 * restricts the input to only allow numeric values with a phone icon
 * as a prefix.
 */
const PhoneField = (props: TextFieldProps) => {
  return (
    <TextField
      type="tel"
      {...props}
      slotProps={{
        ...props.slotProps,
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Typography variant="body1">+1</Typography>
            </InputAdornment>
          ),
          ...(typeof props.slotProps?.input === "object" &&
            props.slotProps.input),
        },
      }}
    />
  );
};

export default PhoneField;
