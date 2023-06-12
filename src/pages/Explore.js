import { NavBar } from "../component/NavBar";
import { useDataContext } from "../context/dataContext";
import { useState, useEffect } from "react";

export function Explore() {
    const { theme, state } = useDataContext();
    console.log(state);

    return (
    <div className="App" style={{ backgroundColor: theme.themeColor, color: theme.textColor }}>
        <NavBar></NavBar>
        <div className='main-body'>
            <h1>This is Explore</h1>
        </div>
    </div>);
}