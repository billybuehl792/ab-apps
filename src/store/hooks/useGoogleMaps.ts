import { use } from "react";

import GoogleMapsContext from "@/store/context/GoogleMapsContext";

const useGoogleMaps = () => use(GoogleMapsContext);

export default useGoogleMaps;
