import { useDataContext } from "../context/dataContext";
import { NavBar } from "../component/NavBar";

export function Settings(){
    const {state} = useDataContext();
    console.log(state);
    const {theme} = useDataContext();

    return (
        <div className="App" style={{ backgroundColor: theme.themeColor, color: theme.textColor }}>
            <NavBar></NavBar>
            <div className='main-body'>
                <h1>This is Setting</h1>
            </div>
        </div>);
}