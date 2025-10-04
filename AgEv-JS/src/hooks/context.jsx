import  { createContext, useContext } from "react";
import useData from "./useData";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const data = useData();
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
