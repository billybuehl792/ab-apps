import { collection } from "firebase/firestore";
import { db } from ".";
import type { ClientData } from "@/types/global";

const clientCollection = collection(db, "clients").withConverter<ClientData>({
  toFirestore: (client: ClientData) => client,
  fromFirestore: (snapshot, options): ClientData =>
    snapshot.data(options) as ClientData,
});

export { clientCollection };
