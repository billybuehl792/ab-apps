import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from ".";
import type { Customer } from "@/types/global";

const getCustomerList = async (): Promise<Customer[]> => {
  try {
    const q = query(collection(db, "customers"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Customer
    );
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
  getCustomerList,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
