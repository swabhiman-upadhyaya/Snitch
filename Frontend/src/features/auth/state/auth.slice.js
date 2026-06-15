import { createSlice } from "@redux/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { setError, setLoading, setUser } = authSlice.actions
export default authSlice.reducer