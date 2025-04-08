/**
 * Calculates a bounding box around a given latitude and longitude, extending
 * a specified distance in miles. The bounding box is represented as a
 * `google.maps.LatLngBoundsLiteral` object.
 *
 * @param lat - The latitude of the central point.
 * @param lng - The longitude of the central point.
 * @param distanceInMiles - The distance in miles to extend from the central point
 *                          to calculate the bounds. Defaults to 50 miles.
 * @returns A `google.maps.LatLngBoundsLiteral` object representing the bounding box
 *          with `north`, `south`, `east`, and `west` boundaries.
 */
export const getBoundsFromLatLng = (
  lat: number,
  lng: number,
  distanceInMiles = 50
): google.maps.LatLngBoundsLiteral => {
  const milesToDegrees = distanceInMiles / 69; // Approx: 1 degree = ~69 miles
  const latDelta = milesToDegrees;
  const lngDelta = distanceInMiles / (Math.cos((lat * Math.PI) / 180) * 69);

  return {
    north: lat + latDelta,
    south: lat - latDelta,
    east: lng + lngDelta,
    west: lng - lngDelta,
  };
};
