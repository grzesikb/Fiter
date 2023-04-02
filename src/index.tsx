import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./components/pages/Main/Main";
import Login from "./components/pages/Login/Login";
import AddProduct from "./components/pages/AddProduct/AddProduct";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AddProduct />
  </React.StrictMode>
);
