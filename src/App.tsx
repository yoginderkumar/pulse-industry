import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GetStartedPage from "./pages/GetStarted";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import {
  AuthProvider,
  FirestoreProvider,
  SuspenseWithPerf,
  useFirebaseApp,
} from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import DashboardPage, { DashboardLayout } from "./pages/Dashboard";
import { GuestRoutes, ProtectedRoutes } from "./redirects";
import ProfilePage from "./pages/ProfilePage";
import { Inline, SpinnerIcon } from "./components";

function App() {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <GuestRoutes>
          <GetStartedPage />
        </GuestRoutes>
      ),
    },
    {
      path: "/login",
      element: (
        <GuestRoutes>
          <LoginPage />
        </GuestRoutes>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <GuestRoutes>
          <SignUpPage />
        </GuestRoutes>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoutes>
          <DashboardLayout />
        </ProtectedRoutes>
      ),
      children: [
        { path: "", element: <DashboardPage /> },
        {
          path: "profile",
          element: <ProfilePage />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <SuspenseWithPerf
          traceId={"auth-wait"}
          fallback={
            <Inline
              minHeight="screen"
              alignItems="center"
              justifyContent="center"
              gap="3"
              fontSize="sm"
            >
              <SpinnerIcon /> Loading...
            </Inline>
          }
        >
          <RouterProvider router={router} />
        </SuspenseWithPerf>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;
