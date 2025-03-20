import type { QueryKey } from "@/types/global";
import type { QueryConstraint } from "firebase/firestore";

const getQueryKey = <C extends QueryConstraint = QueryConstraint>(
  identifier: QueryKey[0],
  options: QueryKey<C>[1] = {}
): QueryKey<C> => [identifier, options];

export { getQueryKey };
