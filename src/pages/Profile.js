import { useDataContext } from "../context/dataContext";
import { NavBar } from "../component/NavBar";
import { Loader } from "../component/Loader";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { PostCard } from "../component/PostCard";
import { GiHamburgerMenu } from "react-icons/gi";

export function Profile(){
    const {theme, userData, dispatch, notify, state:{foundUser: {following}}, postData, state, showNav,setShowNav, isMobile} = useDataContext();
    const [loader,setLoader] = useState(true);
    const { userId } = useParams();

    const {_id, userImage, firstName, lastName, username, followers, bio} = userData.find((user)=>user.username === userId);

    const alreadyFollowed = () => {
      if(following.findIndex((item)=>item === username) === -1){
          return false;
      }
      else {
          return true;
      }
  };

  const followUser = (event) => {
    if(event.target.value === "Follow"){
        dispatch({type:"UPDATE_FOLLOWING_OF_USER", payload:event.target.name});
        notify(`Now Following @${event.target.name}`);
    }
    else{
        dispatch({type:"REMOVE_FOLLOWING", payload: event.target.name});
        notify(`Removed @${event.target.name}`);
    }
};

const usersPost = postData.filter((post)=>post.username === username);

    useEffect(() => {
        setTimeout(() => {
          setLoader(false);
        }, 500);
      }, []);

    return (
        <div className="main-page">
      <NavBar></NavBar>
      {loader ? <Loader /> :
        <div className='main-body' style={{borderRight: `1px solid ${theme.textColor}`}}>
          <div style={{ backgroundColor: theme.themeColor2,  borderBottom: `1px solid ${theme.textColor}`}} className="header-main-container">
          {isMobile && <GiHamburgerMenu size={30} className="reaction-icons" onClick={()=>setShowNav(!showNav)}/>}
            <h1 style={{marginRight: isMobile ? "6.5rem" : ""}}>User Profile</h1>
          </div>
          <div className="profile-container" style={{ backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow }}>
            <div className="profile-header">
              <img src={userImage} className="user-image-3" alt=""></img>
              <div className="profile-name">
                <p >{firstName || state.foundUser.name} {lastName}</p>
                <p style={{color: "gray"}}>@{username}</p>
              </div>
              {username !== state.foundUser.username && <button style={{border:`2px solid ${theme.textColor}`, color: theme.textColor, backgroundColor: theme.themeColor2}} className="follow-btn" value={alreadyFollowed() ? "Unfollow" : "Follow"} name={username} onClick={followUser}>{alreadyFollowed() ? "Unfollow" : "Follow"}</button>}
            </div>
              <p style={{fontSize: "1.2rem", textAlign: "center", marginTop: "1rem"}}>{bio}</p> 
              <div className="profile-data" style={{border:`2px solid ${theme.textColor}`, color: theme.textColor, backgroundColor: theme.themeColor2}}>
                <div className="profile-data-flex">
                  <div className="profile-data-flex-2">
                    <p>Following</p><span>{followers.length}</span>
                  </div>
                  <div className="profile-data-flex-2">
                    <p>Posts</p><span>{usersPost.length}</span>
                  </div>
                  <div className="profile-data-flex-2">
                    <p>Followers</p><span>{following.length}</span>
                  </div>
                </div>
              </div>
          </div>
              {usersPost.map((post,index)=><PostCard props={post} key={index}/>)}
        </div>}
    </div>);
}