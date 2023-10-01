import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FirebaseAppProvider } from "reactfire";
import config from "./config.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={config.firebaseConfig} suspense>
      <App />
      <Toaster
        position="bottom-center"
        reverseOrder
        toastOptions={{
          style: {
            background: "#2c324b",
            color: "#fff",
          },
          success: {
            duration: 5000,
          },
        }}
      />
    </FirebaseAppProvider>
  </React.StrictMode>
);
