import { useContext } from "react";
import LimitContext from "../contexts/limitContext";

const useLimit = () => useContext(LimitContext);

export default useLimit;