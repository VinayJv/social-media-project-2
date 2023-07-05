import { NavBar } from "../component/NavBar";
import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import { Loader } from "../component/Loader";
import { SuggestedUserCard } from "../component/SuggestedUserCard";
import { PostCard } from "../component/PostCard";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUserAdd } from "react-icons/ai"; 

export function Bookmarks() {
  const [loader, setLoader] = useState(true);
  const { theme, postData, setShowNav, showNav, isMobile, setShowUsers, showUsers } = useDataContext();

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
        <div className='main-body' style={{borderRight: isMobile ? "" : `1px solid ${theme.textColor}`}}>
          <div style={{ backgroundColor: theme.themeColor2,  borderBottom: `1px solid ${theme.textColor}`}} className="header-main-container">
          {isMobile && <GiHamburgerMenu size={30} className="reaction-icons" onClick={()=>setShowNav(!showNav)}/>}
            <h1>Bookmarks</h1>
            {isMobile && <div style={{display: "flex", position: "relative", flexDirection: "column"}}>
              <AiOutlineUserAdd className="reaction-icons" size={30} onClick={()=>setShowUsers(!showUsers)}/>
            </div>}
          </div>
          {bookmarkedPost.length === 0 && <h1 style={{ padding: "1rem", textAlign: "center" }}>No Post Bookmarked</h1>}
          {bookmarkedPost.map((post,index)=> <PostCard props={post} key={index}/>)}
        </div>}
        <SuggestedUserCard />
    </div>);
}