import React, { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Register from "./components/pages/Register/Register";
import AddProduct from "./components/pages/AddProduct/AddProduct";
import Main from "./components/pages/Main/Main";
//import AuthContext from "./context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "./auth/auth.context";
import Login from "./components/pages/Login/Login";

function App() {
  const { state } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/auth",
      children: [
        {
          path: "login",
          element: state.user ? <Navigate to="/home" /> : <Login />,
        },
        {
          path: "register",
          element: state.user ? <Navigate to="/home" /> : <Register />,
        },
      ],
    },
    {
      path: "/home",
      element: state.user ? <Main /> : <Navigate to="/auth/login" />,
    },
    {
      path: "/addproduct",
      element: (
        <AnimatePresence>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{
              x: "100%",
              transition: {
                duration: 10,
                ease: "cubic-bezier(0.67, 0, 0.4, 1.2)",
              },
            }}
          >
            <AddProduct />
          </motion.div>
        </AnimatePresence>
      ),
    },
    { path: "/", element: <Navigate to="/auth/login" /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
