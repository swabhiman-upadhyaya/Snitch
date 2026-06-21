import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Register from "../features/auth/pages/Register.jsx"
import Login from "../features/auth/pages/Login.jsx"

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
  }
])