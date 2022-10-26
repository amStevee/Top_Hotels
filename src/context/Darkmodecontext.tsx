import React from "react";
import { useState } from "react";
import { createContext, Dispatch, ReactNode, SetStateAction } from "react";

interface AppContextInterface {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const INITIAL_STATE: AppContextInterface = {
  darkMode: false,
  setDarkMode: () => false,
};

// const INITIAL_STATE = false;

export const DarkthemeContex =
  createContext<AppContextInterface>(INITIAL_STATE);

const DarkModeContexProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <DarkthemeContex.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkthemeContex.Provider>
  );
};

export default DarkModeContexProvider;
