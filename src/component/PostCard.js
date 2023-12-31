import { useDataContext } from "../context/dataContext";
import { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { PostComments } from "./PostComments";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { BiImages } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { formatDate } from "../backend/utils/authUtils";
import { useNavigate } from "react-router";

export function PostCard({ props: { _id, content, media, likes: { likeCount, likedBy, dislikedBy }, comments, username, isBookmarked }, ShowComments}) {
    const { theme, state, postData, setPostData, userData, notify, setShowNav } = useDataContext();
    const [postedBy, setPostedBy] = useState({});
    const [likedByData, setLikedBy] = useState(likedBy);
    const [dislikedByData, setDislikedBy] = useState(dislikedBy);
    const [likedData, setLikedData] = useState({likeCount: likeCount});
    const [dislikeData, setDislikeData] = useState({dislikeCount: dislikedBy.length});
    const [showForm, setShowForm] = useState(false);
    const [commentsData,setCommentsData] = useState(comments);
    const [editToggle, setEditToggle] = useState(false);
    const [editForm,setEditForm] = useState(false);
    const [image,setImage] = useState({toggle: false, files:{} });

    const navigate = useNavigate();
    
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

    const deletePost = (event) => {
        setPostData(postData.filter((post)=>post._id !== event.target.id));
        event.stopPropagation();
        notify("Post Deleted");
    };

    const getUserData = (name) => {
        setPostedBy(() => userData.find((user) => user.username === name));
    }

    const postFormHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const userPost = {
            _id: uuid(),
            content:
              event.target.elements[0].value,
            media: image.toggle ? window.URL.createObjectURL(image.files) : "",
            likes: {
              likeCount: 0,
              likedBy: [],
              dislikedBy: [],
            },
            comments: [],
            username: state.foundUser.username,
            createdAt: formatDate(),
            updatedAt: formatDate(),
          }
          setPostData([...postData], (postData[findIndex()].content = userPost.content), (postData[findIndex()].media = userPost.media));
          event.target.reset();
          notify("Post Updated");
          setEditForm(false);
    };

    const imageChangeHandler = (event) => {
        setImage({toggle: true, files: event.target.files[0]});
    }; 

    const navigateToSinglePost = () => {
        navigate(`/post/${_id}`);
        setShowNav(false);
    }

    const navigateToUser = (event) => {
        event.stopPropagation();
        navigate(`/user/${username}`);
        setShowNav(false);
    }

    useEffect(() => {
        getUserData(username);
    }, []);


    return (<div className="post-container" style={{ backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow }} id={_id} onClick={navigateToSinglePost}>
        
        <img src={ postedBy?.userImage || state.foundUser.userImage} alt="" className="user-image" onClick={navigateToUser}></img>
        <div className="post-inner-container">
            <div style={{display: "flex",justifyContent: "space-between", alignItems: "center", gap: "0.3rem"}}>
                <p onClick={navigateToUser} style={{ fontSize: "1.3rem" }}>{postedBy?.firstName || state.foundUser.name} {postedBy?.lastName || ""}</p>
                {username === state.foundUser.username && <div style={{display: "flex", position: "relative", flexDirection: "column"}}>
                    <BsThreeDotsVertical onClick={(event)=>{setEditToggle(!editToggle); event.stopPropagation()}} size={20} className="reaction-icons"/>
                    <div style={{display: editToggle ? "flex" : "none", backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow, border: `1px solid ${theme.textColor}`}} className="edit-form-container">
                        <div className="post-options" onClick={(event)=>{setEditForm(!editForm); setEditToggle(false); event.stopPropagation()}}><AiOutlineEdit size={20}/>Edit</div>
                        <div className="post-options" onClick={deletePost} id={_id}><MdOutlineDeleteOutline size={20} onClick={deletePost} id={_id}/>Delete</div>
                    </div>
                    </div>}
            </div>
            <p onClick={navigateToUser} style={{ color: "gray" }}>@{username}</p>
            <p style={{ fontSize: "1.1rem", marginTop: "1rem" }}>{content}</p>
            <img src={media} className="post-images" alt=""></img>
            <div className="reaction-btn-container">
                {isLikedByUser() ? <AiFillHeart size={30} color="red" className="reaction-icons" onClick={(event) =>{
                    setLikedData({likeCount: likedData.likeCount - 1 });
                    removeUserLike();
                    event.stopPropagation()
                }} /> : <AiOutlineHeart size={30} className="reaction-icons" color={theme.textColor} onClick={(event) =>{
                    setLikedData({likeCount: likedData.likeCount + 1 });
                    setLikedBy([...likedBy, state.foundUser.username]);
                    setPostData([...postData], (postData[findIndex()].likes.likedBy.push(state.foundUser.username)), (postData[findIndex()].likes.likeCount = postData[findIndex()].likes.likeCount + 1));
                    event.stopPropagation()
                }} />}
                <span>{likedData.likeCount}</span>

                {isDislikedByUser() ? <AiFillDislike size={30} color="skyblue" className="reaction-icons" onClick={(event) =>{
                     setDislikeData({dislikeCount: dislikeData.dislikeCount - 1 });
                     removeUserDislike();
                     event.stopPropagation()
                }} /> : <AiOutlineDislike size={30} className="reaction-icons" color={theme.textColor} onClick={(event) =>{
                    setDislikeData({dislikeCount: dislikeData.dislikeCount + 1 });
                    setPostData([...postData], (postData[findIndex()].likes.dislikedBy.push(state.foundUser.username)));
                    event.stopPropagation()
                }} />}
                <span>{dislikeData.dislikeCount}</span>

                <AiOutlineMessage size={30} className="reaction-icons" color={theme.textColor} onClick={(event) => {setShowForm(!showForm); event.stopPropagation()}} />
                <span style={{ alignSelf: "center"}}>{commentsData.length}</span>
                <div style={{ display: "flex", position: "relative"}}>
                    <div style={{ display: showForm ? "flex" : "none", backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow, border: `1px solid ${theme.textColor}` }} className="comment-form-container">
                        <form className="comment-form" onSubmit={addComment}>
                            <div className="comment-form-header">
                                <label>
                                    <input type="textarea" placeholder="Add Comment.." required className="comment-text-area" onClick={(event)=>event.stopPropagation()}></input>
                                </label>
                                <button type="submit" onClick={(event)=>event.stopPropagation()} className="comment-btn" style={{border:`2px solid ${theme.textColor}`, color: theme.textColor}}>POST</button>
                            </div>
                        </form>
                    </div>
                    {isBookmarked ? <BsBookmarkFill size={25} className="reaction-icons" color={theme.textColor} onClick={(event)=>{
                    setPostData([...postData] , (postData[findIndex()].isBookmarked = !postData[findIndex()].isBookmarked));
                    event.stopPropagation()
                }}/> : <BsBookmark size={25} className="reaction-icons" color={theme.textColor} onClick={(event)=>{
                    setPostData([...postData] , (postData[findIndex()].isBookmarked = !postData[findIndex()].isBookmarked));
                    event.stopPropagation()
                }}/>}
                </div>
            </div>
            {ShowComments && <div style={{marginTop: "1rem"}}>
                            {commentsData.length === 0 ? <div className="comment">
                                No Comments Yet
                            </div> :
                                <PostComments data={commentsData} />
                            }
                        </div>}
        {username === state.foundUser.username && <div style={{display: editForm ? "flex" : "none", marginTop: "1rem"}}>
        <form className="form" onSubmit={postFormHandler} style={{marginLeft: "0"}}>
                            <label htmlFor="post-message"> 
                                <textarea id="post-message" type="text" required placeholder="Write something interesting..." onClick={(event)=>event.stopPropagation()} defaultValue={postData[findIndex()].content} className="post-textarea"></textarea>
                            </label>
                            <div className="post-btn-container">
                                <div>
                                    <label className="custom-input">
                                        <BiImages size={30} onClick={(event)=>event.stopPropagation()}/>
                                        <input type="file" accept="image/*" onChange={imageChangeHandler} onClick={(event)=>event.stopPropagation()}></input>
                                    </label>
                                </div>
                                <div>
                                    <button type="submit" onClick={(event)=>event.stopPropagation()} className="btn-style" style={{border:`2px solid ${theme.textColor}`, color: theme.textColor}}>SAVE</button>
                                </div>
                            </div>
                        </form>
                </div>}
        </div>
    </div>);
}