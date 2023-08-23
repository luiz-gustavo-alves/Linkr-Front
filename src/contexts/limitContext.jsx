import { createContext, useState } from "react";

const LimitContext = createContext();

export function LimitProvider({ children }) {

  const [limit, setLimit] = useState(10);

  const resetLimit = () => {
    setLimit(10);
  }

  const updateLimit = (newLimit) => {
    setLimit(newLimit);
  }

  return (
    <LimitContext.Provider value={{ limit, resetLimit, updateLimit }}>
      {children}
    </LimitContext.Provider>
  );
}

export default LimitContext;