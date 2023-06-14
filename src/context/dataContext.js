import { createContext, useContext, useState, useReducer } from "react";


const DataContext = createContext(null);

export function ContextWrapper({children}){
    const [theme,setTheme] = useState({themeColor: "#15191d", textColor: "rgba(199, 237, 230, 1)",themeColor2:"#2c3e50", boxShadow: "-2px 4px 10px black"});
    

    const reducerFunction = (state, {type, payload}) => {
        switch(type){
            case "FOUND_USER_DETAILS":
                localStorage.setItem("encodedToken", payload.encodedToken);
                return {...state, isLoggedIn: true, foundUser: payload.foundUser};
            case "SIGNUP_HANDLER":
                localStorage.setItem("encodedToken", payload.encodedToken);
                return {...state, isLoggedIn: true, foundUser: payload.createdUser};
            default:
                return{...state};
        }
    }

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