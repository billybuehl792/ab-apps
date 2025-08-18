import { type QueryDocumentSnapshot } from "firebase/firestore";

export interface QueryParams<
  S extends QueryDocumentSnapshot = QueryDocumentSnapshot,
  O extends string = string,
> {
  archived?: boolean;
  startAfter?: S;
  limit?: number;
  orderBy?: O;
}
