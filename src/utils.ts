export const calculateDistanceInKilometers = (
  distanceInMeters: number | null
): number => {
  if (distanceInMeters === null || isNaN(distanceInMeters)) {
    return 0;
  }
  return Math.round(distanceInMeters / 1000);
};
