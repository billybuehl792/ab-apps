import type { QueryConstraint } from "firebase/firestore";

export type Customer = QueryDocumentSnapshot<CustomerData>;
interface CustomerData {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface MenuOption<T = string> {
  id: T;
  render?: boolean;
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  tooltip?: string;
  onClick: (value?: IMenuOption, event?: React.MouseEvent) => void;
}

interface QueryOptions {
  id?: string;
  constraints?: QueryConstraint[];
}

export type QueryKey<O extends QueryOptions = QueryOptions> = [string, O];
