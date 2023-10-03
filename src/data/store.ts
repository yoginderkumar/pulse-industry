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
import { useCallback, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
  useUser,
} from "reactfire";
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
  owner: TeamMember;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  admins?: string[];
  managers?: string[];
  sharedWith: Array<string>;
};

export type TeamRoles = "admin" | "manager" | "owner";

function useStoreCollection() {
  const store = useFirestore();
  return collection(store, "Stores") as CollectionReference<TStore>;
}

function useStoreDocument(storeId: string) {
  const storeCollection = useStoreCollection();
  return doc(storeCollection, storeId);
}

export type TeamMember = {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
};

export function useInvolvedTeamCollection(storeId: string) {
  const storeDoc = useStoreDocument(storeId);
  return collection(
    storeDoc,
    "InvolvedTeam"
  ) as CollectionReference<TeamMember>;
}

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
    async (data: Omit<TStore, "uid" | "ownerId" | "createdAt" | "owner">) => {
      const storeRef = doc(storeCollection);
      await setDoc(storeRef, {
        ...data,
        uid: storeRef.id,
        name: data.name.trim(),
        createdAt: serverTimestamp(),
        ownerId: user?.uid,
        sharedWith: [user?.uid],
        owner: {
          id: user?.uid,
          name: user?.displayName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
        },
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
    where("sharedWith", "array-contains", user?.uid),
    orderBy("createdAt", "desc")
  );
  const { data: stores } = useFirestoreCollectionData(storeQuery, {
    idField: "uid",
  });
  return {
    stores,
  };
}

export function useEnsuredStore(bookId: string) {
  const storeDoc = useStoreDocument(bookId);
  const { data: storeData } = useFirestoreDocData(storeDoc, { idField: "uid" });
  // Create a ref of current data and pass it down.
  // This allows us to handle the book deletion
  const storeRef = useRef(storeData);
  let isDeleted = false;
  if (storeData && storeData.name) {
    // always keep the data in sync
    storeRef.current = storeData;
  } else {
    isDeleted = true;
  }
  if (!storeRef.current) {
    throw new Error("Store not found");
  }
  return { store: storeRef.current, isDeleted };
}

export function useStore(storeId: string) {
  const { store } = useEnsuredStore(storeId);
  const { data: user } = useUser();
  const involvedTeamCollection = useInvolvedTeamCollection(storeId);
  const { data: involvedTeamData } = useFirestoreCollectionData(
    query(involvedTeamCollection, orderBy("name", "asc")),
    { idField: "id" }
  );

  const involvedTeamWithRoles:
    | {
        owner: TeamMember;
        admins: Array<TeamMember>;
        managers: Array<TeamMember>;
      }
    | undefined = useMemo(() => {
    const admins: Array<TeamMember> | undefined = [],
      managers: Array<TeamMember> | undefined = [];
    involvedTeamData.forEach((member) => {
      if (store.admins?.includes(member.id)) {
        admins?.push(member);
      }
      if (store.managers?.includes(member.id)) {
        managers?.push(member);
      }
    });
    return {
      owner: store.owner as TeamMember,
      admins: admins,
      managers: managers,
    };
  }, [involvedTeamData, store.admins, store.managers, store.owner]);

  const involvedTeam: Array<TeamMember> = useMemo(() => {
    if (!user) return [];
    if (!involvedTeamData.length)
      return [
        {
          id: user?.uid,
          name: user?.displayName || "You",
          email: user?.email || "",
          phoneNumber: user?.phoneNumber || "",
        },
      ];
    return involvedTeamData;
  }, [involvedTeamData, user]);

  return {
    store,
    involvedTeam,
    involvedTeamWithRoles,
  };
}

enum STORE_PERMISSIONS {
  ADD_MEMBER = "ADD_MEMBER",
  ADD_PRODUCT = "ADD_PRODUCT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  REMOVER_MEMBER = "REMOVER_MEMBER",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_STORE = "DELETE_STORE",
  UPDATE_STORE = "UPDATE_STORE",
}

type RoleWithPermissions = {
  [key in TeamRoles]: {
    id: TeamRoles;
    title: string;
    permissions: Array<string>;
    permissionsDescription: Array<string>;
    restrictionsDescription: Array<string>;
  };
};

export const ROLES_AND_PERMISSIONS: RoleWithPermissions = {
  admin: {
    id: "admin" as const,
    title: "Admin",
    permissions: [
      STORE_PERMISSIONS.ADD_PRODUCT,
      STORE_PERMISSIONS.ADD_MEMBER,
      STORE_PERMISSIONS.REMOVE_PRODUCT,
    ],
    permissionsDescription: [
      "Can add more team members (managers only)",
      "Can add more products to the store ",
      "Can update the products in the store",
    ],
    restrictionsDescription: [
      "Can’t remove owners or other members from the store",
      `Can’t delete store`,
    ],
  },
  owner: {
    id: "owner" as const,
    title: "Owner",
    permissions: [
      STORE_PERMISSIONS.ADD_PRODUCT,
      STORE_PERMISSIONS.ADD_MEMBER,
      STORE_PERMISSIONS.REMOVE_PRODUCT,
    ],
    permissionsDescription: [
      "Can update role of a member",
      "Can add more team members as they like",
      "Can add/update products",
      "Can delete store",
    ],
    restrictionsDescription: [],
  },
  manager: {
    id: "manager" as const,
    title: "Manager",
    permissions: [STORE_PERMISSIONS.UPDATE_PRODUCT],
    permissionsDescription: ["Can update the products in the store"],
    restrictionsDescription: [
      "Can't add more products",
      "Can’t add/remove other members from the store",
      `Can’t delete store`,
    ],
  },
};

export function useAddTeamMember(storeId: string) {
  const { store } = useStore(storeId);
  const storeDocRef = useStoreDocument(storeId);
  const teamCollection = useInvolvedTeamCollection(storeId);
  return useCallback(
    async (data: TeamMember, role: TeamRoles) => {
      const memberDocRef = doc(teamCollection);
      await setDoc(memberDocRef, {
        ...data,
      } as never);
      const payload = {
        admins:
          role === "admin"
            ? store.admins?.length
              ? [...store.admins, memberDocRef.id]
              : [memberDocRef.id]
            : [],
        managers:
          role === "manager"
            ? store.admins?.length
              ? [...store.admins, memberDocRef.id]
              : [memberDocRef.id]
            : [],
        sharedWith: [...store.sharedWith, data.id],
      };
      await updateDoc(storeDocRef, {
        updatedAt: serverTimestamp(),
        ...payload,
      });
    },
    [teamCollection, storeDocRef, store]
  );
}
