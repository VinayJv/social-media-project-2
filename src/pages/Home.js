import { useDataContext } from "../context/dataContext";
import { NavBar } from "../component/NavBar";

export function Home(){
    const {state} = useDataContext();
    console.log(state);
    const {theme} = useDataContext();

    return (
        <div className="App" style={{ backgroundColor: theme.themeColor, color: theme.textColor }}>
            <NavBar></NavBar>
            <div className='main-body'>
                <h1>This is Home</h1>
            </div>
        </div>);
}