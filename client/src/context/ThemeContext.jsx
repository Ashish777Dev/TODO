import React, { useEffect, useState, createContext } from "react";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const [isChecked, setIsChecked] = useState(
        localStorage.getItem("theme-preference") === "true"
    );

    const toggleTheme = () => setIsChecked(!isChecked);

    useEffect(() => {
        document.body.classList.toggle("dark-mode", isChecked);
        //Save theme
        localStorage.setItem("theme-preference", isChecked);
        return () => {
            document.body.classList.remove("dark-mode");
        };
    }, [isChecked]);

    return (
        <ThemeContext.Provider value={{ isChecked, setIsChecked, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeContextProvider };
