import {
  CollectionReference,
  Timestamp,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
  useUser,
} from "reactfire";

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

function useProductDocument(productId: string) {
  const productCollection = useProductsCollection();
  return doc(productCollection, productId);
}

export function useProducts(storeId: string) {
  const [products, setProducts] = useState<TProduct[]>([]);
  const productsCollection = useProductsCollection();
  const productQuery = query(
    productsCollection,
    where("storeId", "==", storeId),
    orderBy("updatedAt", "asc")
  );
  const { data } = useFirestoreCollectionData(productQuery, {
    idField: "id",
  });

  useEffect(() => {
    if (data.length) {
      setProducts(data);
    }
  }, [data]);

  return {
    products,
  };
}

type StoreDataPayload = {
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
    async (data: StoreDataPayload) => {
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

export function useUpdateProduct(productId: string) {
  const { data: user } = useUser();
  const productDocRef = useProductDocument(productId);
  return useCallback(
    async (data: StoreDataPayload) => {
      await updateDoc(productDocRef, {
        name: data.name,
        description: data.description,
        price: data.price,
        tags: data.tags?.length ? data.tags : [],
        inventory: {
          total: data.availableStock,
          sold: 0,
          left: data.availableStock,
        },
        updatedAt: serverTimestamp(),
        addedBy: user?.uid || "missing",
      });
      return productDocRef.id;
    },
    [productDocRef, user?.uid]
  );
}

export function useEnsuredProduct(productId: string) {
  const storeDoc = useProductDocument(productId);
  const { data: productData } = useFirestoreDocData(storeDoc, {
    idField: "id",
  });
  // Create a ref of current data and pass it down.
  // This allows us to handle the book deletion
  const productRef = useRef(productData);
  let isDeleted = false;
  if (productData && productData.name) {
    // always keep the data in sync
    productRef.current = productData;
  } else {
    isDeleted = true;
  }
  if (!productRef.current) {
    throw new Error("Store not found");
  }
  return { product: productRef.current, isDeleted };
}
