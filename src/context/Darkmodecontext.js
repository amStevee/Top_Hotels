import { useState } from "react";
import { createContext } from "react";

const INITIAL_STATE = false;

export const DarkthemeContex = createContext(INITIAL_STATE);

const DarkModeContexProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(INITIAL_STATE);

  return (
    <DarkthemeContex.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkthemeContex.Provider>
  );
};

export default DarkModeContexProvider;
