import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Register from "../features/auth/pages/Register.jsx"
import Login from "../features/auth/pages/Login.jsx"
import GoogleCallback from "../features/auth/pages/GoogleCallback.jsx"
import CreateProduct from "../features/product/pages/CreateProduct.jsx"

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/auth/google/callback",
    element: <GoogleCallback />
  },
  {
    path: "/seller/create-product",
    element: <CreateProduct />
  }
])