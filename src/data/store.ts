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
import toast from "react-hot-toast";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { Omit } from "utility-types";

type TStore = {
  uid: string;
  name: string;
  about: string;
  address: {
    addressLine1: string;
    cityAndState: string;
    pinCode: string;
  };
  ownerId: string;
  createdAt: Timestamp;
  admins?: string[];
  managers?: string[];
};

function useStoreCollection() {
  const store = useFirestore();
  return collection(store, "Stores") as CollectionReference<TStore>;
}

// function useStoreDocument(storeId: string) {
//   const storeCollection = useStoreCollection();
//   return doc(storeCollection, storeId);
// }

type LocationApiResponse = {
  address_line1: string;
  state: string;
  road: string;
  postcode: string;
};

export function useReverseGeoLocation() {
  return useCallback(
    (lat: number, long: number): Promise<LocationApiResponse> => {
      return fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=e6e9fe6e761743b89a112bd6531e99e5`
      )
        .then((response) => response.json())
        .then((result) => {
          return result.features[0].properties;
        })
        .catch(() => {
          toast.error(
            "This feature is not working properly right now. Please try again later!"
          );
        });
    },
    []
  );
}

export function useAddStore() {
  const { data: user } = useUser();
  const storeCollection = useStoreCollection();
  return useCallback(
    async (data: Omit<TStore, "uid" | "ownerId" | "createdAt">) => {
      const storeRef = doc(storeCollection);
      await setDoc(storeRef, {
        ...data,
        uid: storeRef.id,
        name: data.name.trim(),
        createdAt: serverTimestamp(),
        ownerId: user ? user.uid : null,
      } as never);
      return storeRef.id;
    },
    [storeCollection, user]
  );
}

export function useStores() {
  const storeCollection = useStoreCollection();
  const { data: user } = useUser();
  const storeQuery = query(
    storeCollection,
    where("ownerId", "==", user?.uid),
    orderBy("createdAt", "desc")
  );
  const { data: stores } = useFirestoreCollectionData(storeQuery, {
    idField: "uid",
  });
  return {
    stores,
  };
}
