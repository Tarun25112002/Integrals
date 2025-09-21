import { createContext } from "react"; 
export const AppContext = createContext(); // context object created
export const AppContextProvider = (props) => {
    const value = {
      
    }
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
