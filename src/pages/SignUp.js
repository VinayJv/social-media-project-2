import { postSignUpData } from "../services/authService";
import { useDataContext } from "../context/dataContext";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Loader } from "../component/Loader";

export function SignUp() {
    const { dispatch, notify } = useDataContext();
    const [loader,setLoader] = useState(true);
    const navigate = useNavigate();

    const signUpFormHandler = async(event) => {
        event.preventDefault();
        try{
            const data = await postSignUpData(event.target.elements[2].value, event.target.elements[3].value, event.target.elements[0].value, event.target.elements[1].value);
            const {createdUser, encodedToken} = await data.json();
                dispatch({type:"SIGNUP_HANDLER", payload:{createdUser, encodedToken}});
                notify("Account Created");
                navigate("/home");
        }
        catch(error){
            console.log(error);
        }
        
    }

    useEffect(() => {
        setTimeout(() => {
          setLoader(false);
        }, 500);
      }, []);

    return (loader ? <Loader /> :
        <div className="login-container">
            <div className="login-icon">
                <img width="70" height="70" src="https://img.icons8.com/clouds/100/topic.png" alt="topic" /><span className="divider"></span><span style={{ fontSize: "2rem" }}>UTTER</span>
            </div>
            <h1>Sign Up</h1>
            <form className="login-form" onSubmit={signUpFormHandler}>
                <div>
                    <label htmlFor="name"></label>
                    <input type="text" id="name" placeholder="Name" required className="input-style"></input>
                </div>
                <div>
                    <label htmlFor="lastName"></label>
                    <input type="text" id="lastName" placeholder="Username" className="input-style" required></input>
                </div>
                <div>
                    <label htmlFor="email"></label>
                    <input type="text" id="email" placeholder="Email" className="input-style" required></input>
                </div>
                <div>
                    <label htmlFor="password"></label>
                    <input type="password" id="password" placeholder="Password" className="input-style" required></input>
                </div>
                <button type="submit" className="btn-style">Create Account</button>
            </form>
        </div>)
}