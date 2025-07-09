import { use } from "react";

import GoogleMapsContext from "@/context/GoogleMapsContext";

const useGoogleMaps = () => use(GoogleMapsContext);

export default useGoogleMaps;
