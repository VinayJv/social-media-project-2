import { NavBar } from "../component/NavBar";
import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import { Loader } from "../component/Loader";
import { AllPosts } from "../component/AllPosts";
import { SuggestedUserCard } from "../component/SuggestedUserCard";

export function Explore() {
  const [loader, setLoader] = useState(true);
  const { theme, state } = useDataContext();

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000)
  }, []);

  return (
    <div className="main-page">
      <NavBar></NavBar>
      {loader ? <Loader /> :
        <div className='main-body' style={{borderRight: `1px solid ${theme.textColor}`}}>
          <div style={{ backgroundColor: theme.themeColor2,  borderBottom: `1px solid ${theme.textColor}`}} className="header-main-container">
            <h1 style={{ padding: "1rem" }}>Explore</h1>
          </div>
          <div style={{ marginTop: "2rem" }}></div>
          <AllPosts />
        </div>}
        <SuggestedUserCard />
    </div>);
}