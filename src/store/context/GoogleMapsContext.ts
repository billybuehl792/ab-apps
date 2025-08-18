import { createContext } from "react";

export default createContext<{
  places: google.maps.PlacesLibrary | null;
}>({
  places: null,
});
