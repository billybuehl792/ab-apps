import type { QueryKey } from "@/types/global";

/**
 * A helper function that simulates a delay using a Promise.
 * @param ms - delay in milliseconds
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Retrieve a `queryKey` used with `queryOptions`.
 * @param key - query key `string` identifier
 * @param options - query key `options` constraints and values
 */
const getQueryKey = <O extends QueryKey[1] = QueryKey[1]>(
  key: QueryKey[0],
  options?: O
): QueryKey<O> => [key, options as O];

export { getQueryKey };
