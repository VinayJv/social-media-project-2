import { createContext, useContext,useState,useReducer } from "react";

const DataContext = createContext(null);

export function ContextWrapper({children}){
    const [theme,setTheme] = useState({themeColor: "#15191d", textColor: "rgba(199, 237, 230, 1)"});

    const reducerFunction = (state, {type, payload}) => {}

    // Reducer Hook
    const [state, dispatch] = useReducer(reducerFunction, {
        isLoggedIn: false
    });

    return(
        <DataContext.Provider value={{ state, dispatch, theme, setTheme}}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);