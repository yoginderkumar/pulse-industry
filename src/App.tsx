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
import {
  GuestRoutes,
  ProtectedRoutes,
  RedirectToDashboardHome,
} from "./redirects";
import ProfilePage from "./pages/ProfilePage";
import { DataLoadingFallback, OverlayProvider } from "./components";
import AddNewStorePage from "./pages/AddNewStore";
import StorePage from "./pages/Store";
import AddNewProductPage from "./pages/AddNewProduct";
import StoreSettingsPage from "./pages/StoreSettings";
import AddNewMemberPage from "./pages/AddTeamMember";
import ProductPage from "./pages/Product";

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
        { path: "", element: <RedirectToDashboardHome /> },
        { path: "Home", element: <DashboardPage /> },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "stores",
          children: [
            {
              path: ":storeId",
              children: [
                { path: "", element: <StorePage /> },
                { path: "add-new-product", element: <AddNewProductPage /> },
                { path: "products/:productId", element: <ProductPage /> },
                {
                  path: "settings",
                  children: [
                    { path: "", element: <StoreSettingsPage /> },
                    { path: "add-team-member", element: <AddNewMemberPage /> },
                  ],
                },
              ],
            },
          ],
        },
        { path: "add-new-store", element: <AddNewStorePage /> },
      ],
    },
  ]);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <SuspenseWithPerf
          traceId={"auth-wait"}
          fallback={<DataLoadingFallback label="Authenticating..." />}
        >
          <OverlayProvider>
            <RouterProvider router={router} />
          </OverlayProvider>
        </SuspenseWithPerf>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;
