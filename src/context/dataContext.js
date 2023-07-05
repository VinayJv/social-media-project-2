import { createContext, useContext, useState, useReducer, useEffect } from "react";
import { getUserAll } from "../services/userServices";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPost } from "../services/postServices";
import {isMobile} from 'react-device-detect';

const DataContext = createContext(null);

export function ContextWrapper({children}){
    const [theme,setTheme] = useState({themeColor: "#15191d", textColor: "rgba(199, 237, 230, 1)",themeColor2:"#2c3e50", boxShadow: "-2px 4px 10px black"});
    const [postData,setPostData] = useState([]);
    const [bookmarksData,setBookmarksData] = useState([]);
    const [userData,setUserData] = useState([]);
    const [isToggled, setIsToggled] = useState(true); // Theme Toggle
    const [image,setImage] = useState({toggle: false, files:{} });
    const [showNav,setShowNav] = useState(false);

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

        const findIndex = () => userData.findIndex((user)=>user.username === state.foundUser.username);

        switch(type){
            case "FOUND_USER_DETAILS":
                localStorage.setItem("encodedToken", payload.encodedToken);
                return {...state, isLoggedIn: true, foundUser: payload.foundUser};
            case "SIGNUP_HANDLER":
                localStorage.setItem("encodedToken", payload.encodedToken);
                setUserData([...userData, payload.createdUser]);
                return {...state, isLoggedIn: true, foundUser: payload.createdUser};
            case "UPDATE_FOLLOWING_OF_USER":
                return {...state , foundUser: {...state.foundUser, following: [...state.foundUser.following, payload]}};
            case "REMOVE_FOLLOWING":
                const removeFollower = state.foundUser.following.filter((username)=> username !== payload);
                return {...state , foundUser: {...state.foundUser, following: removeFollower}};
            case "LOGOUT_USER":
                return{isLoggedIn: false};
            case "FILTER":
                return{...state, filter: payload};
            case "UPDATE_USER_PROFILE":
                const url = image.toggle ? window.URL.createObjectURL(image.files) : state.foundUser.userImage;
                setUserData([...userData], (userData[findIndex()].userImage = image.toggle ? window.URL.createObjectURL(image.files) : state.foundUser.userImage));
                return{...state, foundUser: {...state.foundUser, bio: payload[1].value, url: payload[2].value, userImage: url}};
            default:
                return{...state};
        }
    }

    // Reducer Hook
    const [state, dispatch] = useReducer(reducerFunction, {
        isLoggedIn: false,
        newPost: {},
        filter: ""
    });

    return(
        <DataContext.Provider value={{ state, dispatch, theme, setTheme, postData, setPostData, notify, isToggled, setIsToggled, bookmarksData,setBookmarksData, userData, setUserData, image, setImage, isMobile, showNav, setShowNav}}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);