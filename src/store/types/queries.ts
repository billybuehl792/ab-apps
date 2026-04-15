import { type QueryDocumentSnapshot } from "firebase/firestore";

export interface IQueryFilter {
  field: string;
  operator:
    | "=="
    | "!="
    | "<"
    | "<="
    | ">"
    | ">="
    | "array-contains"
    | "in"
    | "array-contains-any";
  value: string | number | boolean | null;
}

export interface QueryParams<
  S extends QueryDocumentSnapshot = QueryDocumentSnapshot,
  O extends string = string,
> {
  startAfter?: S;
  limit?: number;
  orderBy?: O;
  filters?: IQueryFilter[];
}
