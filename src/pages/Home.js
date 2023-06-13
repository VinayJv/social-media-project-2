import { useDataContext } from "../context/dataContext";
import { NavBar } from "../component/NavBar";
import { useEffect, useState } from "react";
import { Loader } from "../component/Loader";

export function Home() {
    const [loader, setLoader] = useState(true);
    const { theme, state } = useDataContext();
    console.log(state);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 1000)
    }, []);

    return (
        <div className="main-page">
            <NavBar></NavBar>
            {loader ? <Loader /> : <div className='main-body'>
                <h1>Home</h1>
            </div>}
        </div>);
}