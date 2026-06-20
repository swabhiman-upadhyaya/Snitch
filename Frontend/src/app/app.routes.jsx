import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Welcome to Snitch</h1>,
  },
  {
    path: "/home",
    element: <App />
  }
])