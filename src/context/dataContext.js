import { createContext, useContext, useState, useReducer, useEffect } from "react";
import { getUserAll } from "../services/userServices";

const DataContext = createContext(null);

export function ContextWrapper({children}){
    const [theme,setTheme] = useState({themeColor: "#15191d", textColor: "rgba(199, 237, 230, 1)",themeColor2:"#2c3e50", boxShadow: "-2px 4px 10px black"});
    const [postData,setPostData] = useState([]);

    const getUsersAll = async (name) => {
        const response = await getUserAll();
        const data = await response.json();
        dispatch({ type: "ALL_USERS", payload: data.users });
    }

    useEffect(()=>{
        getUsersAll();
    },[])

    const reducerFunction = (state, {type, payload}) => {
        switch(type){
            case "FOUND_USER_DETAILS":
                localStorage.setItem("encodedToken", payload.encodedToken);
                return {...state, isLoggedIn: true, foundUser: payload.foundUser};
            case "SIGNUP_HANDLER":
                localStorage.setItem("encodedToken", payload.encodedToken);
                return {...state, isLoggedIn: true, foundUser: payload.createdUser};
            case "ALL_USERS":
                return {...state, allUsers: payload};
            default:
                return{...state};
        }
    }

    // Reducer Hook
    const [state, dispatch] = useReducer(reducerFunction, {
        isLoggedIn: false,
        newPost: {}
    });

    return(
        <DataContext.Provider value={{ state, dispatch, theme, setTheme, postData, setPostData}}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);