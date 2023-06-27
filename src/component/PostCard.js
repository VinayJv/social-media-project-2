import { useDataContext } from "../context/dataContext";
import { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { PostComments } from "./PostComments";

export function PostCard({ props: { _id, content, media, likes: { likeCount, likedBy, dislikedBy }, comments, username }}) {
    const { theme, state, postData, setPostData } = useDataContext();
    const [postedBy, setPostedBy] = useState({});
    const [likedByData, setLikedBy] = useState(likedBy);
    const [dislikedByData, setDislikedBy] = useState(dislikedBy);
    const [likedData, setLikedData] = useState({likeCount: likeCount});
    const [dislikeData, setDislikeData] = useState({dislikeCount: dislikedBy.length });
    const [showForm, setShowForm] = useState(false);
    const [commentsData,setCommentsData] = useState(comments);
    
    const findIndex = () => postData.findIndex((post)=>post._id === _id);

    const isLikedByUser = () => {
        const index = likedByData.findIndex((username)=>username === state.foundUser.username);
        if(index === -1){
            return false;
        }
        else{
            return true;
        }
    }

    const isDislikedByUser = () => {
        const index = dislikedByData.findIndex((username)=>username === state.foundUser.username);
        if(index === -1){
            return false;
        }
        else{
            return true;
        }
    }


    const addComment = (event) => {
        event.preventDefault();
        const userComment = {commentBy: state.foundUser.username, comment: event.target.elements[0].value};
        setCommentsData([...commentsData, userComment]);
        setPostData([...postData], (postData[findIndex()].comments.push(userComment)));
        event.target.reset();
        setShowForm(false);
    }

    const removeUserLike = () => {
        const filteredArray = likedByData.filter((username)=>!username===state.foundUser.username);
        setLikedBy(filteredArray);
        setPostData([...postData],(postData[findIndex()].likes.likeCount = postData[findIndex()].likes.likeCount - 1),(postData[findIndex()].likes.likedBy = filteredArray));
    }
    const removeUserDislike = () => {
        const filteredArray = dislikedByData.filter((username)=>!username===state.foundUser.username);
        setDislikedBy(filteredArray);
        setPostData([...postData],(postData[findIndex()].likes.dislikedBy = filteredArray));
    }

    const getUserData = (name) => {
        setPostedBy(() => state.allUsers.find((user) => user.username === name));
    }

    useEffect(() => {
        getUserData(username);
    }, []);


    return (<div className="post-container" style={{ backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow }}>
        <img src={postedBy?.userImage || state.foundUser.userImage} alt="" className="user-image"></img>
        <div className="post-inner-container">
            <p style={{ fontSize: "1.3rem" }}>{postedBy?.firstName || state.foundUser.name} {postedBy?.lastName || ""}</p>
            <p style={{ color: "gray" }}>@{username}</p>
            <p style={{ fontSize: "1.1rem", marginTop: "1rem" }}>{content}</p>
            <img src={media} className="post-images" alt=""></img>
            <div className="reaction-btn-container">
                {isLikedByUser() ? <AiFillHeart size={30} color="red" className="reaction-icons" onClick={() =>{
                    setLikedData({likeCount: likedData.likeCount - 1 });
                    removeUserLike();
                }} /> : <AiOutlineHeart size={30} className="reaction-icons" color={theme.textColor} onClick={() =>{
                    setLikedData({likeCount: likedData.likeCount + 1 });
                    setLikedBy([...likedBy, state.foundUser.username]);
                    setPostData([...postData], (postData[findIndex()].likes.likedBy.push(state.foundUser.username)), (postData[findIndex()].likes.likeCount = postData[findIndex()].likes.likeCount + 1));
                }} />}
                <span>{likedData.likeCount}</span>

                {isDislikedByUser() ? <AiFillDislike size={30} color="skyblue" className="reaction-icons" onClick={() =>{
                     setDislikeData({dislikeCount: dislikeData.dislikeCount - 1 });
                     removeUserDislike();
                }} /> : <AiOutlineDislike size={30} className="reaction-icons" color={theme.textColor} onClick={() =>{
                    setDislikeData({dislikeCount: dislikeData.dislikeCount + 1 });
                    setPostData([...postData], (postData[findIndex()].likes.dislikedBy.push(state.foundUser.username)));
                }} />}
                <span>{dislikeData.dislikeCount}</span>

                <AiOutlineMessage size={30} className="reaction-icons" color={theme.textColor} onClick={() => setShowForm(!showForm)} />
                <span style={{ alignSelf: "center"}}>{commentsData.length}</span>
                <div style={{ display: "flex", position: "relative"}}>
                    <div style={{ display: showForm ? "flex" : "none", backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow, border: `1px solid ${theme.textColor}` }} className="comment-form-container">
                        <form className="comment-form" onSubmit={addComment}>
                            <div className="comment-form-header">
                                <label>
                                    <input type="textarea" placeholder="Add Comment.." required className="comment-text-area"></input>
                                </label>
                                <button type="submit" className="comment-btn" style={{border:`2px solid ${theme.textColor}`, color: theme.textColor}}>POST</button>
                            </div>
                        </form>
                        <div>
                            {commentsData.length === 0 ? <div className="comment">
                                No Comments Yet
                            </div> :
                                <PostComments data={commentsData} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}