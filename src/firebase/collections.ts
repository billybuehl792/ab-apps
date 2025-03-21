import { collection } from "firebase/firestore";
import { db } from ".";
import type { CustomerData } from "@/types/global";

const customerCollection = collection(
  db,
  "customers"
).withConverter<CustomerData>({
  toFirestore: (customer: CustomerData) => customer,
  fromFirestore: (snapshot, options): CustomerData =>
    snapshot.data(options) as CustomerData,
});

export { customerCollection };
