import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  CircularProgress,
  InputAdornment,
  Stack,
  type StandardTextFieldProps,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import CloseIconButton from "@/components/buttons/CloseIconButton";

interface SearchFieldProps
  extends Omit<StandardTextFieldProps, "value" | "onChange"> {
  value?: string;
  loading?: boolean;
  debounce?: number;
  onSearch?: (value: string) => void;
}

const SearchField = ({
  value: valueProp,
  loading,
  debounce = 500,
  onSearch,
  ...props
}: SearchFieldProps) => {
  const [value, setValue] = useState("");

  /** Callbacks */

  const handleDebouncedSearch = useDebouncedCallback(() => {
    onSearch?.(value);
  }, debounce);

  const handleChange: StandardTextFieldProps["onChange"] = (event) => {
    setValue(event.target.value);
    handleDebouncedSearch();
  };

  const handleClear = () => {
    setValue("");
    handleDebouncedSearch();
  };

  /** Effects */

  useEffect(() => {
    setValue(valueProp ?? "");
  }, [valueProp]);

  return (
    <TextField
      type="search"
      inputMode="search"
      placeholder="Search..."
      autoComplete="off"
      size="small"
      value={value}
      onChange={handleChange}
      slotProps={{
        root: {
          sx: {
            input: {
              "::-webkit-search-cancel-button": { WebkitAppearance: "none" },
            },
          },
        },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <Stack direction="row" spacing={1}>
              {loading && (
                <InputAdornment position="end">
                  <CircularProgress size={16} color="inherit" />
                </InputAdornment>
              )}
              {Boolean(value) && (
                <InputAdornment position="end">
                  <CloseIconButton onClick={handleClear} />
                </InputAdornment>
              )}
            </Stack>
          ),
        },
      }}
      {...props}
    />
  );
};

export default SearchField;
