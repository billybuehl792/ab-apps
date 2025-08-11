import { type ComponentProps } from "react";
import { useQuery } from "@tanstack/react-query";
import { type UserRecord } from "firebase-admin/auth";
import useUsers from "@/store/hooks/useUsers";
import CompanyChip from "../CompanyChip";

const UserCompanyChip = ({
  user: userProp,
  ...props
}: Partial<ComponentProps<typeof CompanyChip>> & {
  user: UserRecord | string;
}) => {
  /** Values */

  const users = useUsers();
  const userId = typeof userProp === "string" ? userProp : userProp.uid;

  /** Queries */

  const userQuery = useQuery({
    ...users.queries.detail(userId),
    enabled: typeof userProp === "string",
  });
  const user = typeof userProp === "string" ? userQuery.data : userProp;
  const companyId = String(user?.customClaims?.companyId ?? "");

  return <CompanyChip company={companyId} {...props} />;
};

export default UserCompanyChip;
