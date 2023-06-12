import { useState } from "react";

export function ToggleButton({ label, toggle, onClick }) {
    const [isToggled, setIsToggled] = useState(toggle);

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