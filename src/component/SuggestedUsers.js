import { useDataContext } from "../context/dataContext";
import { useState } from "react";

export function SuggestedUser({data}){
    const [toggle,setToggle] = useState(false);
    const {theme} = useDataContext();
    return (
    <div style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
        <img src={data.userImage} className="user-image-2" alt=""></img>
        <div style={{marginLeft: "0.5rem", width: "60%"}}>
            <p>{data.firstName} {data.lastName}</p>
            <p>@{data.username}</p>
        </div>
        <button onClick={()=>setToggle(!toggle)} style={{border:`2px solid ${theme.textColor}`, color: theme.textColor, backgroundColor: theme.themeColor2}} className="follow-btn">{toggle ? "Unfollow" : "Follow"}</button>
    </div>)
}