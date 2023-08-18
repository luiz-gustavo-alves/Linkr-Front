import { useState, createContext } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
   const localData = JSON.parse(localStorage.getItem('auth'))
   const [auth, setAuth] = useState({ ...localData })

   const persistenceLogin = (auth) => {
      setAuth(auth)
      localStorage.setItem('auth', JSON.stringify(auth))
   }

   const isLogged = () => {
      if (auth && Object.keys(auth).length > 0) {
         console.log('login')
      }
   }

   return (
      <AuthContext.Provider value={{ isLogged, persistenceLogin }}>{children}</AuthContext.Provider>
   )
}
