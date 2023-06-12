import { NavBar } from "../component/NavBar";
import { useDataContext } from "../context/dataContext";

export function Explore() {
    const { theme } = useDataContext();
    return (
        <div className="App" style={{ backgroundColor: theme.themeColor, color: theme.textColor }}>
            <NavBar></NavBar>
            <div className='main-body'>
                <h1>This is Explore</h1>
            </div>
        </div>);
}