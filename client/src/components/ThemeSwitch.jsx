import React from "react";

const ThemeSwitch = ({ isChecked, toggleTheme }) => {
    return (
        <div className="theme-switch">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleTheme()}
            />
            <span
                className="icon"
            ></span>
        </div>
    );
};

export default ThemeSwitch;
