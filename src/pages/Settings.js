import { useDataContext } from "../context/dataContext";
import { NavBar } from "../component/NavBar";
import { Loader } from "../component/Loader";
import { useState, useEffect } from "react";
import { PostCard } from "../component/PostCard";
import { BiImages } from "react-icons/bi";

export function Settings(){
    const {theme, state : {foundUser: { userImage, firstName, lastName, username, bio, following, url }}, postData, dispatch, notify, state, setImage} = useDataContext();
    const [loader,setLoader] = useState(true);
    const [showForm, setShowForm] = useState(false);
    

    const usersPost = postData.filter((post)=>post.username === username);

    const editProfile = (event) => {
      event.preventDefault();
      dispatch({type:"UPDATE_USER_PROFILE", payload: event.target.elements});
      setShowForm(false);
      notify("Details Updated");
    }

    const imageChangeHandler = (event) => {
      setImage({toggle: true, files: event.target.files[0]});
    }

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
            <h1 style={{ padding: "1rem" }}>Settings</h1>
          </div>
          <div style={{ marginTop: "2rem" }}></div>
          <div className="profile-container" style={{ backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow }}>
            <div className="profile-header">
              <img src={userImage} className="user-image-3" alt=""></img>
              <div>
                <p style={{fontSize: "2rem"}}>{firstName || state.foundUser.name} {lastName}</p>
                <p style={{fontSize: "1.5rem", color: "gray"}}>@{username}</p>
              </div>
              <button style={{border:`2px solid ${theme.textColor}`, color: theme.textColor, backgroundColor: theme.themeColor2}} className="follow-btn" onClick={()=>setShowForm(!showForm)}>Edit Profile</button>
            </div>
              <p style={{fontSize: "1.2rem", textAlign: "center", marginTop: "1rem"}}>Bio: {bio}</p> 
              <a style={{textAlign: "center", marginTop: "1rem", color: theme.textColor}} href={url} target="_blank" rel="noreferrer">{url}</a> 
              <div className="profile-data" style={{border:`2px solid ${theme.textColor}`, color: theme.textColor, backgroundColor: theme.themeColor2}}>
                <div className="profile-data-flex">
                  <div className="profile-data-flex-2">
                    <p>Following</p><span>{following.length}</span>
                  </div>
                  <div className="profile-data-flex-2">
                    <p>Posts</p><span>{usersPost.length}</span>
                  </div>
                  <div className="profile-data-flex-2">
                    <p>Followers</p><span>{1}</span>
                  </div>
                </div>
              </div>
          </div>
          <div className="edit-profile-container" style={{display: showForm ? "flex" : "none", backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow}}>
            <h2 style={{marginBottom: "1rem"}}>Edit Profile</h2>
            <form onSubmit={editProfile}>
              <div style={{display: "flex", margin: "1rem"}}>
                <div style={{position: "relative"}}>
                    <img src={userImage} className="user-image-3" alt=""></img>
                    <label className="custom-input">
                        <BiImages size={30} style={{float: "right"}}/>
                        <input type="file" accept="image/*" onChange={imageChangeHandler}></input>
                    </label>
                </div>
                <div style={{display: "flex", flexDirection: "column", width: "100%", paddingLeft: "1rem"}}>
                    <label className="label-edit">
                    Bio <br />
                    <input type="text" defaultValue={state.foundUser.bio} className="input-edit"></input>
                    </label>
                    <label className="label-edit">
                    Portfolio URL <br />
                    <input type="text" defaultValue={state.foundUser.url} className="input-edit"></input>
                    </label>
                </div>
              </div>
              <button className="btn-style">Save</button>
            </form>
          </div>
              {usersPost.map((post,index)=><PostCard props={post} key={index}/>)}
        </div>}
    </div>);
}