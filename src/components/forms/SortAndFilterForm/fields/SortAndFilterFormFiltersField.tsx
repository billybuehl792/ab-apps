import { type ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grow,
  Stack,
  type StackProps,
} from "@mui/material";
import SortAndFilterFormResetFiltersButton from "../buttons/SortAndFilterFormResetFiltersButton";
import { type SortAndFilterFormValues } from "..";

interface SortAndFilterFormFiltersFieldProps<T extends string = string>
  extends StackProps {
  label?: ReactNode;
  options: MenuOption<T>[];
}

const SortAndFilterFormFiltersField = <T extends string = string>({
  label = "Filters",
  options,
  ...props
}: SortAndFilterFormFiltersFieldProps<T>) => {
  /** Values */

  const { control } = useFormContext<SortAndFilterFormValues<unknown, T>>();

  return (
    <Controller
      name="filters"
      control={control}
      render={({ field: { ref, value, disabled, onChange, onBlur } }) => (
        <Stack spacing={1} {...props}>
          <FormControl component="fieldset">
            <Stack direction="row" spacing={1} alignItems="center">
              <FormLabel component="legend">{label}</FormLabel>
              <Grow in={Boolean(value.length)}>
                <SortAndFilterFormResetFiltersButton />
              </Grow>
            </Stack>
            <FormGroup ref={ref} sx={{ ml: 2 }}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  label={option.label}
                  checked={!!value.some(({ id }) => id === option.id)}
                  disabled={option.disabled || disabled}
                  control={
                    <Checkbox
                      onChange={(event) => {
                        onChange(
                          event.target.checked
                            ? [...value, option]
                            : value.filter(({ id }) => id !== option.id)
                        );
                      }}
                      onBlur={onBlur}
                    />
                  }
                  onClick={option.onClick}
                  sx={{
                    color: option.color ? `${option.color}.main` : undefined,
                  }}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Stack>
      )}
    />
  );
};

export default SortAndFilterFormFiltersField;
