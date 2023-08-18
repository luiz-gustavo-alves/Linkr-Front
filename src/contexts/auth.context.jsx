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
      return localData && Object.keys(localData).length > 0 ? true : false
   }

   const logout = () => {
      
         localStorage.clear()
         navigate('/')
      
   }

   return (
      <AuthContext.Provider value={{ isLogged, persistenceLogin, logout }}>
         {children}
      </AuthContext.Provider>
   )
}
