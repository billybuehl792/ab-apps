import { createFileRoute } from "@tanstack/react-router";
import ErrorCard from "@/components/cards/ErrorCard";
import type { Company } from "@/store/types/companies";
import StatusWrapper from "@/components/layout/StatusWrapper";
import CompanyDetailCard from "@/containers/cards/CompanyDetailCard";
import { companyQueries } from "@/store/queries/companies";

export const Route = createFileRoute("/app/admin/companies/$id")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const companyDetail = await context.queryClient.fetchQuery(
      companyQueries.detail(params.id)
    );
    const company: Company = { id: companyDetail.id, ...companyDetail.data() };
    return { company, crumb: company.label };
  },
  pendingComponent: () => (
    <StatusWrapper loading loadingDescription="loading company..." />
  ),
  errorComponent: ({ error }) => <ErrorCard error={error} />,
});

function RouteComponent() {
  /** Values */

  const { company } = Route.useLoaderData();

  return <CompanyDetailCard company={company} />;
}
