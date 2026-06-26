import "./App.css"
import { useSelector } from 'react-redux';
import { useAuth } from './../features/auth/hook/useAuth';
import { useEffect } from "react";
import { Outlet } from "react-router-dom";


const App = () => {

  const {handleGetMe} = useAuth();

  const user = useSelector(state => state.auth.user)

  console.log(user)

  useEffect(() => {
    handleGetMe()
  }, [])

  return (
    <div>
      <h2>App Layout Component</h2>
      <Outlet />
    </div>
  )
}

export default App