import {
  collection,
  limit,
  orderBy,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import {
  clientConverter,
  companyConverter,
  materialConverter,
} from "../converters";
import { FirebaseCollection } from "../enums/firebase";
import type { QueryParams } from "../types/queries";

const getCompanyCollection = () =>
  collection(db, FirebaseCollection.COMPANIES).withConverter(companyConverter);

const getClientCollection = (companyId: string) =>
  collection(
    db,
    `${FirebaseCollection.COMPANIES}/${companyId}/${FirebaseCollection.CLIENTS}`
  ).withConverter(clientConverter);

const getMaterialCollection = (companyId: string) =>
  collection(
    db,
    `${FirebaseCollection.COMPANIES}/${companyId}/${FirebaseCollection.MATERIALS}`
  ).withConverter(materialConverter);

const getQueryConstraints = (params?: QueryParams) => {
  const constraints = [];
  if (typeof params?.archived === "boolean")
    constraints.push(where("archived", "==", params.archived));
  if (params?.startAfter) constraints.push(startAfter(params.startAfter));
  if (typeof params?.limit === "number") constraints.push(limit(params.limit));
  if (typeof params?.orderBy === "string")
    constraints.push(orderBy(params.orderBy));

  return constraints;
};

const collections = {
  getCompanyCollection,
  getClientCollection,
  getMaterialCollection,
};
const queries = { getQueryConstraints };

export const firebaseUtils = { collections, queries };
