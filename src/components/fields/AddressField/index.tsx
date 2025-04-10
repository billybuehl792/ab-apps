import { useRef, type FC } from "react";
import {
  Autocomplete,
  useJsApiLoader,
  type Libraries,
} from "@react-google-maps/api";
import { type ControllerRenderProps } from "react-hook-form";
import {
  IconButton,
  Skeleton,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { getBoundsFromLatLng } from "@/lib/utils/maps";

const LIBRARIES: Libraries = ["places"];
const TYPES = ["address"];

interface AddressFieldProps
  extends Omit<TextFieldProps<"standard">, "onChange"> {
  options?: google.maps.places.AutocompleteOptions;
  bounds?: google.maps.LatLngBoundsLiteral;
  onChange: ControllerRenderProps["onChange"];
  onPlaceChanged?: (place: google.maps.places.PlaceResult) => void;
}

const AddressField: FC<AddressFieldProps> = ({
  ref,
  bounds,
  options,
  value,
  onChange,
  onPlaceChanged: onPlaceChangedProp,
  ...props
}) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  /** Values */

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  /** Callbacks */

  const onLoad: Autocomplete["props"]["onLoad"] = async (map) => {
    if (!bounds)
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.setBounds(getBoundsFromLatLng(latitude, longitude));
      });

    autocompleteRef.current = map;
  };

  const onPlaceChanged = (onChange: ControllerRenderProps["onChange"]) => {
    const place = autocompleteRef.current?.getPlace();
    if (place) onPlaceChangedProp?.(place);
    onChange(place?.formatted_address || "");
  };

  if (!isLoaded) return <Skeleton variant="rounded" />;
  return (
    <Autocomplete
      types={TYPES}
      options={{ strictBounds: true, ...options }}
      restrictions={{ country: "US" }}
      onLoad={onLoad}
      onPlaceChanged={() => onPlaceChanged(onChange)}
    >
      <TextField
        inputRef={ref}
        value={value}
        label="Address"
        fullWidth
        onChange={onChange}
        slotProps={{
          input: {
            endAdornment: value ? (
              <IconButton onClick={() => onChange("")}>
                <Close />
              </IconButton>
            ) : undefined,
          },
        }}
        {...props}
      />
    </Autocomplete>
  );
};

export default AddressField;
