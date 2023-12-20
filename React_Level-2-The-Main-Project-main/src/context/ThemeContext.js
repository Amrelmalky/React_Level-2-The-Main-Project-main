import { createContext, useReducer } from "react";
const DataContext = createContext();

const initialData = {
  //! if localStorage Empty = null in the first time user visite website
  /*
   ! in case we make refresh for page will reloading with stored theme color
  */
  theme:
    localStorage.getItem("themeColor") === null
      ? "Light"
      : localStorage.getItem("themeColor") === "Light"
      ? "Light"
      : "Dark",
};

const reducer = (firstState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...firstState, theme: action.newValue };
    default:
      return firstState;
  }
};

export function DataProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);

  const toggleThemeMode = (themeMode) => {
    dispatch({
      type: "CHANGE_THEME",
      newValue: themeMode,
    });
    localStorage.setItem("themeColor", themeMode);
  };

  return (
    <DataContext.Provider value={{ ...firstState, toggleThemeMode }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
