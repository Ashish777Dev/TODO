import React, { useContext } from "react";
import ThemeSwitch from "./ThemeSwitch.jsx";
import { ThemeContext } from "./../context/ThemeContext.jsx";
const Header = () => {
  const { isChecked, setIsChecked, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="header">
      <h1>T O D O</h1>
      <ThemeSwitch isChecked={isChecked} toggleTheme={toggleTheme} />
    </header>
  );
};

export default Header;
