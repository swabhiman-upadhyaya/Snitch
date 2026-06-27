import "./App.css"
import { useSelector } from 'react-redux';
import { useAuth } from './../features/auth/hook/useAuth';
import { useEffect } from "react";


const App = () => {

  const {handleGetMe} = useAuth();

  const user = useSelector(state => state.auth.user)

  console.log(user)

  useEffect(() => {
    handleGetMe()
  }, [])

  return (
    <div>
    </div>
  )
}

export default App