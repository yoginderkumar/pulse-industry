import { collection, doc, getFirestore } from "firebase/firestore";
import { Navigate, Outlet } from "react-router-dom";
import { useFirebaseApp, useSigninCheck } from "reactfire";
import { SpinnerIcon } from "../components";

export function ProtectedRoutes({
  redirectTo = "/",
  children,
}: {
  redirectTo?: string;
  children?: React.ReactNode;
}) {
  const firebaseApp = useFirebaseApp();
  const { status, data: signInCheckResult } = useSigninCheck();
  const firestore = getFirestore(firebaseApp);

  const userDocRef = signInCheckResult.signedIn
    ? doc(collection(firestore, "Users"), signInCheckResult.user?.uid)
    : null;

  if (status === "loading") {
    return (
      <span>
        <SpinnerIcon /> Loading...
      </span>
    );
  }

  if (signInCheckResult.signedIn === true && userDocRef) {
    return <>{children || <Outlet />}</>;
  }

  return <Navigate to={redirectTo} replace />;
}

export function GuestRoutes({
  redirectTo = "/dashboard",
  children,
}: {
  redirectTo?: string;
  children: React.ReactNode;
}) {
  const { status, data: signInCheckResult } = useSigninCheck();
  if (status === "loading") {
    return (
      <span>
        <SpinnerIcon /> Auth Check...
      </span>
    );
  }
  if (signInCheckResult.signedIn === true) {
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
}

export function RedirectToDashboardHome() {
  return <Navigate to="/dashboard/home" />;
}
