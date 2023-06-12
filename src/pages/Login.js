import { useDataContext } from "../context/dataContext";
import { postLoginData } from "../services/authService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation,useNavigate } from "react-router";

export function Login() {
    const { dispatch } = useDataContext();
    const navigate = useNavigate();

    const notify = (message) => {
        toast(message,{
            position: "bottom-right",
            className: "toast-message"
        });
    };

    const formHandler = async(event) => {
        event.preventDefault();
        const data = await postLoginData(event.target.elements[0].value, event.target.elements[1].value);
        if(data.status === 404){
            notify("User "+data.statusText);
        }
        else if(data.status === 200){
            const {foundUser, encodedToken} = await data.json();
            dispatch({type:"FOUND_USER_DETAILS", payload:{foundUser, encodedToken}});
            navigate("/explore");
        }
    }

    return (
    <div className="login-container">
        <h1>Sign in to Utter</h1>
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
        <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
        pauseOnHover={false}
        />
    </div>)
}