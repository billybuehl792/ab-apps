import type { QueryConstraint } from "firebase/firestore";

export interface Customer {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface MenuOption<T = string> {
  id: T;
  render?: boolean;
  label: string;
  icon?: IconDefinition | ReactNode;
  selected?: boolean;
  disabled?: boolean;
  tooltip?: string;
  onClick: (value?: IMenuOption, event?: React.MouseEvent) => void;
}

export interface QueryOptions<C extends QueryConstraint = QueryConstraint> {
  constraints?: C[];
}

export type QueryKey<C extends QueryConstraint = QueryConstraint> = [
  string,
  QueryOptions<C>,
];
