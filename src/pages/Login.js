import { useDataContext } from "../context/dataContext";
import { postLoginData } from "../services/authService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";

export function Login() {
    const { dispatch, notify } = useDataContext();
    const navigate = useNavigate();

    const formHandler = async(event) => {
        event.preventDefault();
        const data = await postLoginData(event.target.elements[0].value, event.target.elements[1].value);
        if(data.status === 404){
            notify("User "+data.statusText);
        }
        else if(data.status === 200){
            const {foundUser, encodedToken} = await data.json();
            dispatch({type:"FOUND_USER_DETAILS", payload:{foundUser, encodedToken}});
            navigate("/home");
        }
    }

    const guestLoginHandler = async() => {
        const data = await postLoginData("adarshbalika", "adarshBalika123");
        const {foundUser, encodedToken} = await data.json();
        dispatch({type:"FOUND_USER_DETAILS", payload:{foundUser, encodedToken}});
        notify("Login Successfull");
        navigate("/home");
    };

    return (
    <div className="login-container">
        <div className="login-icon">
            <img width="70" height="70" src="https://img.icons8.com/clouds/100/topic.png" alt="topic"/><span className="divider"></span><span style={{fontSize:"2rem"}}>UTTER</span>
        </div>
        <h1>Sign in</h1>
        <form className="login-form" onSubmit={formHandler}>
            <div>
                <label htmlFor="username"></label>
                <input type="text" id="username" placeholder="Username" required className="input-style"></input>
            </div>
            <div>
                <label htmlFor="password"></label>
                <input type="password" id="password" placeholder="Password" className="input-style" required></input>
            </div>
            <button type="submit" className="btn-style">Sign In</button>
        </form>
            <button className="btn-style" onClick={guestLoginHandler}>Guest Login</button>
            <p>Don't have an account? <span style={{textDecorationLine:"underline",cursor:"pointer"}} onClick={()=>navigate("/signup")}>Sign Up</span></p>
    </div>)
}