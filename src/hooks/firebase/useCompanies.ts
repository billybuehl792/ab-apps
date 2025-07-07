import { queryOptions } from "@tanstack/react-query";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Company } from "@/types/auth";

const useCompanies = () => {
  /** Values */

  const col = collection(db, "companies").withConverter<Omit<Company, "id">>({
    toFirestore: (data: Omit<Company, "id">) => ({
      label: data.label.trim(),
      description: data.description || "",
      thumbnail: data.thumbnail || "",
    }),
    fromFirestore: (snapshot, options): Omit<Company, "id"> =>
      snapshot.data(options) as Omit<Company, "id">,
  });

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
