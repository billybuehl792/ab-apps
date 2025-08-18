import { type ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grow,
  Radio,
  RadioGroup,
  Stack,
  type StackProps,
} from "@mui/material";
import { type SortAndFilterFormValues } from "..";
import SortAndFilterFormResetSortButton from "../buttons/SortAndFilterFormResetSortButton";

interface SortAndFilterFormSortFieldProps<T extends string = string>
  extends StackProps {
  label?: ReactNode;
  options: MenuOption<T>[];
}

const SortAndFilterFormFilterField = <T extends string = string>({
  label = "Sort By",
  options,
  ...props
}: SortAndFilterFormSortFieldProps<T>) => {
  /** Values */

  const { control } = useFormContext<SortAndFilterFormValues<T>>();

  return (
    <Controller
      name="sort"
      control={control}
      render={({ field: { name, value, onChange, ...field } }) => (
        <Stack spacing={1} {...props}>
          <FormControl>
            <Stack direction="row" spacing={1} alignItems="center">
              <FormLabel id={`${name}-label`}>{label}</FormLabel>
              <Grow in={Boolean(value)}>
                <SortAndFilterFormResetSortButton />
              </Grow>
            </Stack>
            <RadioGroup
              name={name}
              aria-labelledby={`${name}-label`}
              value={value?.id || ""}
              onChange={(_, value) => {
                const selectedOption = options.find(({ id }) => id === value);
                onChange(selectedOption || null);
              }}
              {...field}
            >
              <FormControlLabel
                value=""
                label="None"
                control={<Radio />}
                sx={{ color: ({ palette }) => palette.text.disabled }}
              />
              {options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  label={option.label}
                  control={<Radio />}
                  disabled={option.disabled}
                  onClick={option.onClick}
                  sx={{
                    color: option.color ? `${option.color}.main` : undefined,
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Stack>
      )}
    />
  );
};

export default SortAndFilterFormFilterField;
