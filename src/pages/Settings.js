import { useDataContext } from "../context/dataContext";
import { NavBar } from "../component/NavBar";
import { Loader } from "../component/Loader";
import { useState, useEffect } from "react";

export function Settings(){
    const {theme} = useDataContext();
    const [loader,setLoader] = useState(true);


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
        </div>}
    </div>);
}