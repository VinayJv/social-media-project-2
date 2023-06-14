import { useDataContext } from "../context/dataContext";
import { getUserAll } from "../services/userServices";
import { useState } from "react";

export function PostCard({props: {_id, content, media, likes: {likeCount, likedBy, dislikedBy}, comments, username}}){
    const { theme } = useDataContext();
    const [postedBy,setPostedBy] = useState({});

    const postedByUser = async() => {
        const response = await getUserAll();
        const allUsers = await response.json();
        const postedByUser = allUsers.users.find((user)=>user.username === username);
        setPostedBy(postedByUser);
    }
    postedByUser();

    return(<div className="post-container" style={{backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow}}>
            <img src={postedBy.userImage} alt="user" className="user-image"></img>
            <div className="post-inner-container">
                <p style={{fontSize:"1.3rem"}}>{postedBy.firstName} {postedBy.lastName}</p>
                <p style={{color:"gray"}}>@{username}</p>
                <p style={{fontSize:"1.1rem",marginTop:"1rem"}}>{content}</p>
                <img src={media} className="post-images"></img>
            </div>
    </div>);
}