import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useDataContext } from './context/dataContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Auth } from './component/Auth';
import { Explore } from './pages/Explore';
import { Settings } from './pages/Settings';
import { SignUp } from './pages/SignUp';

function App() {
  const [loader, setLoader] = useState(true);
  const {theme} = useDataContext();
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
        <Routes>
          <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
          <Route path='/explore' element={<Auth><Explore /></Auth>}></Route>
          <Route path='/home' element={<Auth><Home /></Auth>}></Route>
        </Routes>
    </div>
  );
}

export default App;
