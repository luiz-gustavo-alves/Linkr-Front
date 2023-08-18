import { useState, createContext } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const localData = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useState({...localData});

/*   const login = (auth) => {
    setAuth({...auth});
    sessionStorage.setItem("auth", JSON.stringify(auth));
  } */

  const logout = () => {

    authService.logout(auth.token)
      .then(() => {
        setAuth({});
        sessionStorage.removeItem("auth");
      })
      .catch(error => alert(error));
  }

 
  return (
    <AuthContext.Provider value={{  }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;