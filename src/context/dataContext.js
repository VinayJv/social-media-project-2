import { createContext, useContext, useState, useReducer, useEffect } from "react";
import { getUserAll } from "../services/userServices";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPost } from "../services/postServices";

const DataContext = createContext(null);

export function ContextWrapper({children}){
    const [theme,setTheme] = useState({themeColor: "#15191d", textColor: "rgba(199, 237, 230, 1)",themeColor2:"#2c3e50", boxShadow: "-2px 4px 10px black"});
    const [postData,setPostData] = useState([]);
    const [bookmarksData,setBookmarksData] = useState([]);
    const [userData,setUserData] = useState([]);
    const [isToggled, setIsToggled] = useState(true); // Theme Toggle

    const notify = (message) => {
        toast(message,{
            position: "bottom-right",
            className: "toast-message"
        });
    };
    
    const getPostData = async() => {
        const response = await getPost();
        const data = await response.json();
        setPostData(data.posts); 
    }

    const getUsersAll = async (name) => {
        const response = await getUserAll();
        const data = await response.json();
        setUserData(data.users);
    }

    useEffect(()=>{
        getPostData();
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
            case "UPDATE_FOLLOWING_OF_USER":
                return {...state , foundUser: {...state.foundUser, following: [...state.foundUser.following, payload]}};
                case "REMOVE_FOLLOWING":
                    const removeFollower = state.foundUser.following.filter((username)=> username !== payload);
                    return {...state , foundUser: {...state.foundUser, following: removeFollower}};
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
        <DataContext.Provider value={{ state, dispatch, theme, setTheme, postData, setPostData, notify, isToggled, setIsToggled, bookmarksData,setBookmarksData, userData, setUserData}}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);