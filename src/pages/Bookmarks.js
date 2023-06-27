import { NavBar } from "../component/NavBar";
import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import { Loader } from "../component/Loader";
import { SuggestedUserCard } from "../component/SuggestedUserCard";
import { PostCard } from "../component/PostCard";

export function Bookmarks() {
  const [loader, setLoader] = useState(true);
  const { theme, postData } = useDataContext();

    const bookmarkedPost = postData.filter(({isBookmarked})=>isBookmarked) ?? [];
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
            <h1 style={{ padding: "1rem" }}>Bookmarks</h1>
          </div>
          <div style={{ marginTop: "2rem" }}></div>
          {/* Bookmarks Data */}
          {bookmarkedPost.length === 0 && <h1 style={{ padding: "1rem", textAlign: "center" }}>No Post Bookmarked</h1>}
          {bookmarkedPost.map((post,index)=> <PostCard props={post} key={index}/>)}
        </div>}
        <SuggestedUserCard />
    </div>);
}