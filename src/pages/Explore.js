import { NavBar } from "../component/NavBar";
import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import { Loader } from "../component/Loader";
import { AllPosts } from "../component/AllPosts";
import { SuggestedUserCard } from "../component/SuggestedUserCard";
import { GiHamburgerMenu } from "react-icons/gi";

export function Explore() {
  const [loader, setLoader] = useState(true);
  const { theme, isMobile, setShowNav, showNav } = useDataContext();

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
            <h1 style={{marginRight: isMobile ? "8.5rem" : ""}}>Explore</h1>
          </div>
          <AllPosts />
        </div>}
        <SuggestedUserCard />
    </div>);
}