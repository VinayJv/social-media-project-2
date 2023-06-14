import { useDataContext } from "../context/dataContext";
import { NavBar } from "../component/NavBar";
import { useEffect, useState } from "react";
import { Loader } from "../component/Loader";
import { BiImages } from "react-icons/bi";
import { AiOutlineSmile } from "react-icons/ai";
import { AllPosts } from "../component/AllPosts";

export function Home() {
    const [loader, setLoader] = useState(true);
    const { theme, state } = useDataContext();

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }, []);

    return (
        <div className="main-page" style={{borderRight: `1px solid ${theme.textColor}`}}>
            <NavBar></NavBar>
            {loader ? <Loader /> : <div className='main-body' style={{borderRight:`1px solid ${theme.textColor}`}}>
                <h1 style={{borderBottom:`1px solid ${theme.textColor}`, padding:"1rem", position:"fixed", width:"47.9%",backgroundColor:theme.themeColor2}}>Home</h1>
                <div>
                    <div className="post-container" style={{backgroundColor: theme.themeColor2, boxShadow: theme.boxShadow, marginTop:"5rem"}}>
                        <img src={state.foundUser.userImage} alt="user" className="user-image"></img>
                        <form className="form">
                            <label htmlFor="post-message"> 
                                <textarea id="post-message" type="text" placeholder="Write something interesting..." className="post-textarea"></textarea>
                            </label>
                            <div className="post-btn-container">
                                <div>
                                    <label className="custom-input">
                                        <BiImages size={30}/>
                                        <input type="file" multiple accept="image/*"></input>
                                    </label>
                                    <AiOutlineSmile size={30}/>
                                </div>
                                <div>
                                    <button type="submit" className="btn-style" style={{border:`2px solid ${theme.textColor}`, color: theme.textColor}}>POST</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <AllPosts />
                </div>
            </div>}
        </div>);
}