import { queryOptions } from "@tanstack/react-query";
import { getCustomerList } from "./api";
import { getQueryKey } from "@/utils/queries";
import type { QueryOptions } from "@/types/global";

const customerList = (options?: QueryOptions) =>
  queryOptions({
    queryKey: getQueryKey("customerList", options),
    queryFn: ({ queryKey: [_, options] }) => getCustomerList(options),
  });

export { customerList };
