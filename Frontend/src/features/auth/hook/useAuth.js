import { setError, setLoading, setUser } from "../state/auth.slice";
import { register, login, getMe } from "../service/auth.api";

import { useDispatch } from "react-redux"


export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({ email, contact, fullname, password, isSeller = false }) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = await register({ email, contact, password, fullname, isSeller });
      dispatch(setUser(data.user));
      return data.user;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = await login({ email, password });
      dispatch(setUser(data.user));
      return data.user;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true))
      const data = await getMe();
      dispatch(setUser(data.user))
      dispatch(setLoading(false))
    }
    catch(err) {
      console.log(err)
    }
    finally {
      dispatch(setLoading(false))
    }
  }

  return { handleRegister, handleLogin, handleGetMe }
}