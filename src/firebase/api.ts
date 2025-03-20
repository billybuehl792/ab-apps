import {
  addDoc,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { customerCollection } from "./collections";
import type { Customer, QueryOptions } from "@/types/global";

const getCustomerCount = (options?: QueryOptions) =>
  getCountFromServer(
    query(customerCollection, ...(options?.constraints ?? []))
  );

const getCustomerList = (options?: QueryOptions) =>
  getDocs(query(customerCollection, ...(options?.constraints ?? [])));

const getCustomer = (id: DocumentSnapshot["id"]) =>
  getDoc(doc(customerCollection, id));

const createCustomer = (customer: Customer) =>
  addDoc(customerCollection, customer);

const updateCustomer = async (id: DocumentSnapshot["id"], customer: Customer) =>
  updateDoc(doc(customerCollection, id), { ...customer });

const deleteCustomer = (id: DocumentSnapshot["id"]) =>
  deleteDoc(doc(customerCollection, id));

export {
  getCustomerCount,
  getCustomerList,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
