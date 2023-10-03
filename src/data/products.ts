import {
  CollectionReference,
  Timestamp,
  collection,
  doc,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
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

const pageSize = 4;

export function useProducts(storeId: string) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<TProduct[]>([]);
  const productsCollection = useProductsCollection();
  const startAfterDoc = currentPage > 1 ? products[currentPage - 2] : null;
  const productQuery = query(
    productsCollection,
    where("storeId", "==", storeId),
    orderBy("updatedAt", "asc"),
    startAfter(startAfterDoc),
    limit(pageSize)
  );
  const { data } = useFirestoreCollectionData(productQuery, {
    idField: "id",
  });

  useEffect(() => {
    if (data.length) {
      setProducts(data);
    }
  }, [data]);

  function fetchMore() {
    setCurrentPage((prev) => prev + 1);
  }

  return {
    products,
    fetchMore,
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
