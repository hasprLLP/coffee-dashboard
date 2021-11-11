import { useState, useEffect, createContext, useContext } from "react"; // Global Imports

// Important Imports
const AppContext = createContext();

// Context to pass props globally without need of component-level props
export function Global({ children }) {
  const [auth, setAuth] = useState(false);

  // Exporting Theme State and State Setter
  let globalData = {
    auth,
    setAuth,
  };
  // Return Function
  return <AppContext.Provider value={globalData}>{children}</AppContext.Provider>;
}
// Exporting Theme Data for use as a Global State
export function useGlobal() {
  return useContext(AppContext);
}
