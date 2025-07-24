import { createFileRoute } from "@tanstack/react-router";
import CompanyList from "@/containers/lists/CompanyList";

export const Route = createFileRoute("/app/admin/companies/")({
  component: CompanyList,
});
