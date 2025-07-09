/**
 * Calculates a bounding box around a given latitude and longitude, extending
 * a specified distance in miles. The bounding box is represented as a
 * `google.maps.LatLngBoundsLiteral` object.
 *
 * @param latLng - The latitude and longitude of the central point.
 * @param distanceInMiles - The distance in miles to extend from the central point
 *                          to calculate the bounds. Defaults to 50 miles.
 * @returns A `google.maps.LatLngBoundsLiteral` object representing the bounding box
 *          with `north`, `south`, `east`, and `west` boundaries.
 */
export const getBoundsFromLatLng = (
  latLng: google.maps.LatLngLiteral,
  distanceInMiles = 50
): google.maps.LatLngBoundsLiteral => {
  const milesToDegrees = distanceInMiles / 69; // Approx: 1 degree = ~69 miles
  const latDelta = milesToDegrees;
  const lngDelta =
    distanceInMiles / (Math.cos((latLng.lat * Math.PI) / 180) * 69);

  return {
    east: latLng.lng + lngDelta,
    north: latLng.lat + latDelta,
    south: latLng.lat - latDelta,
    west: latLng.lng - lngDelta,
  };
};
