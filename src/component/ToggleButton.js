import { useState } from "react";
import { useDataContext } from "../context/dataContext";

export function ToggleButton({ label, onClick }) {
    const {isToggled, setIsToggled} = useDataContext();

    const callback = () => {
        setIsToggled(!isToggled);
        onClick(!isToggled);
    }
    return (
        <div className="toggle-container">
            <div>
                <label className="toggle-label">
                    <input type="checkbox" defaultChecked={isToggled} onClick={callback} className="toggle-input" />
                    <span className="toggle-span" />
                </label>
            </div>
            <div>
                <strong>{label}</strong>
            </div>
        </div>
    );
}