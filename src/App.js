import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useDataContext } from './context/dataContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Auth } from './component/Auth';
import { Explore } from './pages/Explore';
import { Settings } from './pages/Settings';
import { SignUp } from './pages/SignUp';
import { ToastContainer } from 'react-toastify';
import { Bookmarks } from './pages/Bookmarks';

function App() {
  const {theme} = useDataContext();
  document.body.style.backgroundColor = theme.themeColor;


  return ( 
    <div className="App" style={{backgroundColor: theme.themeColor, color: theme.textColor}}>
        <Routes>
          <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>

          <Route path='/settings' element={<Auth><Settings /></Auth>}></Route>
          <Route path='/explore' element={<Auth><Explore /></Auth>}></Route>
          <Route path='/home' element={<Auth><Home /></Auth>}></Route>
          <Route path='/bookmarks' element={<Auth><Bookmarks /></Auth>}></Route>
        </Routes>
        <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
        pauseOnHover={false}
        />
    </div>
  );
}

export default App;
