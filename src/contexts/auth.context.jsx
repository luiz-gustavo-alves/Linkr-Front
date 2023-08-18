import { useState, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
   const localData = JSON.parse(localStorage.getItem('auth'))
   const [auth, setAuth] = useState({ ...localData })
   const navigate = useNavigate()

   const persistenceLogin = (auth) => {
      setAuth(auth)
      localStorage.setItem('auth', JSON.stringify(auth))
   }

   const isLogged = () => {
      return auth && Object.keys(auth).length > 0 ? true : false
   }

   return (
      <AuthContext.Provider value={{ isLogged, persistenceLogin }}>{children}</AuthContext.Provider>
   )
}
