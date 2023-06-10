import './App.css';
import { useEffect,useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

function App() {
  const [loader,setLoader] = useState(true);
  
  useEffect(()=>{
    setTimeout(()=>{
      setLoader(false);
    },3000)
  },[]);

  return (loader ? <div className="loader-container"><InfinitySpin 
  width='200'
  color="#4fa94d"
/></div> :
    <div className="App">
      <h1>This is React App</h1>
    </div>
  );
}

export default App;
