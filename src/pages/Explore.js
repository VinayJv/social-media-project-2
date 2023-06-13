import { NavBar } from "../component/NavBar";
import { useDataContext } from "../context/dataContext";
import { useEffect,useState } from "react";
import { Loader } from "../component/Loader";

export function Explore() {
    const [loader,setLoader] = useState(true);
    const { theme } = useDataContext();

    useEffect(()=>{
        setTimeout(()=>{
          setLoader(false);
        },1000)
      },[]);

    return (
    <div className="main-page">
        <NavBar></NavBar>
        {loader ? <Loader /> : <div className='main-body'>
    <h1>This is Explore</h1>
</div>}
    </div>);
}