import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import AddProduct from "./components/pages/AddProduct/AddProduct";
import Main from "./components/pages/Main/Main";

const router = createBrowserRouter([
  {
    path: "/auth",
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/home",
    element: <Main />,
  },
  {
    path: "/addproduct",
    element: <AddProduct />,
  },
  { path: "/", element: <Navigate to="/auth/login" /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
