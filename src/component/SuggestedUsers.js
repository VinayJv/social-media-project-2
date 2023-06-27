import { useDataContext } from "../context/dataContext";
import { useState } from "react";

export function SuggestedUser({data}){
    const {theme, state:{foundUser: {following}}, dispatch } = useDataContext();

    const followUser = (event) => {
        if(event.target.value === "Follow"){
            dispatch({type:"UPDATE_FOLLOWING_OF_USER", payload:event.target.name});
        }
        else{
            dispatch({type:"REMOVE_FOLLOWING", payload: event.target.name});
        }
    };


    const alreadyFollowed = () => {
        if(following.findIndex((username)=>username === data.username) === -1){
            return false;
        }
        else {
            return true;
        }
    };

    return (
    <div style={{display: "flex", alignItems: "center", margin: ".5rem 1rem"}}>
        <img src={data.userImage} className="user-image-2" alt=""></img>
        <div style={{margin: "0rem 0.5rem"}}>
            <p>{data.firstName} {data.lastName}</p>
            <p>@{data.username}</p>
        </div>
        <button style={{border:`2px solid ${theme.textColor}`, color: theme.textColor, backgroundColor: theme.themeColor2}} className="follow-btn" value={alreadyFollowed() ? "Unfollow" : "Follow"} name={data.username} onClick={followUser}>{alreadyFollowed() ? "Unfollow" : "Follow"}</button>
    </div>)
}