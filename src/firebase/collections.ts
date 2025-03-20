import { collection } from "firebase/firestore";
import { db } from ".";
import type { Customer } from "@/types/global";

const customerCollection = collection(db, "customers").withConverter<Customer>({
  toFirestore: (customer: Customer) => customer,
  fromFirestore: (snapshot, options): Customer =>
    snapshot.data(options) as Customer,
});

export { customerCollection };
