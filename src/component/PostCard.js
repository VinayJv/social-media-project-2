import { useDataContext } from "../context/dataContext";
import { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { PostComments } from "./PostComments";

export function PostCard({ props: { _id, content, media, likes: { likeCount, likedBy, dislikedBy }, comments, username }}) {
    const { theme, state } = useDataContext();
    const [postedBy, setPostedBy] = useState({});
    const [likedData, setLikedData] = useState({ isLiked: false, likeCount: likeCount });
    const [dislikeData, setDislikeData] = useState({ isDisliked: false, dislikeCount: dislikedBy.length });
    const [showForm, setShowForm] = useState(false);
    const [commentsData,setCommentsData] = useState(comments);


    const addComment = (event) => {
        event.preventDefault();
        const userComment = {commentBy: state.foundUser.username, comment: event.target.elements[0].value};
        setCommentsData([...commentsData, userComment]);
        event.target.reset();
        setShowForm(false);
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
                {likedData.isLiked ? <AiFillHeart size={30} color="red" className="reaction-icons" onClick={() => setLikedData({ isLiked: false, likeCount: likedData.likeCount - 1 })} /> : <AiOutlineHeart size={30} className="reaction-icons" color={theme.textColor} onClick={() => setLikedData({ isLiked: true, likeCount: likedData.likeCount + 1 })} />}
                <span>{likedData.likeCount}</span>

                {dislikeData.isDisliked ? <AiFillDislike size={30} color="skyblue" className="reaction-icons" onClick={() => setDislikeData({ isDisliked: false, dislikeCount: dislikeData.dislikeCount - 1 })} /> : <AiOutlineDislike size={30} className="reaction-icons" color={theme.textColor} onClick={() => setDislikeData({ isDisliked: true, dislikeCount: dislikeData.dislikeCount + 1 })} />}
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