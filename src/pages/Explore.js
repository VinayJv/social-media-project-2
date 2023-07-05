import { NavBar } from "../component/NavBar";
import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import { Loader } from "../component/Loader";
import { AllPosts } from "../component/AllPosts";
import { SuggestedUserCard } from "../component/SuggestedUserCard";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUserAdd } from "react-icons/ai";

export function Explore() {
  const [loader, setLoader] = useState(true);
  const { theme, isMobile, setShowNav, showNav, showUsers, setShowUsers } = useDataContext();

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
            <h1>Explore</h1>
            {isMobile && <div style={{display: "flex", position: "relative", flexDirection: "column"}}>
              <AiOutlineUserAdd className="reaction-icons" size={30} onClick={()=>setShowUsers(!showUsers)}/>
            </div>}
          </div>
          <AllPosts />
        </div>}
        <SuggestedUserCard />
    </div>);
}