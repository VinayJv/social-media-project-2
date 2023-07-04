import { useDataContext } from "../context/dataContext";
import { NavBar } from "../component/NavBar";
import { Loader } from "../component/Loader";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { PostCard } from "../component/PostCard";

export function SinglePost(){
    const {theme, postData} = useDataContext();
    const [loader,setLoader] = useState(true);
    const { postId } = useParams();

    const findPost = postData.find((post)=>post._id === postId);

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
            <h1 style={{ padding: "1rem" }}>Post</h1>
          </div>
          <div style={{ marginTop: "2rem" }}></div>
          <PostCard props={findPost} ShowComments/>
        </div>}
    </div>);
}