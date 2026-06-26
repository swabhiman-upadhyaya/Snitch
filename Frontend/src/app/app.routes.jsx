import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Register from "../features/auth/pages/Register.jsx"
import Login from "../features/auth/pages/Login.jsx"
import GoogleCallback from "../features/auth/components/GoogleCallback.jsx"
import CreateProduct from "../features/product/pages/CreateProduct.jsx"
import Dashboard from "../features/product/pages/Dashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
        path: "/seller",
        children: [
          {
            path: "/seller/create-product",
            element: 
            <Protected>
              <CreateProduct />
            </Protected>
          },
          {
            path: "/seller/dashboard",
            element: <Dashboard />
          }
        ]
      }
    ]
  }
])