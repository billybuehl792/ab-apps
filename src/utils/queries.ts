/**
 * A helper function that simulates a delay using a Promise.
 * @param ms - delay in milliseconds
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
