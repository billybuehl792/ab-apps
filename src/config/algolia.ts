import { algoliasearch } from "algoliasearch";

export const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID as string,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY as string
);
