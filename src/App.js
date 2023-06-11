import './App.css';
import { Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { AiOutlineHome } from "react-icons/ai";
import { MdTravelExplore } from "react-icons/md";
import { useDataContext } from './context/dataContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Auth } from './component/Auth';
import { Explore } from './pages/Explore';

function App() {
  const [loader, setLoader] = useState(true);
  const {theme, setTheme} = useDataContext();
  document.body.style.backgroundColor = theme.themeColor;

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000)
  }, []);

  return (loader ? <div className="loader-container" style={{backgroundColor: theme.themeColor}} ><InfinitySpin
    width='200'
    color="rgba(199, 237, 230, 1)"
  /></div> :
    <div className="App" style={{backgroundColor: theme.themeColor, color: theme.textColor}}>
      <div className='nav-bar'>
        <div className='icon-container'>
          <img width="70" height="70" src="https://img.icons8.com/clouds/100/topic.png" alt="topic" />
        </div>
        <div>
          <NavLink to="/" className='nav-links' style={{color: theme.textColor}}>
            <MdTravelExplore size={25} color={theme.textColor}/>
            Explore
          </NavLink>
          <NavLink to="/home" className='nav-links' style={{color: theme.textColor}}>
            <AiOutlineHome size={25} color={theme.textColor}/>
            Home
          </NavLink>
          <button onClick={()=>setTheme({themeColor: "white", textColor:"black"})}>Change Theme</button>
        </div>
      </div>
      <div className='main-body'>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Auth><Explore /></Auth>}></Route>
          <Route path='/home' element={<Auth><Home /></Auth>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
