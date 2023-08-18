import { useState, createContext } from 'react'
import { RotatingLines } from 'react-loader-spinner'

export const FormsContext = createContext()

export function FormsProvider({ children }) {
   const [states, setStates] = useState({
      loadingVisibility: false,
      disabledInput: false,
      loadingColor: 'white'
   })

   const loading = (
      <RotatingLines
         strokeColor={states.loadingColor}
         strokeWidth="5"
         animationDuration="0.75"
         width="22"
         visible={states.loadingVisibility}
      />
   )

   return (
    <FormsContext.Provider value={{ states, setStates, loading }}>
       {children}
    </FormsContext.Provider>
 )
}
