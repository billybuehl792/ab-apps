import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  QuerySnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from ".";
import type { Customer } from "@/types/global";

const getCustomerCount = async (
  ...constraints: QueryConstraint[]
): Promise<number> => {
  try {
    const q = query(collection(db, "customers"), ...constraints);
    const querySnapshot = await getCountFromServer(q);

    return querySnapshot.data().count;
  } catch (error) {
    console.error("Error retrieving customer count:", error);
    throw error;
  }
};

const getCustomerList = async (
  ...constraints: QueryConstraint[]
): Promise<Customer[]> => {
  try {
    const q = query(collection(db, "customers"), ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Customer
    );
  } catch (error) {
    console.error("Error retrieving customers:", error);
    throw error;
  }
};

const getCustomerList2 = async (
  ...constraints: QueryConstraint[]
): Promise<QuerySnapshot<Customer>> => {
  try {
    const q = query(collection(db, "customers"), ...constraints);
    return (await getDocs(q)) as QuerySnapshot<Customer>;
  } catch (error) {
    console.error("Error retrieving customers:", error);
    throw error;
  }
};

const getCustomer = async (id: string): Promise<Customer> => {
  try {
    const customerDoc = await getDoc(doc(db, "customers", id));
    if (customerDoc.exists())
      return { id: customerDoc.id, ...customerDoc.data() } as Customer;
    else throw new Error("Customer not found");
  } catch (error) {
    console.error("Error retrieving customer:", error);
    throw error;
  }
};

const createCustomer = async (
  customer: Omit<Customer, "id">
): Promise<Customer> => {
  try {
    const customerDoc = await addDoc(collection(db, "customers"), customer);
    return { ...customer, id: customerDoc.id };
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

const updateCustomer = async ({
  id,
  ...customer
}: Customer): Promise<Customer> => {
  try {
    await updateDoc(doc(db, "customers", id), customer);
    return { id, ...customer };
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

const deleteCustomer = async (id: Customer["id"]): Promise<void> => {
  try {
    await deleteDoc(doc(db, "customers", id));
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export {
  getCustomerCount,
  getCustomerList,
  getCustomerList2,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
