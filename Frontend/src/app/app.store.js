import { configureStrore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/state/auth.slice.js"

export const store = configureStrore({
  reducer: {
    auth: authReducer,
  }
})