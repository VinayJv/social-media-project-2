import { NavBar } from "../component/NavBar";
import { useDataContext } from "../context/dataContext";
import { useEffect,useState } from "react";
import { Loader } from "../component/Loader";
import { AllPosts } from "../component/AllPosts";

export function Explore() {
    const [loader,setLoader] = useState(true);
    const { theme } = useDataContext();

    useEffect(()=>{
        setTimeout(()=>{
          setLoader(false);
        },1000)
      },[]);

    return (
    <div className="main-page">
        <NavBar></NavBar>
        {loader ? <Loader /> : <div className='main-body'>
        <h1 style={{borderBottom:`1px solid ${theme.textColor}`, padding:"1rem", position:"fixed", width:"47.9%",backgroundColor:theme.themeColor2}}>Explore</h1>
        <div style={{marginTop: "6rem"}}></div>
        <AllPosts />
</div>}
Followers
    </div>);
}