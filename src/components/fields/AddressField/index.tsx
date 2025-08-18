import { type ComponentProps, useEffect, useRef } from "react";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  type TextFieldProps,
  type UseAutocompleteProps,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useDebounce } from "use-debounce";
import useGoogleMaps from "@/store/hooks/useGoogleMaps";
import AddressMenuItem from "@/components/menu-items/AddressMenuItem";
import { getBoundsFromLatLng } from "@/store/utils/maps";
import { DEFAULT_LAT_LNG } from "@/store/constants/maps";
import type { Address } from "@/store/types/locations";

const DEFAULT_BOUNDS = getBoundsFromLatLng(DEFAULT_LAT_LNG, 50);

interface AddressFieldProps
  extends Omit<UseAutocompleteProps<Address, false, false, false>, "options">,
    Pick<
      TextFieldProps,
      | "label"
      | "placeholder"
      | "required"
      | "variant"
      | "error"
      | "helperText"
      | "size"
    > {
  slotProps?: {
    textField?: TextFieldProps;
    option?: Partial<ComponentProps<typeof AddressMenuItem>>;
  };
}

const AddressField = ({
  label,
  placeholder = "Search for an address",
  variant = "outlined",
  size,
  required,
  error,
  helperText,
  slotProps,
  ...props
}: AddressFieldProps) => {
  const [inputValue, setInputValue] = useDebounce("", 500);

  // https://developers.google.com/maps/documentation/javascript/place-autocomplete-data
  const autocompleteSessionTokenRef = useRef<
    google.maps.places.AutocompleteSessionToken | undefined
  >(undefined);

  /** Values */

  const { places } = useGoogleMaps();
  const { enqueueSnackbar } = useSnackbar();

  const autocompleteSuggestionsQuery = useQuery({
    queryKey: ["autocompleteSuggestions", inputValue] as const,
    staleTime: 1000 * 60, // 1 minute
    queryFn: async ({ queryKey: [_, inputValue] }) => {
      if (!places) throw new Error("Google Places Library not loaded");

      const { suggestions } =
        await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: inputValue,
          locationRestriction: DEFAULT_BOUNDS,
          origin: DEFAULT_LAT_LNG,
          includedPrimaryTypes: ["street_address"], // https://developers.google.com/maps/documentation/places/web-service/place-types
          language: "en-US",
          region: "us",
          sessionToken: autocompleteSessionTokenRef.current,
        });

      return suggestions.map(
        ({ placePrediction }): Address => ({
          place_id: placePrediction?.placeId ?? "",
          primary_text: placePrediction?.mainText?.text ?? "",
          secondary_text: placePrediction?.secondaryText?.text ?? "",
          text: placePrediction?.text.text ?? "",
        })
      );
    },
    enabled: !!places && !!inputValue.trim(),
  });

  /** Effects */

  useEffect(() => {
    if (places && !autocompleteSessionTokenRef.current)
      autocompleteSessionTokenRef.current =
        new places.AutocompleteSessionToken();
  }, [places]);

  useEffect(() => {
    if (autocompleteSuggestionsQuery.isError)
      enqueueSnackbar("Could not load autocomplete suggestions", {
        variant: "error",
      });
  }, [autocompleteSuggestionsQuery.isError, enqueueSnackbar]);

  useEffect(() => {
    if (props.value) setInputValue(props.value.text);
  }, [props.value, setInputValue]);

  return (
    <Autocomplete
      options={autocompleteSuggestionsQuery.data ?? []}
      noOptionsText={
        !places
          ? "Could not load Google Places Library"
          : autocompleteSuggestionsQuery.isLoading
            ? "Searching..."
            : "No results found"
      }
      getOptionKey={(option) => option.place_id}
      getOptionLabel={(option) => option.text}
      onInputChange={(_event, value) => {
        setInputValue(value);
      }}
      disableClearable={!inputValue}
      renderInput={(params) => (
        <TextField
          label={label}
          placeholder={placeholder}
          variant={variant}
          required={required}
          error={error}
          helperText={helperText}
          {...slotProps?.textField}
          {...params}
          size={size}
          slotProps={{
            input: {
              ...(typeof slotProps?.textField?.slotProps?.input === "object"
                ? slotProps.textField.slotProps.input
                : null),
              ...params.InputProps,
              endAdornment: (
                <>
                  {autocompleteSuggestionsQuery.isLoading ? (
                    <CircularProgress color="inherit" size={16} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
      renderOption={({ key: _key, ...props }, option) => (
        <AddressMenuItem
          key={option.place_id}
          {...props}
          value={option}
          {...slotProps?.option}
        />
      )}
      {...props}
    />
  );
};

export default AddressField;
