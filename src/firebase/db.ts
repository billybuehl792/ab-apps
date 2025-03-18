import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
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

export { getCustomerList, getCustomer };
