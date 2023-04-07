import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import { AuthProvider } from "./context/AuthContext";
import AuthContextProvider from "./auth/AuthContextProvider";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
