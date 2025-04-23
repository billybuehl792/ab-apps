import { useRef } from "react";
import {
  Autocomplete,
  type AutocompleteProps,
  useJsApiLoader,
  type Libraries,
} from "@react-google-maps/api";
import { type ControllerRenderProps } from "react-hook-form";
import { IconButton, TextField, type TextFieldProps } from "@mui/material";
import { Close } from "@mui/icons-material";

import { getBoundsFromLatLng } from "@/utils/maps";
import { DEFAULT_LAT_LNG } from "@/constants/maps";

const LIBRARIES: Libraries = ["places"];
const TYPES = ["address"];

const DEFAULT_BOUNDS = getBoundsFromLatLng(
  DEFAULT_LAT_LNG.lat,
  DEFAULT_LAT_LNG.lng,
  50
);

interface FieldProps extends Omit<TextFieldProps<"standard">, "onChange"> {
  onChange: ControllerRenderProps["onChange"];
}

interface AddressFieldProps extends FieldProps {
  options?: google.maps.places.AutocompleteOptions;
  bounds?: google.maps.LatLngBoundsLiteral;
  onChange: ControllerRenderProps["onChange"];
  onPlaceChanged?: (place: google.maps.places.PlaceResult) => void;
}

const AddressField = ({
  ref,
  bounds = DEFAULT_BOUNDS,
  options,
  value,
  onChange,
  onPlaceChanged: onPlaceChangedProp,
  slotProps,
  ...props
}: AddressFieldProps) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  /** Values */

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries: LIBRARIES,
  });

  const Field = (
    <TextField
      inputRef={ref}
      value={value ?? ""}
      label="Address"
      fullWidth
      onChange={onChange}
      slotProps={{
        ...slotProps,
        input: {
          endAdornment: value ? (
            <IconButton
              onClick={() => {
                onChange("");
              }}
            >
              <Close />
            </IconButton>
          ) : undefined,
          ...(typeof slotProps?.input === "object" ? slotProps.input : {}),
        },
      }}
      {...props}
    />
  );

  /** Callbacks */

  const onLoad: Autocomplete["props"]["onLoad"] = (map) => {
    autocompleteRef.current = map;
  };

  const onPlaceChanged: AutocompleteProps["onPlaceChanged"] = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place) onPlaceChangedProp?.(place);
    onChange(place?.formatted_address || "");
  };

  if (!isLoaded) return Field;
  return (
    <Autocomplete
      types={TYPES}
      bounds={bounds}
      options={{ types: TYPES, bounds, strictBounds: true, ...options }}
      restrictions={{ country: "US" }}
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
    >
      {Field}
    </Autocomplete>
  );
};

export default AddressField;
