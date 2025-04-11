import { collection } from "firebase/firestore";

import { db } from "@/config/firebase";
import { FirebaseCollectionId } from "@/types/enums/firebase";
import type { ClientData } from "@/types/firebase";

export default collection(
  db,
  FirebaseCollectionId.CLIENTS
).withConverter<ClientData>({
  toFirestore: (client: ClientData) => ({
    first_name: client.first_name.trim(),
    last_name: client.last_name.trim(),
    email: client.email.trim(),
    phone: client.phone.trim(),
    address: client.address.trim(),
  }),
  fromFirestore: (snapshot, options): ClientData =>
    snapshot.data(options) as ClientData,
});
