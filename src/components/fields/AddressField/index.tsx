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

import useGoogleMaps from "@/hooks/google-maps/useGoogleMaps";
import AddressMenuItem from "@/components/menu-items/AddressMenuItem";
import { getBoundsFromLatLng } from "@/utils/maps";
import { DEFAULT_LAT_LNG } from "@/constants/maps";
import { EMPTY_OBJECT } from "@/constants/utility";
import type { Address } from "@/types/firebase";

const DEFAULT_BOUNDS = getBoundsFromLatLng(DEFAULT_LAT_LNG, 50);

interface AddressFieldProps
  extends Omit<UseAutocompleteProps<Address, false, false, false>, "options">,
    Pick<
      TextFieldProps,
      "label" | "placeholder" | "variant" | "error" | "helperText" | "size"
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
  error,
  helperText,
  slotProps: { textField: textFieldProps, option: optionProps } = EMPTY_OBJECT,
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
          error={error}
          helperText={helperText}
          {...textFieldProps}
          {...params}
          size={size}
          slotProps={{
            input: {
              ...(typeof textFieldProps?.slotProps?.input === "object"
                ? textFieldProps.slotProps.input
                : EMPTY_OBJECT),
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
      renderOption={(props, option) => (
        <AddressMenuItem
          {...props}
          key={option.place_id}
          value={option}
          {...optionProps}
        />
      )}
      {...props}
    />
  );
};

export default AddressField;
