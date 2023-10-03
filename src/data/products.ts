import {
  CollectionReference,
  Timestamp,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useCallback } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

type TProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  tags?: string[];
  inventory: {
    total: number;
    sold?: number;
    left?: number;
  };
  storeId: string;
  addedBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

function useProductsCollection() {
  const store = useFirestore();
  return collection(store, "Products") as CollectionReference<TProduct>;
}

// function useProductDocument(storeId: string) {
//   const storeCollection = useProductsCollection();
//   return doc(storeCollection, storeId);
// }

export function useProducts(storeId: string) {
  const productsCollection = useProductsCollection();
  const productQuery = query(
    productsCollection,
    where("storeId", "==", storeId),
    orderBy("updatedAt", "asc")
  );
  const { data: products } = useFirestoreCollectionData(productQuery, {
    idField: "id",
  });
  return {
    products,
  };
}

type AddStoreDataPayload = {
  name: string;
  description: string;
  price: number;
  tags?: string[];
  availableStock: number;
};
export function useAddProduct(storeId: string) {
  const { data: user } = useUser();
  const productCollection = useProductsCollection();
  return useCallback(
    async (data: AddStoreDataPayload) => {
      const productRef = doc(productCollection);
      console.log("data: ", data.tags);
      await setDoc(productRef, {
        id: productRef.id,
        name: data.name,
        description: data.description,
        price: data.price,
        tags: data.tags?.length ? data.tags : [],
        inventory: {
          total: data.availableStock,
          sold: 0,
          left: data.availableStock,
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        addedBy: user?.uid || "missing",
        storeId: storeId,
      });
      return productRef.id;
    },
    [productCollection, storeId, user?.uid]
  );
}
