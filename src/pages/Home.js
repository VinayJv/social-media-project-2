import { useDataContext } from "../context/dataContext";
import { NavBar } from "../component/NavBar";
import { useEffect, useState } from "react";
import { Loader } from "../component/Loader";
import { BiImages } from "react-icons/bi";
import { AiOutlineSmile } from "react-icons/ai";
import { AllPosts } from "../component/AllPosts";
import { formatDate } from "../backend/utils/authUtils";
import { v4 as uuid } from "uuid";
import { SuggestedUserCard } from "../component/SuggestedUserCard";

export function Home() {
    const [loader, setLoader] = useState(true);
    const { theme, state, postData, setPostData } = useDataContext();
    const [image,setImage] = useState({toggle: false, files:{} });

    const postFormHandler = (event) => {
        event.preventDefault();
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
          setPostData([userPost, ...postData]);
          event.target.reset();
          setImage({...image, toggle: false});
    };

    const imageChangeHandler = (event) => {
        setImage({toggle: true, files: event.target.files[0]});
    };

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 700);
    }, []);

    return (
        <div className="main-page">
            <NavBar></NavBar>
            {loader ? <Loader /> : <div className='main-body' style={{borderRight: `1px solid ${theme.textColor}`}}>
                <div style={{backgroundColor:theme.themeColor2, borderBottom:`1px solid ${theme.textColor}`}} className="header-main-container">
                    <h1 style={{padding:"1rem"}}>Home</h1>
                </div>
                <div>
                    <div className="post-container" style={{backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow, marginTop:"2rem"}}>
                        <img src={state.foundUser.userImage} alt="user" className="user-image"></img>
                        <form className="form" onSubmit={postFormHandler}>
                            <label htmlFor="post-message"> 
                                <textarea id="post-message" type="text" required placeholder="Write something interesting..." className="post-textarea"></textarea>
                            </label>
                            <div className="post-btn-container">
                                <div>
                                    <label className="custom-input">
                                        <BiImages size={30}/>
                                        <input type="file" accept="image/*" onChange={imageChangeHandler}></input>
                                    </label>
                                    <AiOutlineSmile size={30}/>
                                </div>
                                <div>
                                    <button type="submit" className="btn-style" style={{border:`2px solid ${theme.textColor}`, color: theme.textColor}}>POST</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <AllPosts />
                </div>
            </div>}
            <SuggestedUserCard />
        </div>);
}