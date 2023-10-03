import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  collection,
  getFirestore,
  setDoc,
  CollectionReference,
  query,
  where,
  limit,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useCallback } from "react";
import {
  useAuth,
  useFirebaseApp,
  useFirestore,
  useFirestoreDocData,
  useUser,
} from "reactfire";

export type TUser = {
  displayName?: string;
  email?: string | null;
  emailVerified?: boolean;
  isAnonymous: boolean;
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerId: "firebase";
  uid: string;
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
};

function useUserCollection() {
  const store = useFirestore();
  return collection(store, "Users") as CollectionReference<TUser>;
}

function useUserDocument(userId: string) {
  const usersCollection = useUserCollection();
  return doc(usersCollection, userId);
}

export function useRegister() {
  const auth = useAuth();
  const create = useCreateProfile();
  return useCallback(
    async ({
      email,
      password,
      fullName,
    }: {
      email: string;
      password: string;
      fullName: string;
    }) => {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (fullName) {
          create({ ...user, displayName: fullName });
          updateProfile(user, {
            displayName: fullName,
          });
        }
      } catch (e) {
        const error = e as Error;
        throw error;
      }
    },
    [auth, create]
  );
}

export function useLogin() {
  const auth = useAuth();
  return useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        const error = e as Error;
        throw error;
      }
    },
    [auth]
  );
}

export function useCreateProfile() {
  const firebaseApp = useFirebaseApp();
  return async function create(authUser: User) {
    const firestore = getFirestore(firebaseApp);
    const userDoc = doc(collection(firestore, "Users"), authUser.uid);
    await setDoc(userDoc, {
      email: authUser.email,
      displayName: authUser.displayName,
      emailVerified: authUser.emailVerified,
      isAnonymous: authUser.isAnonymous,
      metadata: {
        creationTime: authUser.metadata.creationTime,
        lastSignInTime: authUser.metadata.lastSignInTime,
      },
      phoneNumber: authUser.phoneNumber,
      photoURL: authUser.photoURL,
      providerId: "firebase",
      uid: authUser.uid,
    });
  };
}

declare global {
  interface Window {
    _reactFirePreloadedObservables: Map<unknown, unknown>;
  }
}

const clearReactfireCache = () => {
  const map = window._reactFirePreloadedObservables;
  Array.from(map.keys()).forEach((key) => {
    if (typeof key === "string" && key.includes("firestore")) {
      map.delete(key);
    }
  });
};

export function useLogout() {
  const auth = useAuth();
  return async function logout() {
    await auth.signOut();
    clearReactfireCache();
  };
}

export function useProfile() {
  const { data: authUser } = useUser();
  const userDoc = useUserDocument(authUser?.uid || "missing");
  const { data: user } = useFirestoreDocData<TUser>(userDoc, {
    idField: "uid",
  });
  return {
    user,
  };
}

export function useCheckUserExistence() {
  const userCollection = useUserCollection();
  return useCallback(
    async (email: string) => {
      const usersQuery = query(
        userCollection,
        where("email", "==", email),
        limit(1)
      );
      const usersSnapShot = await getDocs(usersQuery);
      const doesExist = Boolean(!usersSnapShot.empty);
      let userId = "";
      if (doesExist) {
        usersSnapShot.forEach((docRef) => {
          userId = docRef.id;
        });
      }
      return { doesExist: doesExist, userId: userId };
    },
    [userCollection]
  );
}

export function useUserData() {
  const userCollection = useUserCollection();
  return useCallback(
    async (userId: string) => {
      const userDocRef = doc(userCollection, userId);
      const user = (await getDoc(userDocRef)).data();
      return {
        user,
      };
    },
    [userCollection]
  );
}
