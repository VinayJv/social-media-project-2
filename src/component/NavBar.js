import { useDataContext } from "../context/dataContext";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdTravelExplore } from "react-icons/md";
import { ToggleButton } from '../component/ToggleButton';
import { AiOutlineSetting } from "react-icons/ai";
import { BsBookmarkCheck } from "react-icons/bs";
import { isMobile } from "react-device-detect";

export function NavBar(){
    const {theme, setTheme, dispatch, notify, showNav, setShowNav} = useDataContext();

    const changeTheme = (isChecked) => {
        isChecked ? setTheme({themeColor: "rgb(21, 25, 29)", textColor: "rgba(199, 237, 230, 1)", themeColor2: "#2c3e50", boxShadow: "-2px 4px 10px black"}) : setTheme({themeColor: "white", textColor: "#003B73",themeColor2: "#BFD7ED", boxShadow: "-1px 1px 5px black"});
      }

      const logoutUser = () => {
        dispatch({type: "LOGOUT_USER", payload: ""});
        notify("Logged Out");
      }

    return(
    <div className='nav-bar' style={{borderRight:`1px solid ${theme.textColor}`, left: showNav ? "0" : "-100%", backgroundColor: theme.themeColor}}>
      <div className="nav-bar-inner">
        <img width="70" height="70" src="https://img.icons8.com/clouds/100/topic.png" alt="topic" style={{marginBottom:"5rem", display: isMobile ? "none" : ""}}/>
        <NavLink to="/home" className='nav-links' style={{color: theme.textColor}} onClick={()=>setShowNav(false)}>
          <AiOutlineHome size={25} color={theme.textColor}/>
          Home
        </NavLink>
        <NavLink to="/explore" className='nav-links' style={{color: theme.textColor}} onClick={()=>setShowNav(false)}>
          <MdTravelExplore size={25} color={theme.textColor}/>
          Explore
        </NavLink>
        <NavLink to="/bookmarks" className='nav-links' style={{color: theme.textColor}} onClick={()=>setShowNav(false)}>
          <BsBookmarkCheck size={25} color={theme.textColor}/>
          Bookmarks
        </NavLink>
        <NavLink to="/settings" className='nav-links' style={{color: theme.textColor}} onClick={()=>setShowNav(false)}>
          <AiOutlineSetting size={25} color={theme.textColor}/>
          Settings
        </NavLink>
          <button className="btn-style" style={{border:`2px solid ${theme.textColor}`, color: theme.textColor, backgroundColor: theme.themeColor2}} onClick={logoutUser}>Logout</button>
      </div>
      <div className='last-child'>
        <ToggleButton label="" onClick={changeTheme}></ToggleButton>
      </div>
    </div>);
}