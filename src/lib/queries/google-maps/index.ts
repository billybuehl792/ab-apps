import { queryOptions } from "@tanstack/react-query";

type Granularity =
  | "GRANULARITY_UNSPECIFIED"
  | "SUB_PREMISE"
  | "PREMISE"
  | "PREMISE_PROXIMITY"
  | "BLOCK"
  | "ROUTE"
  | "OTHER";

interface AddressValidationResponse {
  result?: {
    verdict?: {
      addressComplete?: boolean;
      inputGranularity?: Granularity;
    };
  };
}

export const validateAddress = (address: string) =>
  queryOptions({
    queryKey: ["validateAddress", address] as const,
    queryFn: async ({ queryKey: [_, address] }) => {
      const response = await fetch(
        `https://addressvalidation.googleapis.com/v1:validateAddress?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: {
              regionCode: "US",
              addressLines: [address],
            },
          }),
        }
      );
      const data = (await response.json()) as AddressValidationResponse;
      const isComplete = Boolean(data.result?.verdict?.addressComplete);

      return isComplete;
    },
  });
