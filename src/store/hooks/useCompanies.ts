import { companyQueries } from "@/store/queries/companies";

const useCompanies = () => {
  return {
    queries: { ...companyQueries },
  };
};

export default useCompanies;
