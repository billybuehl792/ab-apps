import { createContext } from "react";

interface GoogleMapsContextValue {
  places: google.maps.PlacesLibrary | null;
}

export default createContext<GoogleMapsContextValue>({
  places: null,
});
