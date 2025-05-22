import { collection } from "firebase/firestore";

import { db } from "@/config/firebase";
import { FirebaseCollectionId } from "@/types/enums/firebase";
import type { ClientData } from "@/types/firebase";

export default collection(
  db,
  FirebaseCollectionId.CLIENTS
).withConverter<ClientData>({
  toFirestore: (client: ClientData) => ({
    first_name: String(client.first_name).trim(),
    last_name: String(client.last_name).trim(),
    email: String(client.email).trim(),
    phone: String(client.phone).toPhone(),
    address: client.address,
    archived: Boolean(client.archived),
  }),
  fromFirestore: (snapshot, options): ClientData =>
    snapshot.data(options) as ClientData,
});
