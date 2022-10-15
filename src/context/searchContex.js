import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  date: [],
  options: { adult: undefined, children: undefined, room: undefined },
};

export const SearchContex = createContext(INITIAL_STATE);

const searchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

const SearchContexProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

  return (
    <SearchContex.Provider
      value={{
        city: state.city,
        date: state.date,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContex.Provider>
  );
};

export default SearchContexProvider;
