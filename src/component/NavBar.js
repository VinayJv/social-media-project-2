import { useDataContext } from "../context/dataContext";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdTravelExplore } from "react-icons/md";
import { ToggleButton } from '../component/ToggleButton';
import { AiOutlineSetting } from "react-icons/ai";

export function NavBar(){
    const {theme, setTheme} = useDataContext();

    const changeTheme = (isChecked) => {
        isChecked ? setTheme({themeColor: "#15191d", textColor: "rgba(199, 237, 230, 1)"}) : setTheme({themeColor: "white", textColor: "black"});
      }

    return(
    <div className='nav-bar'>
      <div>
        <img width="70" height="70" src="https://img.icons8.com/clouds/100/topic.png" alt="topic" style={{marginBottom:"5rem"}}/>
        <NavLink to="/explore" className='nav-links' style={{color: theme.textColor}}>
          <MdTravelExplore size={25} color={theme.textColor}/>
          Explore
        </NavLink>
        <NavLink to="/home" className='nav-links' style={{color: theme.textColor}}>
          <AiOutlineHome size={25} color={theme.textColor}/>
          Home
        </NavLink>
        <NavLink to="/settings" className='nav-links' style={{color: theme.textColor}}>
          <AiOutlineSetting size={25} color={theme.textColor}/>
          Settings
        </NavLink>
      </div>
      <div className='last-child'>
        <ToggleButton label="" toggle={true} onClick={changeTheme}></ToggleButton>
      </div>
    </div>);
}