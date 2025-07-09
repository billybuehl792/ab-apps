import { queryOptions } from "@tanstack/react-query";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/store/config/firebase";
import { companyConverter } from "@/store/converters";
import { FirebaseCollection } from "@/store/enums/firebase";

const useCompanies = () => {
  /** Values */

  const col = collection(db, FirebaseCollection.COMPANIES).withConverter(
    companyConverter
  );

  /** Queries */

  const detail = (id: string) =>
    queryOptions({
      queryKey: [col.id, "detail", id] as const,
      queryFn: async () => {
        const docRef = doc(col, id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) throw new Error("Company does not exist");

        return docSnap;
      },
    });

  return {
    collection: col,
    queries: { detail },
  };
};

export default useCompanies;
