import React, { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Routes,
} from "react-router-dom";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import AddProduct from "./components/pages/AddProduct/AddProduct";
import Main from "./components/pages/Main/Main";
import AuthContext from "./context/AuthContext";
function App() {
  const authContext = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/auth",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/home",
      element: authContext.user ? <Main /> : "Nie jestes zalogowny",
    },
    {
      path: "/addproduct",
      element: <AddProduct />,
    },
    { path: "/", element: <Navigate to="/auth/login" /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
