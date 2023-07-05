import { useDataContext } from "../context/dataContext";
import { NavBar } from "../component/NavBar";
import { useEffect, useState } from "react";
import { Loader } from "../component/Loader";
import { BiImages } from "react-icons/bi";
import { AiOutlineSmile } from "react-icons/ai";
import { formatDate } from "../backend/utils/authUtils";
import { v4 as uuid } from "uuid";
import { SuggestedUserCard } from "../component/SuggestedUserCard";
import { FollowedPost } from "../component/FollowedPost";
import { useNavigate } from "react-router";
import { HiOutlineFilter } from "react-icons/hi";
import { BiTrendingUp } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs"; 
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUserAdd } from "react-icons/ai"; 

export function Home() {
    const [loader, setLoader] = useState(true);
    const { theme, state, postData, setPostData, notify, dispatch, isMobile, showNav, setShowNav, setShowUsers, showUsers } = useDataContext();
    const [image,setImage] = useState({toggle: false, files:{} });
    const [filter, setShowFilter] = useState(false);
    const navigate = useNavigate();

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
          notify("Posted");
    };

    const imageChangeHandler = (event) => {
        setImage({toggle: true, files: event.target.files[0]});
    }; 

    const navigateToUser = (event) => {
        event.stopPropagation();
        navigate(`/user/${state.foundUser.username}`);
    }

    const showFilters = () => {
        setShowFilter(!filter);
    }

    const setFilter = (event) => {
        dispatch({type: "FILTER", payload: event.target.id});
        setShowFilter(false);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 700);
    }, [state]);

    return (
        <div className="main-page">
            <NavBar></NavBar>
            {loader ? <Loader /> : <div className='main-body' style={{borderRight: isMobile ? "" : `1px solid ${theme.textColor}`}}>
                <div style={{backgroundColor:theme.themeColor2, borderBottom:`1px solid ${theme.textColor}`}} className="header-main-container">
                    {isMobile && <GiHamburgerMenu size={30} onClick={()=>setShowNav(!showNav)}/>}
                    <h1>Home</h1>
                    <div style={{display: "flex", position: "relative", gap: "0.5rem"}}>
                        <HiOutlineFilter size={30} onClick={showFilters}/>
                        <div style={{display: filter ? "flex" : "none", backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow, border: `1px solid ${theme.textColor}`}} className="edit-filter-container">
                            <div className="post-options" id="Trending" onClick={setFilter}><BiTrendingUp size={20} style={{marginRight: "0.2rem"}}/>Trending</div>
                            <div className="post-options" id="Date" onClick={setFilter}><BsCalendarDate size={20} style={{marginRight: "0.2rem"}}/>Date</div>
                        </div>
                        {isMobile && <div style={{display: "flex", position: "relative", flexDirection: "column"}}>
                            <AiOutlineUserAdd className="reaction-icons" size={30} onClick={()=>setShowUsers(!showUsers)}/>
                        </div>}
                    </div>
                </div>
                <div>
                    <div className="post-container" style={{backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow, marginTop:"2rem"}}>
                        <img src={state.foundUser.userImage} alt="user" className="user-image" onClick={navigateToUser}></img>
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
                    <FollowedPost />
                </div>
            </div>}
            <SuggestedUserCard />
        </div>);
}