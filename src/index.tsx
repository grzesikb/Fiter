import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./auth/AuthContextProvider";
import SecurityProvider from "./security/SecurityProvider";
import GenerateToken from "./security/GenerateToken";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SecurityProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </SecurityProvider>
  </React.StrictMode>
);
