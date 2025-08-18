import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import GoogleMapsContext from "@/store/context/GoogleMapsContext";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  libraries: ["places"],
});

const GoogleMapsProvider = ({ children }: PropsWithChildren) => {
  const [places, setPlaces] = useState<google.maps.PlacesLibrary | null>(null);

  /** Effects */

  useEffect(() => {
    const handleLoad = async () => {
      const places = await loader.importLibrary("places");
      setPlaces(places);
    };

    void handleLoad();
  }, []);

  return (
    <GoogleMapsContext value={useMemo(() => ({ places }), [places])}>
      {children}
    </GoogleMapsContext>
  );
};

export default GoogleMapsProvider;
