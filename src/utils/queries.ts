import type { QueryKey } from "@/types/global";

const getQueryKey = <O extends QueryKey[1] = QueryKey[1]>(
  key: QueryKey[0],
  options?: O
): QueryKey<O> => [key, options as O];

export { getQueryKey };
