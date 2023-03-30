import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./components/pages/Main/Main";
import Login from "./components/pages/Login/Login";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
